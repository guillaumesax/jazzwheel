// One scale card index (0-based) for each written chord. Null means the listed
// scales do not describe that passing chord: follow its chord tones instead.
// A number covers the whole bar; an array follows the chords from left to right.
export type ScaleLink = number | null | readonly (number | null)[];
const r = (scale: ScaleLink, count: number): ScaleLink[] => Array(count).fill(scale);

export const SCALE_LINKS: Record<string, ScaleLink[]> = {
  'all-of-me': [
    ...r(0, 2), ...r(1, 2), ...r(2, 2), ...r(3, 2),
    ...r(1, 2), ...r(2, 2), ...r(4, 2), 3, 0,
    ...r(0, 2), ...r(1, 2), ...r(2, 2), ...r(3, 2),
    0, null, [0, null], 2, 3, 0, [0, null], [3, 0],
  ],
  'autumn-leaves': [
    1, 1, 1, 1, 2, 3, 0, 0,
    1, 1, 1, 1, 2, 3, 0, 0,
    2, 3, 0, 0, 1, 1, 1, 1,
    2, 3, [0, null], [null, null], 1, [2, 3], 0, null,
  ],
  'beautiful-love': [
    1, 2, 0, null, 3, 3, 3, [1, 2],
    0, 3, null, 2, 0, null, 1, 2,
    [0, null], [null, 2], 0, 0,
  ],
  'blue-bossa': [
    ...r(0, 4), 1, 2, 0, 0, ...r(3, 4), 1, 2, 0, [1, 2],
  ],
  'bluesette': [
    0, 0, 1, 1, 1, null, 2, 2,
    2, 2, 3, 3, 3, 3, null, 4,
    4, 4, null, 0, 0, 0, 0, 0,
  ],
  'cantaloupe-island': [
    ...r(1, 4), ...r(2, 4), ...r(3, 4), ...r(0, 4),
  ],
  'footprints': [
    ...r(1, 4), ...r(2, 2), ...r(0, 2), [null, null], [null, null], ...r(0, 2),
  ],
  'maiden-voyage': [
    ...r(0, 4), ...r(1, 4), ...r(2, 4), ...r(3, 4), ...r(0, 4), ...r(1, 4),
  ],
  'mr-pc': [
    ...r(0, 4), ...r(1, 2), 0, [0, 2], [0, 2], 2, 0, 0,
  ],
  'nature-boy': [
    0, [2, 3], 0, [2, 3], [0, 1], [0, 1], [0, 0], 2,
    3, 3, 0, 0, 4, 4, 3, 3,
    0, [2, 3], 0, [2, 3], [0, 1], [0, 1], [0, 0], 2,
    3, 3, 0, null, 4, 3, 0, [2, 3],
  ],
  'return-of-the-prodigal-son': [
    ...r([0, 0], 4), ...r([1, 1], 4),
    [0, 0], [2, 0], [0, 3, 0], [1, 1],
    [0, 0], [2, 0], [0, 3, 0], [1, 1],
  ],
  'road-song': [
    0, 0, 1, [null, 1], [0, null], [2, 2], [null, 2], [1, 0],
    [2, 2], 2, 2, 2, [null, null], 3, 3, 3,
    1, 0, 0, 1, [null, 1], [0, null], [2, 2], [null, 2],
    [1, 0],
  ],
  'so-what': [...r(0, 16), ...r(1, 8), ...r(0, 8)],
  'song-for-my-father': [
    0, 0, 2, 2, 3, 4, 1, 1,
    2, 2, 0, 0, [2, 3], 4, 1, 1,
  ],
  'st-thomas': [
    0, 1, [2, 0], 0, 0, 1, [2, 0], 0,
    null, 1, 2, 0, [null, null], [0, null], [0, 0], 0,
  ],
  'summertime': [
    0, 0, 0, [0, null], 1, 1, null, 2,
    0, 0, 0, [1, 0], 0, [null, 2], 0, 2,
  ],
  'watermelon-man': [
    ...r(0, 4), ...r(1, 2), ...r(0, 2),
    2, 1, 2, 1, 2, 1, 0, 0,
  ],
};
