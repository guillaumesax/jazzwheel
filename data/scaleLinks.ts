// The colors follow tonal phrases, not a separate mode for each chord.
// A number covers a whole bar. Split links are kept only when the harmony
// really changes within that bar. Null marks a chromatic passing chord:
// follow its chord tones rather than claiming the parent scale fits literally.
export type ScaleLink = number | null | readonly (number | null)[];
const r = (scale: ScaleLink, count: number): ScaleLink[] => Array(count).fill(scale);

export const SCALE_LINKS: Record<string, ScaleLink[]> = {
  'all-of-me': [
    ...r(0, 2), ...r(1, 2), ...r(2, 2), ...r(0, 2),
    ...r(1, 2), ...r(2, 2), ...r(3, 2), 0, 0,
    ...r(0, 2), ...r(1, 2), ...r(2, 2), ...r(0, 2),
    0, null, [0, null], 2, 0, 0, [0, null], 0,
  ],
  'autumn-leaves': [
    ...r(0, 4), ...r(1, 2), ...r(0, 2),
    ...r(0, 4), ...r(1, 2), ...r(0, 2),
    ...r(1, 2), ...r(0, 6),
    ...r(1, 2), [0, null], 2, 2, 1, 0, null,
  ],
  'beautiful-love': [
    1, 1, 0, null, 0, 0, 0, 1,
    0, 0, null, 1, 0, null, 1, 1,
    [0, null], [null, 1], 0, 0,
  ],
  'blue-bossa': [
    ...r(0, 4), 1, 1, 0, 0, ...r(2, 4), 1, 1, 0, 1,
  ],
  'bluesette': [
    0, 0, 1, 1, 0, null, ...r(2, 4),
    ...r(3, 4), null, 4, 4, 4,
    1, ...r(0, 5),
  ],
  'cantaloupe-island': r(0, 16),
  'footprints': r(0, 12),
  'maiden-voyage': [
    ...r(0, 4), ...r(1, 4), ...r(2, 4), ...r(3, 4), ...r(0, 4), ...r(1, 4),
  ],
  'mr-pc': r(0, 12),
  'nature-boy': [
    0, 2, 0, 2, [0, 1], [0, 1], 0, 2,
    2, 2, 0, 0, 3, 3, 2, 2,
    0, 2, 0, 2, [0, 1], [0, 1], 0, 2,
    2, 2, 0, 1, 3, 2, 0, 2,
  ],
  'return-of-the-prodigal-son': [
    ...r(0, 8), 1, 1, [1, 2, 1], 0,
    1, 1, [1, 2, 1], 0,
  ],
  'road-song': [
    0, 0, 1, 1, [0, null], 2, [null, 2], [1, 0],
    ...r(2, 4), null, 3, 3, 3,
    1, 0, 0, 1, 1, [0, 3], 2, [null, 2], [1, 0],
  ],
  'so-what': [...r(0, 16), ...r(1, 8), ...r(0, 8)],
  'song-for-my-father': [
    0, 0, 0, 0, 1, 0, 0, 0,
    0, 0, 0, 0, [0, 1], 2, 0, 0,
  ],
  'st-thomas': [
    0, 1, 0, 0, 0, 1, 0, 0,
    null, 1, 0, 0, 2, [2, null], 0, 0,
  ],
  'summertime': [
    0, 0, 0, [0, null], 0, 0, 1, 1,
    0, 0, 0, 0, 0, 1, 0, 1,
  ],
  'watermelon-man': r(0, 16),
};
