/**
 * @license
 * [BSD-3-Clause](https://github.com/pryv/unix-timestamp-js/blob/master/LICENSE)
 */
/* global describe, it */

require('mocha');
require('should');

const timestamp = require('../lib/timestamp');
const errorMargin = 0.01;

describe('timestamp', function () {
  describe('.now()', function () {
    it('must return a timestamp for the current time', function () {
      timestamp.now().should.be.approximately(Date.now() / 1000, errorMargin);
    });

    it('must apply the given delta string when specified', function () {
      timestamp.now('-30s').should.be.approximately(timestamp.now() - 30, errorMargin);
    });

    it('must round the timestamp to the second when configured so', function () {
      withRounding(function () {
        const time = timestamp.now();
        time.should.equal(Math.round(time));
      });
    });

    // see .add() tests below for other delta cases
  });

  describe('.add()', function () {
    const time = timestamp.now();
    const testDeltaString = '- 1y 2M 3w 5d 8h 13m 21s 34ms';
    const testDeltaStringWithSpaces = ' - 1 y  2 M  3 w  5 d  8 h  13 m  21 s  34 ms ';
    const testDeltaNumber = -1 *
      (1 * timestamp.Year +
       2 * timestamp.Month +
       3 * timestamp.Week +
       5 * timestamp.Day +
       8 * timestamp.Hour +
       13 * timestamp.Minute +
       21 * timestamp.Second +
       34 * timestamp.Millisecond);

    it('must add the given delta string to the given time', function () {
      timestamp.add(time, testDeltaString).should.be.approximately(time + testDeltaNumber,
        errorMargin);
    });

    it('must support extra spaces in the delta string', function () {
      timestamp.add(time, testDeltaStringWithSpaces).should.be.approximately(time + testDeltaNumber,
        errorMargin);
    });

    it('must add the given delta number to the given time', function () {
      const date = new Date();
      const time = timestamp.fromDate(date);
      const delta = -1 * timestamp.Minute;
      date.setMinutes(date.getMinutes() - 1);
      timestamp.add(time, delta).should.be.approximately(timestamp.fromDate(date), errorMargin);
    });

    it('must round the timestamp to the second when configured so', function () {
      withRounding(function () {
        const time = timestamp.add(123.456, 0);
        time.should.equal(Math.round(time));
      });
    });

    it('must throw an error when passing a time that is not a number', function () {
      (function () { timestamp.add(new Date(), 1); }).should.throwError(/number/);
    });

    it('must throw an error when passing a delta that is neither string nor number', function () {
      (function () { timestamp.add(time, new Date()); }).should.throwError(/string.+number/);
    });

    it('must throw an error when passing an invalid delta string', function () {
      (function () { timestamp.add(time, 'one week'); }).should.throwError(/format/);
    });
  });

  describe('.duration()', function () {
    it('must work as sugar for .add() with a time of zero', function () {
      timestamp.duration('1h').should.be.approximately(timestamp.add(0, '1h'), errorMargin);
    });
  });

  describe('.fromDate()', function () {
    it('must return a timestamp for the given Date object', function () {
      timestamp.fromDate(new Date()).should.be.approximately(timestamp.now(), errorMargin);
    });

    it('must return a timestamp for the given date string', function () {
      const expected = Date.UTC(2014, 1, 15, 0, 0, 0) / 1000;
      timestamp.fromDate('2014-02-15T00:00:00Z').should.be.approximately(expected, errorMargin);
    });

    it('must round the timestamp to the second when configured so', function () {
      withRounding(function () {
        const time = timestamp.fromDate('2014-02-15T00:00:00.5Z');
        time.should.equal(Math.round(time));
      });
    });

    it('must throw an error when passing something else', function () {
      (function () { timestamp.fromDate(1); }).should.throwError(/string.+date/);
    });
  });

  describe('.toDate()', function () {
    it('must return a Date for the given timestamp', function () {
      const date = new Date();
      const time = timestamp.fromDate(date);
      timestamp.toDate(time).should.eql(date);
    });

    it('must throw an error when passing something else', function () {
      (function () { timestamp.toDate(new Date()); }).should.throwError(/number/);
    });
  });
});

function withRounding (fn) {
  timestamp.round = true;
  try {
    fn();
  } finally {
    timestamp.round = false;
  }
}
