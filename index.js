(function () {

  function tokenize(text) {
    return text
      .replace(/'/g, '')
      .replace(/\W/g, ' ')
      .replace(/\s\s+/g, ' ')
      .split(' ').map(function (s) {
        return s.toLowerCase();
      });
  }

  function extractDictionary(textArray) {
    var dict = {},
      keys = [],
      words;
    textArray = Array.isArray(textArray) ? textArray : [textArray];
    textArray.forEach(function (text) {
      words = tokenize(text);
      words.forEach(function (word) {
        word = word.toLowerCase();
        if (!dict[word] && word !== '') {
          dict[word] = 1;
          keys.push(word);
        } else {
          dict[word] += 1;
        }
      });
    });

    return {
      words: keys,
      dict: dict
    };
  }

  function bow(text, vocabulary) {
    var dict = extractDictionary([text]).dict,
      vector = [];

    vocabulary.words.forEach(function (word) {
      vector.push(dict[word] || 0);
    });
    return vector;
  }

  function tf(word, text) {
    var input = word.toLowerCase();
    var dict = extractDictionary(text).dict;
    return dict[input] / tokenize(text).length;
  }

  function wordInDocsCount(word, textlist) {
    var sum = 0;
    textlist.forEach(function (text) {
      sum += tokenize(text).indexOf(word) > -1 ? 1 : 0;
    });
    return sum;
  }

  function idf(word, textlist) {
    return Math.log(textlist.length / (1 + wordInDocsCount(word, textlist)));
  }

  function tfidf(word, text, textlist) {
    return tf(word, text) * idf(word, textlist);
  }

  module.exports = {
    dict: extractDictionary,
    bow: bow,
    tfidf: tfidf,
    tokenize: tokenize
  };

}());
