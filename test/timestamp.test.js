require('mocha');
require('should');

var timestamp = require('../lib/timestamp'),
    Constants = require('../lib/Constants'),
    errorMargin = 0.01;

describe('timestamp', function () {

  describe('.now()', function () {

    it('must return a timestamp for the current time', function() {
      timestamp.now().should.be.approximately(Date.now() / 1000, errorMargin);
    });

    it('must apply the given delta string when specified', function() {
      timestamp.now('-30s').should.be.approximately(timestamp.now() - 30, errorMargin);
    });

    // see .add() tests below for other delta cases

  });

  describe('.add()', function () {

    var time = timestamp.now(),
        testDeltaString = '- 1y 2M 3w 5d 8h 13m 21s 34ms',
        testDeltaStringWithSpaces = ' - 1 y  2 M  3 w  5 d  8 h  13 m  21 s  34 ms ';
    var testDeltaNumber = - 1 *
        (1 * Constants.Year +
         2 * Constants.Month +
         3 * Constants.Week +
         5 * Constants.Day +
         8 * Constants.Hour +
        13 * Constants.Minute +
        21 * Constants.Second +
        34 * Constants.Millisecond);

    it('must add the given delta string to the given time', function() {
      timestamp.add(time, testDeltaString).should.be.approximately(time + testDeltaNumber,
          errorMargin);
    });

    it('must support extra spaces in the delta string', function () {
      timestamp.add(time, testDeltaStringWithSpaces).should.be.approximately(time + testDeltaNumber,
          errorMargin);
    });

    it('must add the given delta number to the given time', function () {
      var date = new Date(),
          time = timestamp.fromDate(date),
          delta = - 1 * Constants.Minute;
      date.setMinutes(date.getMinutes() - 1);
      timestamp.add(time, delta).should.be.approximately(timestamp.fromDate(date), errorMargin);
    });

    it('must throw an error when passing a time that is not a number', function () {
      (function () { timestamp.add(new Date(), 1); }).should.throw(/number/);
    });

    it('must throw an error when passing a delta that is neither string nor number', function () {
      (function () { timestamp.add(time, new Date()); }).should.throw(/string.+number/);
    });

    it('must throw an error when passing an invalid delta string', function () {
      (function () { timestamp.add(time, 'one week'); }).should.throw(/format/);
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
      var expected = Date.UTC(2014, 1, 15, 0, 0, 0) / 1000;
      timestamp.fromDate('2014-02-15T00:00:00Z').should.be.approximately(expected, errorMargin);
    });

    it('must throw an error when passing something else', function () {
      (function () { timestamp.fromDate(1); }).should.throw(/string.+date/);
    });

  });

});
