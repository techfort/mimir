# mimir: Bag-Of-Words and TF-IDF

![mimir](https://upload.wikimedia.org/wikipedia/commons/1/19/Oden_vid_Mims_lik.jpg)

*Mimir knows a lot about words*

`mimir` is a JavaScript micro-module to produce a vocabulary of words given a set of texts, and a vector representation of a text against that vocabulary. It also performs basic TF-IDF analysis.

In NLP and IR, a bag-of-words model is a way to represent a piece of text with a vector, which, in 
JavaScript, is a simple array of integers.
A vector is the imprescindible starting element for any kind of machine learning or classification.

`mimir` disregards all grammar and non-alphanumeric characters.

As your text is now a vector, you can use feed it to trained classifiers such as Artificial Neural Networks (ANN), or a Support Vector Machine (SVM).

# Usage

## BOW

```javascript
var mimir = require('./index'),
  bow = mimir.bow,
  dict = mimir.dict;

var texts = ["I like\n, : ; chocolate",
  "Chocolate; is great",
  "I like  --boar ragu'",
  "I don't like artichokes"
],
  voc = dict(texts);
console.log(bow("boar like chocolate", voc), bow("Ragu is great and I like it", voc));
// prints [ 0, 1, 1, 0, 0, 1, 0, 0, 0 ] [ 1, 1, 0, 1, 1, 0, 1, 0, 0 ]
```

## TF-IDF

Term Frequency - Inverse Document Frequency is extremely important for scoring the importance of words in a series of documents.

```javascript
var mimir = require('./index'),
  tfidf = mimir.tfidf;

var textlist = [
  "World War II, also known as the Second World War (after the recent Great War), was a global war that lasted from 1939 to 1945. World War II is the deadliest conflict in human history",
  "Germanic paganism refers to the theology and religious practices of the Germanic peoples from the Iron Age until their Christianization during the Medieval period.",
  "The Cleveland Bay is a breed of horse that originated in England during the 17th century, named for its consistent bay colouring and the Cleveland district of Yorkshire. It is a strong, well-muscled horse breed, the oldest established breed in England, and the only non-draught horse developed in Great Britain. The ancestors of the breed were developed during the Middle Ages for use as pack horses"
];

textlist.forEach(function (t, index) {
  console.log('Most important words in document', index + 1);
  var scores = {};
  tokenize(t).forEach(function (word) {
    scores[word] = tfidf(word, t, textlist);
  });
  scores = Object.keys(scores).map(function (word) {
    return {
      word: word,
      score: scores[word]
    }
  });
  scores.sort(function (a, b) {
    return a.score < b.score ? 1 : -1;
  });
  console.log(scores.splice(0, 3));
});
/*
prints:
tf-idf for the word chocolate: -0.2231435513142097
Most important words in document 1
[ { word: 'war', score: 0.05792358687259491 },
  { word: 'world', score: 0.034754152123556946 },
  { word: 'ii', score: 0.023169434749037963 } ]
Most important words in document 2
[ { word: 'germanic', score: 0.032437208648653154 },
  { word: 'christianization', score: 0.016218604324326577 },
  { word: 'theology', score: 0.016218604324326577 } ]
Most important words in document 3
[ { word: 'breed', score: 0.023850888712244965 },
  { word: 'horse', score: 0.017888166534183726 },
  { word: 'developed', score: 0.011925444356122483 } ]

*/
