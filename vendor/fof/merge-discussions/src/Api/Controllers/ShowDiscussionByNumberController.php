<?php

/*
 * This file is part of fof/merge-discussions.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\MergeDiscussions\Api\Controllers;

use Flarum\Api\Controller\ShowDiscussionController;
use Flarum\Discussion\Discussion;
use Flarum\Http\RequestUtil;
use Flarum\User\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class ShowDiscussionByNumberController extends ShowDiscussionController
{
    /**
     * {@inheritdoc}
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $discussionId = Arr::get($request->getQueryParams(), 'id');
        $actor = RequestUtil::getActor($request);
        $include = $this->extractInclude($request);

        if (Arr::get($request->getQueryParams(), 'bySlug', false)) {
            $discussion = $this->slugManager->forResource(Discussion::class)->fromSlug($discussionId, $actor);
        } else {
            $discussion = $this->discussions->findOrFail($discussionId, $actor);
        }

        if (in_array('posts', $include)) {
            $postRelationships = $this->getPostRelationships($include);

            $this->includePosts($discussion, $request, $postRelationships);
        }

        $this->loadRelations(new Collection([$discussion]), array_filter($include, function ($relationship) {
            return !Str::startsWith($relationship, 'posts');
        }), $request);

        return $discussion;
    }

    /**
     * @param Discussion             $discussion
     * @param ServerRequestInterface $request
     * @param array                  $include
     */
    private function includePosts(Discussion $discussion, ServerRequestInterface $request, array $include)
    {
        $actor = RequestUtil::getActor($request);
        $limit = $this->extractLimit($request);
        $offset = $this->getPostsOffset($request, $discussion, $limit);

        $allPosts = $this->loadPostIds($discussion, $actor);
        $loadedPosts = $this->loadPosts($discussion, $actor, $offset, $limit, $include);

        array_splice($allPosts, $offset, $limit, $loadedPosts);

        $discussion->setRelation('posts', $allPosts);
    }

    /**
     * @param Discussion $discussion
     * @param User       $actor
     *
     * @return array
     */
    private function loadPostIds(Discussion $discussion, User $actor)
    {
        return $discussion->posts()->whereVisibleTo($actor)->orderBy('number')->pluck('id')->all();
    }

    /**
     * @param array $include
     *
     * @return array
     */
    private function getPostRelationships(array $include)
    {
        $prefixLength = strlen($prefix = 'posts.');
        $relationships = [];

        foreach ($include as $relationship) {
            if (substr($relationship, 0, $prefixLength) === $prefix) {
                $relationships[] = substr($relationship, $prefixLength);
            }
        }

        return $relationships;
    }

    /**
     * @param ServerRequestInterface $request
     * @param Discussion$discussion
     * @param int $limit
     *
     * @return int
     */
    private function getPostsOffset(ServerRequestInterface $request, Discussion $discussion, $limit)
    {
        $queryParams = $request->getQueryParams();
        $actor = RequestUtil::getActor($request);

        if (($near = Arr::get($queryParams, 'page.near')) > 1) {
            $offset = $this->posts->getIndexForNumber($discussion->id, $near, $actor);
            $offset = max(0, $offset - $limit / 2);
        } else {
            $offset = $this->extractOffset($request);
        }

        return $offset;
    }

    /**
     * @param Discussion $discussion
     * @param User       $actor
     * @param int        $offset
     * @param int        $limit
     * @param array      $include
     *
     * @return mixed
     */
    private function loadPosts($discussion, $actor, $offset, $limit, array $include)
    {
        $query = $discussion->posts()->whereVisibleTo($actor);

        $query->orderBy('number')->skip($offset)->take($limit)->with($include);

        $posts = $query->get();

        foreach ($posts as $post) {
            $post->discussion = $discussion;
        }

        $this->loadRelations($posts, $include);

        return $posts->all();
    }

    protected function getRelationsToLoad(Collection $models): array
    {
        $addedRelations = parent::getRelationsToLoad($models);

        if ($models->first() instanceof Discussion) {
            return $addedRelations;
        }

        return $this->getPostRelationships($addedRelations);
    }

    protected function getRelationCallablesToLoad(Collection $models): array
    {
        $addedCallableRelations = parent::getRelationCallablesToLoad($models);

        if ($models->first() instanceof Discussion) {
            return $addedCallableRelations;
        }

        $postCallableRelationships = $this->getPostRelationships(array_keys($addedCallableRelations));

        return array_intersect_key($addedCallableRelations, array_flip(array_map(function ($relation) {
            return "posts.$relation";
        }, $postCallableRelationships)));
    }
}
