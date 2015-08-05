# bagofwords (BOW) and TF-IDF

`bagofwords` is a JavaScript micro-module to produce a vocabulary of words given a set of texts, and a vector representation of a text against that vocabulary. It also performs TF-IDF analysis.

In NLP and IR, a bag-of-words model is a way to represent a piece of text with a vector, which, in 
JavaScript, is a simple array of integers.
A vector is the imprescindible starting element for any kind of machine learning or classification.

`bagofwords` disregards all grammar and non-alphanumeric characters.

As your text is now a vector, you can use feed it to trained classifiers such as Artificial Neural Networks (ANN), or a Support Vector Machine (SVM).

# Usage

## BOW

```javascript
var libbow = require('./index'),
  bow = libbow.bow,
  dict = libbow.dict;

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
var libbow = require('./index'),
  tfidf = libbow.tfidf;

console.log(tfidf("chocolate", "chocolate chocolate", [
  "chocolate is great",
  "chocolate is chocolate",
  "I love chocolate",
  "No chocolate in this text. Oh wait."
]));
