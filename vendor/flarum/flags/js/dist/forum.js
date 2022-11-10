(()=>{var t={n:a=>{var o=a&&a.__esModule?()=>a.default:()=>a;return t.d(o,{a:o}),o},d:(a,o)=>{for(var s in o)t.o(o,s)&&!t.o(a,s)&&Object.defineProperty(a,s,{enumerable:!0,get:o[s]})},o:(t,a)=>Object.prototype.hasOwnProperty.call(t,a),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},a={};(()=>{"use strict";t.r(a);const o=flarum.core.compat["forum/app"];var s=t.n(o);const e=flarum.core.compat["common/Model"];var n=t.n(e);function r(t,a){return r=Object.setPrototypeOf||function(t,a){return t.__proto__=a,t},r(t,a)}function l(t,a){t.prototype=Object.create(a.prototype),t.prototype.constructor=t,r(t,a)}var i=function(t){function a(){return t.apply(this,arguments)||this}l(a,t);var o=a.prototype;return o.type=function(){return n().attribute("type").call(this)},o.reason=function(){return n().attribute("reason").call(this)},o.reasonDetail=function(){return n().attribute("reasonDetail").call(this)},o.createdAt=function(){return n().attribute("createdAt",n().transformDate).call(this)},o.post=function(){return n().hasOne("post").call(this)},o.user=function(){return n().hasOne("user").call(this)},a}(n());const c=flarum.core.compat["components/Page"];var u=t.n(c);const f=flarum.core.compat["common/Component"];var p=t.n(f);const d=flarum.core.compat["common/components/Link"];var g=t.n(d);const h=flarum.core.compat["common/components/LoadingIndicator"];var v=t.n(h);const _=flarum.core.compat["common/helpers/avatar"];var b=t.n(_);const y=flarum.core.compat["common/helpers/username"];var N=t.n(y);const F=flarum.core.compat["common/helpers/icon"];var x=t.n(F);const k=flarum.core.compat["common/helpers/humanTime"];var w=t.n(k),C=function(t){function a(){return t.apply(this,arguments)||this}l(a,t);var o=a.prototype;return o.oninit=function(a){t.prototype.oninit.call(this,a),this.state=this.attrs.state},o.view=function(){var t=this.state.cache||[];return m("div",{className:"NotificationList FlagList"},m("div",{className:"NotificationList-header"},m("h4",{className:"App-titleControl App-titleControl--text"},s().translator.trans("flarum-flags.forum.flagged_posts.title"))),m("div",{className:"NotificationList-content"},m("ul",{className:"NotificationGroup-content"},t.length?t.map((function(t){var a=t.post();return m("li",null,m(g(),{href:s().route.post(a),className:"Notification Flag",onclick:function(t){s().flags.index=a,t.redraw=!1}},b()(a.user()),x()("fas fa-flag",{className:"Notification-icon"}),m("span",{className:"Notification-content"},s().translator.trans("flarum-flags.forum.flagged_posts.item_text",{username:N()(a.user()),em:m("em",null),discussion:a.discussion().title()})),w()(t.createdAt()),m("div",{className:"Notification-excerpt"},a.contentPlain())))})):this.state.loading?v().component({className:"LoadingIndicator--block"}):m("div",{className:"NotificationList-empty"},s().translator.trans("flarum-flags.forum.flagged_posts.empty_text")))))},a}(p()),D=function(t){function a(){return t.apply(this,arguments)||this}l(a,t);var o=a.prototype;return o.oninit=function(a){t.prototype.oninit.call(this,a),s().history.push("flags"),s().flags.load(),this.bodyClass="App--flags"},o.view=function(){return m("div",{className:"FlagsPage"},m(C,{state:s().flags}))},a}(u()),P=function(){function t(t){this.app=t,this.loading=!1}return t.prototype.load=function(){var t=this;this.cache&&!this.app.session.user.attribute("newFlagCount")||(this.loading=!0,m.redraw(),this.app.store.find("flags").then((function(a){t.app.session.user.pushAttributes({newFlagCount:0}),t.cache=a.sort((function(t,a){return a.createdAt()-t.createdAt()}))})).catch((function(){})).then((function(){t.loading=!1,m.redraw()})))},t}();const A=flarum.core.compat["common/extend"],M=flarum.core.compat["forum/utils/PostControls"];var O=t.n(M);const L=flarum.core.compat["common/components/Button"];var B=t.n(L);const T=flarum.core.compat["common/components/Modal"];var j=t.n(T);const S=flarum.core.compat["common/utils/Stream"];var R=t.n(S);const E=flarum.core.compat["common/utils/withAttr"];var I=t.n(E);const H=flarum.core.compat["common/utils/ItemList"];var U=t.n(H),G=function(t){function a(){return t.apply(this,arguments)||this}l(a,t);var o=a.prototype;return o.oninit=function(a){t.prototype.oninit.call(this,a),this.success=!1,this.reason=R()(""),this.reasonDetail=R()("")},o.className=function(){return"FlagPostModal Modal--medium"},o.title=function(){return s().translator.trans("flarum-flags.forum.flag_post.title")},o.content=function(){return this.success?m("div",{className:"Modal-body"},m("div",{className:"Form Form--centered"},m("p",{className:"helpText"},s().translator.trans("flarum-flags.forum.flag_post.confirmation_message")),m("div",{className:"Form-group"},m(B(),{className:"Button Button--primary Button--block",onclick:this.hide.bind(this)},s().translator.trans("flarum-flags.forum.flag_post.dismiss_button"))))):m("div",{className:"Modal-body"},m("div",{className:"Form Form--centered"},m("div",{className:"Form-group"},m("div",null,this.flagReasons().toArray())),m("div",{className:"Form-group"},m(B(),{className:"Button Button--primary Button--block",type:"submit",loading:this.loading,disabled:!this.reason()},s().translator.trans("flarum-flags.forum.flag_post.submit_button")))))},o.flagReasons=function(){var t=new(U()),a=s().forum.attribute("guidelinesUrl");return t.add("off-topic",m("label",{className:"checkbox"},m("input",{type:"radio",name:"reason",checked:"off_topic"===this.reason(),value:"off_topic",onclick:I()("value",this.reason)}),m("strong",null,s().translator.trans("flarum-flags.forum.flag_post.reason_off_topic_label")),s().translator.trans("flarum-flags.forum.flag_post.reason_off_topic_text"),"off_topic"===this.reason()?m("textarea",{className:"FormControl",placeholder:s().translator.trans("flarum-flags.forum.flag_post.reason_details_placeholder"),value:this.reasonDetail(),oninput:I()("value",this.reasonDetail)}):""),70),t.add("inappropriate",m("label",{className:"checkbox"},m("input",{type:"radio",name:"reason",checked:"inappropriate"===this.reason(),value:"inappropriate",onclick:I()("value",this.reason)}),m("strong",null,s().translator.trans("flarum-flags.forum.flag_post.reason_inappropriate_label")),s().translator.trans("flarum-flags.forum.flag_post.reason_inappropriate_text",{a:a?m("a",{href:a,target:"_blank"}):void 0}),"inappropriate"===this.reason()?m("textarea",{className:"FormControl",placeholder:s().translator.trans("flarum-flags.forum.flag_post.reason_details_placeholder"),value:this.reasonDetail(),oninput:I()("value",this.reasonDetail)}):""),60),t.add("spam",m("label",{className:"checkbox"},m("input",{type:"radio",name:"reason",checked:"spam"===this.reason(),value:"spam",onclick:I()("value",this.reason)}),m("strong",null,s().translator.trans("flarum-flags.forum.flag_post.reason_spam_label")),s().translator.trans("flarum-flags.forum.flag_post.reason_spam_text"),"spam"===this.reason()?m("textarea",{className:"FormControl",placeholder:s().translator.trans("flarum-flags.forum.flag_post.reason_details_placeholder"),value:this.reasonDetail(),oninput:I()("value",this.reasonDetail)}):""),50),t.add("other",m("label",{className:"checkbox"},m("input",{type:"radio",name:"reason",checked:"other"===this.reason(),value:"other",onclick:I()("value",this.reason)}),m("strong",null,s().translator.trans("flarum-flags.forum.flag_post.reason_other_label")),"other"===this.reason()?m("textarea",{className:"FormControl",value:this.reasonDetail(),oninput:I()("value",this.reasonDetail)}):""),10),t},o.onsubmit=function(t){var a=this;t.preventDefault(),this.loading=!0,s().store.createRecord("flags").save({reason:"other"===this.reason()?null:this.reason(),reasonDetail:this.reasonDetail(),relationships:{user:s().session.user,post:this.attrs.post}},{errorHandler:this.onerror.bind(this)}).then((function(){return a.success=!0})).catch((function(){})).then(this.loaded.bind(this))},a}(j());function q(){(0,A.extend)(O(),"userControls",(function(t,a){!a.isHidden()&&"comment"===a.contentType()&&a.canFlag()&&t.add("flag",m(B(),{icon:"fas fa-flag",onclick:function(){return s().modal.show(G,{post:a})}},s().translator.trans("flarum-flags.forum.post_controls.flag_button")))}))}const z=flarum.core.compat["forum/components/HeaderSecondary"];var V=t.n(z);const J=flarum.core.compat["components/NotificationsDropdown"];var K=function(t){function a(){return t.apply(this,arguments)||this}l(a,t),a.initAttrs=function(a){a.label=a.label||s().translator.trans("flarum-flags.forum.flagged_posts.tooltip"),a.icon=a.icon||"fas fa-flag",t.initAttrs.call(this,a)};var o=a.prototype;return o.getMenu=function(){return m("div",{className:"Dropdown-menu "+this.attrs.menuClassName,onclick:this.menuClick.bind(this)},this.showing?C.component({state:this.attrs.state}):"")},o.goToRoute=function(){m.route.set(s().route("flags"))},o.getUnreadCount=function(){return s().flags.cache?s().flags.cache.length:s().forum.attribute("flagCount")},o.getNewCount=function(){return s().session.user.attribute("newFlagCount")},a}(t.n(J)());function Q(){(0,A.extend)(V().prototype,"items",(function(t){s().forum.attribute("canViewFlags")&&t.add("flags",m(K,{state:s().flags}),15)}))}const W=flarum.core.compat["forum/components/Post"];var X=t.n(W);const Y=flarum.core.compat["common/utils/humanTime"];var Z=t.n(Y);function $(){(0,A.extend)(X().prototype,"elementAttrs",(function(t){this.attrs.post.flags().length&&(t.className+=" Post--flagged")})),X().prototype.dismissFlag=function(t){var a=this.attrs.post;return delete a.data.relationships.flags,this.subtree.invalidate(),s().flags.cache&&s().flags.cache.some((function(t,o){if(t.post()===a){if(s().flags.cache.splice(o,1),s().flags.index===a){var e=s().flags.cache[o];if(e||(e=s().flags.cache[0]),e){var n=e.post();s().flags.index=n,m.route.set(s().route.post(n))}}return!0}})),s().request({url:s().forum.attribute("apiUrl")+a.apiEndpoint()+"/flags",method:"DELETE",body:t})},X().prototype.flagActionItems=function(){var t=this,a=new(U()),o=O().destructiveControls(this.attrs.post);return Object.keys(o.items).forEach((function(a){var s=o.get(a).attrs;s.className="Button",(0,A.extend)(s,"onclick",(function(){return t.dismissFlag()}))})),a.add("controls",m("div",{className:"ButtonGroup"},o.toArray())),a.add("dismiss",m(B(),{className:"Button",icon:"far fa-eye-slash",onclick:this.dismissFlag.bind(this)},s().translator.trans("flarum-flags.forum.post.dismiss_flag_button")),-100),a},(0,A.extend)(X().prototype,"content",(function(t){var a=this,o=this.attrs.post,s=o.flags();s.length&&(o.isHidden()&&(this.revealContent=!0),t.unshift(m("div",{className:"Post-flagged"},m("div",{className:"Post-flagged-flags"},s.map((function(t){return m("div",{className:"Post-flagged-flag"},a.flagReason(t))}))),m("div",{className:"Post-flagged-actions"},this.flagActionItems().toArray()))))})),X().prototype.flagReason=function(t){if("user"===t.type()){var a=t.user(),o=t.reason()?s().translator.trans("flarum-flags.forum.flag_post.reason_"+t.reason()+"_label"):null,e=t.reasonDetail(),n=Z()(t.createdAt());return[s().translator.trans(o?"flarum-flags.forum.post.flagged_by_with_reason_text":"flarum-flags.forum.post.flagged_by_text",{time:n,user:a,reason:o}),e?m("span",{className:"Post-flagged-detail"},e):""]}}}const tt={"flags/addFlagsToPosts":$,"flags/addFlagControl":q,"flags/addFlagsDropdown":Q,"flags/models/Flag":i,"flags/components/FlagList":C,"flags/components/FlagPostModal":G,"flags/components/FlagsPage":D,"flags/components/FlagsDropdown":K},at=flarum.core,ot=flarum.core.compat["common/models/Post"];var st=t.n(ot);s().initializers.add("flarum-flags",(function(){st().prototype.flags=n().hasMany("flags"),st().prototype.canFlag=n().attribute("canFlag"),s().store.models.flags=i,s().routes.flags={path:"/flags",component:D},s().flags=new P(s()),q(),Q(),$()})),Object.assign(at.compat,tt)})(),module.exports=a})();
//# sourceMappingURL=forum.js.map