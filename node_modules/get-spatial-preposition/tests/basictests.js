var test = require('tape');
var getSpatialPreposition = require('../get-spatial-preposition');

var testCases = [
  {
    wordFragment: 'My',
    expected: undefined
  },
  {
    wordFragment: 'words',
    expected: undefined
  },
  {
    wordFragment: 'fly',
    expected: undefined
  },
  {
    wordFragment: 'up,',
    expected: 'up'
  },
  {
    wordFragment: 'my',
    expected: undefined
  },
  {
    wordFragment: 'thoughts',
    expected: undefined
  },
  {
    wordFragment: 'remain',
    expected: undefined
  },
  {
    wordFragment: 'below:',
    expected: 'below'
  },
  {
    wordFragment: 'Words',
    expected: undefined
  },
  {
    wordFragment: 'without',
    expected: 'without'
  },
  {
    wordFragment: 'thoughts',
    expected: undefined
  },
  {
    wordFragment: 'never',
    expected: undefined
  },
  {
    wordFragment: 'to',
    expected: undefined
  },
  {
    wordFragment: 'heaven',
    expected: undefined
  },
  {
    wordFragment: 'go',
    expected: undefined
  }
];

testCases.forEach(runTest);

function runTest(testCase) {
  test('Find preposition', function basicTest(t) {
    t.plan(1);

    t.equal(
      getSpatialPreposition(testCase.wordFragment),
      testCase.expected,
      'Gets expected spatial preposition from fragment.'
    );
  });
}
