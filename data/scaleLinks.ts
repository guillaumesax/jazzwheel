// One simple tonal reference per phrase. Passing chords that genuinely leave
// that reference stay neutral; brief altered dominants keep the phrase color
// and receive a target note in scaleCues.ts.
export type ScaleLink = number | null | readonly (number | null)[];
const r = (scale: ScaleLink, count: number): ScaleLink[] => Array(count).fill(scale);

export const SCALE_LINKS: Record<string, ScaleLink[]> = {
  'all-of-me': [...r(0, 25), null, [0, null], 0, 0, 0, [0, null], 0],
  'autumn-leaves': [...r(0, 27), 1, 1, 0, 0, 0],
  'beautiful-love': [
    ...r(0, 3), null, ...r(0, 6), null, 0, 0, null, 0, 0,
    [0, null], [null, 0], 0, 0,
  ],
  'blue-bossa': [...r(0, 8), ...r(1, 4), ...r(0, 4)],
  'bluesette': [...r(0, 6), ...r(1, 4), ...r(2, 5), ...r(3, 3), ...r(0, 6)],
  'cantaloupe-island': r(0, 16),
  'footprints': [...r(0, 8), null, null, 0, 0],
  'maiden-voyage': [
    ...r(0, 4), ...r(1, 4), ...r(2, 4), ...r(3, 4), ...r(0, 4), ...r(1, 4),
  ],
  'mr-pc': r(0, 12),
  'nature-boy': r(0, 32),
  'return-of-the-prodigal-son': r(0, 16),
  'road-song': [
    ...r(0, 4), [0, null], 0, [null, 0], 0,
    ...r(0, 4), null, ...r(1, 3), ...r(0, 5),
    [0, null], 0, [null, 0], 0,
  ],
  'so-what': [...r(0, 16), ...r(1, 8), ...r(0, 8)],
  'song-for-my-father': r(0, 16),
  'st-thomas': r(0, 16),
  'summertime': r(0, 16),
  'watermelon-man': r(0, 16),
};
