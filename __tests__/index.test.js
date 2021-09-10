const epochToTimestamp = require('../index');

describe('', () => {
  it('should throw error when epoch is invalid', () => {
    expect(() => epochToTimestamp("xx")).toThrow('Epoch is not a number');
    expect(() => epochToTimestamp([])).toThrow('Epoch is not a number');
    expect(() => epochToTimestamp({"foo":"bar"})).toThrow('Epoch is not a number');
    expect(() => epochToTimestamp(() => null)).toThrow('Epoch is not a number');
  });

  it('should not throw error when valid epoch', () => {
    expect(() => epochToTimestamp("1234567891")).not.toThrow();
    expect(() => epochToTimestamp(1)).not.toThrow();
    expect(() => epochToTimestamp("123456789101200")).not.toThrow();
    expect(() => epochToTimestamp(12345678910120)).not.toThrow();
  });

  it.each([
    ['1631277098', '2021-09-10 12:31:38'],
    ['1631277098000', '2021-09-10 12:31:38'],
    ['163127709', '1975-03-04 01:15:09'],
    ['16312770981000', '2486-12-06 05:16:21'],
  ])('should return iso string with T replace with spaces for %i', (epoch, isoString) => {
    expect(epochToTimestamp(epoch, true)).toEqual(isoString);
  });

  it.each([
    ['1631277098', '2021-09-10T12:31:38'],
    ['1631277098000', '2021-09-10T12:31:38'],
    ['163127709', '1975-03-04T01:15:09'],
    ['16312770981000', '2486-12-06T05:16:21'],
  ])('should return iso string for %i', (epoch, isoString) => {
    expect(epochToTimestamp(epoch, false)).toEqual(isoString);
    expect(epochToTimestamp(epoch)).toEqual(isoString);
  });
});