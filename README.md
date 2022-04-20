# unix-timestamp

[![CI](https://github.com/pryv/unix-timestamp-js/workflows/CI/badge.svg)](https://github.com/pryv/unix-timestamp-js/actions/workflows/ci.yml) [![npm](https://img.shields.io/npm/v/unix-timestamp)](https://www.npmjs.com/package/unix-timestamp)

Tiny library to create and manipulate Unix timestamps in Javascript. (A Unix timestamp is the number of seconds elapsed since Unix epoch time, i.e. January 1 1970 00:00 UTC.)


## Usage

```sh
npm install unix-timestamp
```

Then:
```javascript
const timestamp = require('unix-timestamp');
```

### Methods

- `.now([offset])` gives the current time, optionally applying an offset (see below)
- `.fromDate(dateOrString)` gives the time from a Javascript Date object or an ISO 8601 date string
- `.toDate(time)` correspondingly gives the date from a timestamp
- `.add(time, offset)` applies an offset to the given time
- `.duration(offset)` gives the offset timestamp for the given offset string

An offset can be either a number (unit: seconds) or a string with format `[+|-] [{years}y] [{months}M] [{weeks}w] [{days}d] [{hours}h] [{minutes}m] [{seconds}s] [{milliseconds}ms]` (for example `-30s`).

The actual values (in seconds) used for each unit of time in an offset string are exposed by properties `.Millisecond`, `.Second`, `.Minute`, `.Hour`, `.Day`, `.Week`, `.Month` (i.e. mean Gregorian month) and `.Year`.

### About rounding

By default timestamps include decimals (fractions of a second). You can set the lib to round all returned timestamps to the second with `timestamp.round = true`.


## Contributing

`npm test` runs the [tests](./test) with [Mocha](https://mochajs.org/).

`npm run test-cover` runs the tests and outputs coverage stats with [Istanbul](https://istanbul.js.org/).

`npm run license` updates license information with [source-licenser](https://github.com/pryv/source-licenser).

The code follows the [Semi-Standard](https://github.com/standard/semistandard) style.


## License

[BSD-3-Clause](https://github.com/pryv/unix-timestamp-js/blob/master/LICENSE)
