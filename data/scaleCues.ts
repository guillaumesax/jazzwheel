// Concert-pitch notes to emphasize when an altered chord briefly leaves the
// single scale printed for its phrase. Bar numbers are one-based, as on screen.
// These are chord-tone targets, not additional scale recommendations.
const on = (bars: readonly number[], ...notes: string[]) =>
  Object.fromEntries(bars.map(bar => [bar, notes])) as Record<number, readonly string[]>;

export const SCALE_CUES: Record<string, Record<number, readonly string[]>> = {
  'all-of-me': {
    ...on([3, 4, 9, 10, 19, 20], 'G#'),
    ...on([5, 6, 11, 12, 21, 22, 28], 'C#'),
    ...on([13, 14], 'F#'),
  },
  'autumn-leaves': {
    ...on([6, 14, 18, 26, 30], 'F#'),
    ...on([27], 'E'),
    ...on([32], 'B'),
  },
  'beautiful-love': {
    ...on([2, 8, 12, 16, 18], 'C#'),
  },
  'blue-bossa': {
    ...on([6, 14, 16], 'B'),
  },
  'bluesette': {
    ...on([4], 'F#'),
    ...on([6], 'E'),
    ...on([15], 'B'),
    ...on([19], 'Gb'),
  },
  'cantaloupe-island': {
    ...on([9, 10, 11, 12], 'A'),
  },
  footprints: {
    ...on([5, 6], 'Ab'),
  },
  'mr-pc': {
    ...on([5, 6], 'Ab'),
  },
  'nature-boy': {
    ...on([2, 4, 5, 9, 10, 15, 16, 18, 20, 21, 25, 26, 30, 32], 'C#'),
    ...on([6, 22, 28], 'B'),
    ...on([13, 14, 29], 'G#', 'B'),
  },
  'return-of-the-prodigal-son': {
    ...on([1, 2, 3, 4, 5, 6, 7, 8, 12, 16], 'A'),
    ...on([11, 15], 'B'),
  },
  'road-song': {
    ...on([3, 8, 17, 20, 25], 'F#'),
    ...on([4, 21], 'E', 'F#'),
  },
  'song-for-my-father': {
    ...on([5, 13], 'B'),
    ...on([14], 'E'),
  },
  'st-thomas': {
    ...on([2, 6, 10], 'C#'),
    ...on([9, 13], 'Bb'),
    ...on([14], 'F#', 'Eb'),
  },
  summertime: {
    ...on([4], 'F#'),
    ...on([8, 14, 16], 'C#'),
  },
  'watermelon-man': {
    ...on([5, 6, 10, 12, 14], 'D'),
    ...on([9, 11, 13], 'E'),
  },
};
