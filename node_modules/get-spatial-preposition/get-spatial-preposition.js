var jsonfile = require('jsonfile');

var spatialPrepositions = jsonfile.readFileSync(
  __dirname + '/data/spatial-prepositions.json'
);

var wordRegex = /\w+/;

// Expects piece to contain one word, along with punctuation, maybe.
function getSpatialPreposition(piece) {
  var prep;
  var matches = piece.match(wordRegex);
  if (matches && matches.length > 0) {
    var word = matches[0];
    if (spatialPrepositions.indexOf(word) !== -1) {
      prep = word;
    }
  }
  return prep;
}

module.exports = getSpatialPreposition;
