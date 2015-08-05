var mimir = require('./index'),
  bow = mimir.bow,
  dict = mimir.dict,
  tfidf = mimir.tfidf,
  tokenize = mimir.tokenize;

console.log('\n---------- BOW -----------------\n');

var texts = ["I like\n, : ; chocolate",
  "Chocolate; is great",
  "I like  --boar ragu'",
  "I don't like artichokes"
];
var voc = dict(texts);
console.log(bow("boar like chocolate", voc), bow("Ragu is great and I like it", voc));

console.log('\n---------- TD-IDF --------------\n');
console.log('tf-idf for the word chocolate:', tfidf("chocolate", "chocolate chocolate", [
  "chocolate is great",
  "chocolate is chocolate",
  "I love chocolate",
  "No chocolate in this text. Oh wait."
]));

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
