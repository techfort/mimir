var libbow = require('./index'),
  bow = libbow.bow,
  dict = libbow.dict;

var texts = ["I like\n, : ; chocolate",
  "Chocolate; is great",
  "I like  --boar ragu'",
  "I don't like artichokes"
];
var voc = dict(texts);
console.log(bow("boar like chocolate", voc), bow("Ragu is great and I like it", voc));
