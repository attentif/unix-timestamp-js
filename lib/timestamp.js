/**
 * @license
 * [BSD-3-Clause](https://github.com/pryv/unix-timestamp-js/blob/master/LICENSE)
 */
/**
 * Tiny library to create and manipulate Unix timestamps
 * (i.e. defined as the number of seconds since Unix epoch time).
 */

const timestamp = module.exports = {};

// constants

timestamp.Millisecond = 0.001;
timestamp.Second = 1;
timestamp.Minute = 60;
timestamp.Hour = 60 * timestamp.Minute;
timestamp.Day = 24 * timestamp.Hour;
timestamp.Week = 7 * timestamp.Day;
/**
 * = mean Gregorian month
 */
timestamp.Month = 30.436875 * timestamp.Day;
timestamp.Year = 12 * timestamp.Month;

const OffsetRegExp = new RegExp('^\\s*' +
    '([-+]?)\\s*' +
    ['y', 'M', 'w', 'd', 'h', 'm', 's', 'ms']
      .map(function (t) { return '(?:(\\d+)\\s*' + t + ')?'; })
      .join('\\s*') +
    '\\s*$');

let outputFn = dontRound;
function dontRound (time) { return time; }
function round (time) { return Math.round(time); }
/**
 * Set to `true` to round all returned timestamps to the second. Defaults to `false`.
 */
Object.defineProperty(timestamp, 'round', {
  get: function () { return outputFn === round; },
  set: function (value) { outputFn = value ? round : dontRound; }
});

/**
 * Gets the current time as Unix timestamp.
 * Optionally applying a given offset specified as either a human-readable string or a number of
 * seconds.
 *
 * @param {String|Number} offset The optional time offset to apply
 * @returns {Number} The corresponding timestamp
 */
timestamp.now = function (offset) {
  const now = Date.now() / 1000;
  return outputFn(offset ? timestamp.add(now, offset) : now);
};

/**
 * Applies the given offset to the given timestamp.
 * The offset is specified as either a human-readable string or a number of
 * seconds.
 *
 * @param {Number} time The original timestamp
 * @param {String|Number} offset The time offset to apply
 * @returns {Number} The result timestamp
 */
timestamp.add = function (time, offset) {
  if (!isNumber(time)) {
    throw new Error('Time must be a number');
  }
  if (isString(offset)) {
    const matches = OffsetRegExp.exec(offset);
    if (!matches) {
      throw new Error('Expected offset string format: [+|-] [{years}y] [{months}M] [{weeks}w] ' +
          '[{days}d] [{hours}h] [{minutes}m] [{seconds}s] [{milliseconds}ms]');
    }
    offset = (matches[1] === '-' ? -1 : 1) * (
      (matches[2] || 0) * timestamp.Year +
      (matches[3] || 0) * timestamp.Month +
      (matches[4] || 0) * timestamp.Week +
      (matches[5] || 0) * timestamp.Day +
      (matches[6] || 0) * timestamp.Hour +
      (matches[7] || 0) * timestamp.Minute +
      (matches[8] || 0) * timestamp.Second +
      (matches[9] || 0) * timestamp.Millisecond
    );
  } else if (!isNumber(offset)) {
    throw new Error('Offset must be either a string or a number');
  }
  return outputFn(time + offset);
};

/**
 * Gets the offset timestamp for the given offset string.
 * (Alias for .add() using a time of zero.)
 *
 * @param {String|Number} offset The time offset for the duration
 * @returns {Number} The result time offset
 */
timestamp.duration = function (offset) {
  return timestamp.add(0, offset);
};

/**
 * Gets the Unix timestamp for the given date object or string.
 *
 * @param {Date|String} date A date object or an ISO 8601 date string
 * @returns {Number} The corresponding timestamp
 */
timestamp.fromDate = function (date) {
  if (isString(date)) {
    date = new Date(date);
  } else if (!isDate(date)) {
    throw new Error('Expected either a string or a date');
  }
  return outputFn(date.getTime() / 1000);
};

/**
 * Gets the date for the given Unix timestamp.
 *
 * @param {Number} time A timestamp
 * @returns {Date} The corresponding date
 */
timestamp.toDate = function (time) {
  if (!isNumber(time)) {
    throw new Error('Expected a number');
  }
  return new Date(time * 1000);
};

function isString (value) {
  return typeof value === 'string' || Object.prototype.toString.call(value) === '[object String]';
}

function isNumber (value) {
  return typeof value === 'number' || Object.prototype.toString.call(value) === '[object Number]';
}

function isDate (value) {
  return Object.prototype.toString.call(value) === '[object Date]';
}
