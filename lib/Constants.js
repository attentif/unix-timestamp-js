var Constants = module.exports = {};

Constants.Millisecond = 0.001;
Constants.Second = 1;
Constants.Minute = 60;
Constants.Hour = 60 * Constants.Minute;
Constants.Day = 24 * Constants.Hour;
Constants.Week = 7 * Constants.Day;
// mean Gregorian month
Constants.Month = 30.436875 * Constants.Day;
Constants.Year = 12 * Constants.Month;
