/**
* @param {string}  tagName     Name of the tag used by this pass
* @param {string}  syntaxChar  Relevant character used by this syntax
* @param {!RegExp} shortRegexp Regexp used for the short form syntax
* @param {!RegExp} longRegexp  Regexp used for the long form syntax
*/
function parseAbstractScript(tagName, syntaxChar, shortRegexp, longRegexp)
{
	let pos = text.indexOf(syntaxChar);
	if (pos === -1)
	{
		return;
	}

	parseShortForm(pos);
	parseLongForm(pos);

	/**
	* Parse the long form x^(x)
	*
	* This syntax is supported by RDiscount
	*
	* @param {number} pos Position of the first relevant character
	*/
	function parseLongForm(pos)
	{
		pos = text.indexOf(syntaxChar + '(', pos);
		if (pos === -1)
		{
			return;
		}

		let m, regexp = longRegexp, hasMatched = false;
		regexp.lastIndex = pos;
		while (m = regexp.exec(text))
		{
			let match    = m[0],
				matchPos = m.index,
				matchLen = match.length;

			addTagPair(tagName, matchPos, 2, matchPos + matchLen - 1, 1);
			overwrite(matchPos, matchLen);

			hasMatched = true;
		}
		if (hasMatched)
		{
			parseLongForm(pos);
		}
	}

	/**
	* Parse the short form x^x and x^x^
	*
	* This syntax is supported by most implementations that support superscript
	*
	* @param {number} pos Position of the first relevant character
	*/
	function parseShortForm(pos)
	{
		let m, regexp = shortRegexp;
		regexp.lastIndex = pos;
		while (m = regexp.exec(text))
		{
			let match    = m[0],
				matchPos = m.index,
				matchLen = match.length,
				startPos = matchPos,
				endLen   = (match.charAt(matchLen - 1) === syntaxChar) ? 1 : 0,
				endPos   = matchPos + matchLen - endLen;

			addTagPair(tagName, startPos, 1, endPos, endLen);
		}
	}
}