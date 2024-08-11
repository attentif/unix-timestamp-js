interface Timestamp {
  /**
   * Set to `true` to round all returned timestamps to the second.
   * @default false
   */
  round: boolean;

  /**
   * Gets the current time as Unix timestamp.
   * Optionally applying a given offset specified as either a human-readable string or a number of
   * seconds.
   *
   * @param offset The optional time offset to apply
   * @returns The corresponding timestamp
   */
  now(offset?: string | number): number;

  /**
   * Applies the given offset to the given timestamp.
   * The offset is specified as either a human-readable string or a number of
   * seconds.
   *
   * @param time The original timestamp
   * @param offset The time offset to apply
   * @returns The result timestamp
   */
  add(time: number, offset: string | number): number;

  /**
   * Gets the offset timestamp for the given offset string.
   * (Alias for .add() using a time of zero.)
   *
   * @param offset The time offset for the duration
   * @returns The result time offset
   */
  duration(offset: string | number): number;

  /**
   * Gets the Unix timestamp for the given date object or string.
   *
   * @param date A date object or an ISO 8601 date string
   * @returns The corresponding timestamp
   */
  fromDate(date: Date | string): number;

  /**
   * Gets the date for the given Unix timestamp.
   *
   * @param time A timestamp
   * @returns The corresponding date
   */
  toDate(time: number): Date;
}

declare const timestamp: Timestamp;

export = timestamp;
