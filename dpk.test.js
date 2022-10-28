const { deterministicPartitionKey } = require("./dpk");

const cases = [
  { key: 1, result: "ca2c70bc13298c5109ee0cb342d014906e6365249005fd4beee6f01aee44edb531231e98b50bf6810de6cf687882b09320fdd5f6375d1f2debd966fbf8d03efa" },
  { key: { partitionKey: undefined }, result: "c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862" },
  { key: 'x'.repeat(300), result: "175a2336759a9845c280d8a473608b1797ec0d73c7e7e43e6700c96bea04caa9feed74091369cdeb83d16226098428d5a9c87614829013fa0d631d57a482a0c3" },
  { key: { partitionKey: 1 }, result: "1" },
  { key: { partitionKey: 'x'.repeat(300) }, result: "523a0d2bd185ddcb7fb5e8d94f241da1cb620ed27ca715f9b0333ed38274fe2f47d35b7aed799cd1d35a68a728ceabb1f0c3ae6f6befbe94b4234e68aaa120da" },
  { key: {}, result: "c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862" },
];

describe.each(cases)(
  "Returns the literal 'trivial key' when given valid inputs",
  ({ key, result }) => {
    test(`should return a valid result when given ${formatTestTitle(key)}`, () => {
      const trivialKey = deterministicPartitionKey(key);
      expect(trivialKey).toBe(result);
    })
  });

const edgeCases = [
  { key: undefined, result: "0" },
  { key: '', result: "0" },
  { key: null, result: "0" },
]

describe.each(edgeCases)(
  "Returns the literal 'trivial key' when given edge cases",
  ({ key, result }) => {
    test(`should return a valid result when given an edge case such as ${formatTestTitle(key)}`, () => {
      const trivialKey = deterministicPartitionKey(key);
      expect(trivialKey).toBe(result);
    });
  });

function formatTestTitle(key) {
  if (!key) return key;
  
  return JSON.stringify(key).slice(0, 50)
}