# unix-timestamp

Tiny library to create and manipulate Unix timestamps in Javascript. (A Unix timestamp is the number of seconds elapsed since Unix epoch time, i.e. January 1 1970 00:00 UTC.)

[![NPM version](https://badge.fury.io/js/unix-timestamp.png)](http://badge.fury.io/js/unix-timestamp)

## Usage

Install with `npm install unix-timestamp`, then:

- `timestamp.now([delta])` gives the current time, optionally applying a delta (see below)
- `timestamp.fromDate(dateOrString)` gives the time from a Javascript Date object or an ISO 8601 date string
- `timestamp.add(time, delta)` applies a delta to the given time
- `timestamp.duration(delta)` gives the delta timestamp for the given delta string

A delta can be either a number (unit: seconds) or a string with format `[+|-] [{years}y] [{months}M] [{weeks}w] [{days}d] [{hours}h] [{minutes}m] [{seconds}s] [{milliseconds}ms]` (for example `-30s`).

## Tests

Install dev dependencies with `npm install`, then `npm test`.

## License

[Revised BSD license](https://github.com/pryv/documents/blob/master/license-bsd-revised.md)
