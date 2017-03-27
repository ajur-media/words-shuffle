/**
 * Created by bargamut on 26.03.17.
 */

(function () {
	var $arrNodes = [];

	function getTextElements($parent) {
		$parent = $parent || document.body;

		var $childNodes = $parent.childNodes;

		for (var i = 0; i < $childNodes.length; i++) {
			var $textNode = $childNodes[i];

			if ($textNode.nodeType === 1) {
				getTextElements($textNode);
				continue;
			}

			if ($textNode.nodeType !== 3 ||
				$textNode.nodeValue.match(/^[\s]*$/) !== null
			)
				continue;

			$arrNodes.push($textNode);
		}
	}

	function shuffleWords(text) {
		var words = text.split(' ');

		for (var n = 0; n < words.length; n++) {
			if (words[n].length < 4) continue;

			words[n] = words[n].replace(/^(.)(.+)(.)$/, function (str, firstLetter, toShuffle, lastLetter, offset, s) {
				var saver = 3,
						newWord = s;

				while (s === newWord) {
					toShuffle = toShuffle.split('');

					toShuffle.sort(function (a, b) {
						return Math.random() - .5;
					});

					toShuffle = toShuffle.join('');

					console.log(firstLetter + toShuffle + lastLetter);

					newWord = firstLetter + toShuffle + lastLetter;

					if (--saver === 0) break;
				}

				return newWord;
			});
		}

		console.log(words);

		return words.join(' ');
	}

	getTextElements();

	console.log($arrNodes);

	for (var k = 0; k < $arrNodes.length; k++) {
		var a = shuffleWords($arrNodes[k].nodeValue);

		console.log(a);

		$arrNodes[k].nodeValue = a;
	}
})();