const { isRealString } = require('../server/utils/validation');

describe('validation unit test', () => {
  test('isRealString() returns true for string', () => {
    const result = isRealString('unitTest');
    expect(result).toBe(true);
  });
  test('isRealString() returns false for empty string', () => {
    const result = isRealString('');
    expect(result).toBe(false);
  });
  test('isRealString() returns false for whitespaces', () => {
    const result = isRealString('   ');
    expect(result).toBe(false);
  });
  test('isRealString() returns false for number', () => {
    const result = isRealString(123);
    expect(result).toBe(false);
  });
});
