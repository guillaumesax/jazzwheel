import { describe, expect, it, vi } from 'vitest';
import { getNoteIndex, transposeNote, formatScaleName, scaleNotes, formatFrenchNote, transposeChord } from '../utils/musicUtils';
import { parseFilters, filterStandards } from '../utils/filters';
import { rotationForIndex, indexAtPointer } from '../utils/wheelUtils';
import { readStorage, writeStorage } from '../utils/storage';
import { JAZZ_STANDARDS } from '../data/tunes';
import { CHARTS } from '../data/charts';
import { SCALE_LINKS } from '../data/scaleLinks';
import { SCALE_CUES } from '../data/scaleCues';

describe('transposition', () => {
  it.each([
    ['Bb', 2, 'auto', 'C'], ['Eb', 9, 'auto', 'C'], ['C', 9, 'auto', 'A'],
    ['Db', 0, 'auto', 'Db'], ['Gb', 0, 'auto', 'Gb'], ['C#', 0, 'auto', 'C#'],
    ['C', -1, 'auto', 'B'], ['C', -13, 'b', 'B'], ['C', 26, '#', 'D'],
    ['Eb', 0, '#', 'D#'], ['F#', 0, 'b', 'Gb'], ['Cb', 2, 'auto', 'Db'],
    ['B#', 0, '#', 'C'], ['B♭', 2, 'auto', 'C'],
  ] as const)('%s + %i (%s) = %s', (root, shift, pref, result) => {
    expect(transposeNote(root, shift, pref)).toBe(result);
  });
  it('handles invalid input without producing an undefined note', () => {
    expect(getNoteIndex('H')).toBe(-1);
    expect(transposeNote('H', 2, 'auto')).toBe('H');
    expect(transposeNote('C', NaN, 'auto')).toBe('C');
    expect(formatScaleName('C', 'pentatonic minor')).toBe('C pentatonique mineure');
    expect(formatScaleName('D', 'dorian')).toBe('D dorien');
    expect(formatScaleName('F', 'mixolydian')).toBe('F mixolydien');
  });
  it('spells useful modes and altered scales with the correct pitches', () => {
    expect(scaleNotes('D', 'dorian')).toEqual(['D', 'E', 'F', 'G', 'A', 'B', 'C']);
    expect(scaleNotes('G', 'altered')).toEqual(['G', 'Ab', 'Bb', 'B', 'Db', 'Eb', 'F']);
    expect(scaleNotes('Db', 'lydian dominant')).toEqual(['Db', 'Eb', 'F', 'G', 'Ab', 'Bb', 'Cb']);
    expect(scaleNotes('C', 'blues')).toEqual(['C', 'Eb', 'F', 'Gb', 'G', 'Bb']);
    expect(scaleNotes('F', 'blues')).toEqual(['F', 'Ab', 'Bb', 'B', 'C', 'Eb']);
    expect(scaleNotes('D', 'melodic minor')).toEqual(['D', 'E', 'F', 'G', 'A', 'B', 'C#']);
    expect(scaleNotes('D', 'harmonic minor')).toEqual(['D', 'E', 'F', 'G', 'A', 'Bb', 'C#']);
  });
  it('renders the same pitches with French note names', () => {
    expect(scaleNotes('Ab', 'major').map(formatFrenchNote)).toEqual(['Lab', 'Sib', 'Do', 'Réb', 'Mib', 'Fa', 'Sol']);
    expect(['B', 'Bb', 'B#', 'Cb', 'Ebb'].map(formatFrenchNote)).toEqual(['Si', 'Sib', 'Si#', 'Dob', 'Mibb']);
  });
  it('transposes chart chords without changing chord qualities', () => {
    expect(transposeChord('Cm7', 2)).toBe('Dm7');
    expect(transposeChord('G7#9', 2)).toBe('A7#9');
    expect(transposeChord('C6/E', 2)).toBe('D6/F#');
    expect(transposeChord('F#m7b5', 2)).toBe('G#m7b5');
  });
});

describe('preferences and filters', () => {
  it.each(['{broken', 'null', '42', '[]', '{"styles":null,"tempo":"Lent"}'])('recovers from %s', saved => {
    expect(parseFilters(saved)).toEqual({ styles: [], tempo: [], complexity: [] });
  });
  it('only restores known values and removes duplicates', () => {
    expect(parseFilters('{"styles":["Swing","Swing","unknown"],"tempo":["Lent"],"complexity":["1 gamme"]}'))
      .toEqual({ styles: ['Swing'], tempo: ['Lent'], complexity: ['1 gamme'] });
  });
  it('combines categories with AND and values within a category with OR', () => {
    const filters = parseFilters('{"styles":["Swing","Ballad"],"tempo":["Rapide"]}');
    expect(filterStandards(JAZZ_STANDARDS, filters).map(item => item.id)).toEqual(['st-thomas']);
    expect(filterStandards(JAZZ_STANDARDS, parseFilters('{"styles":["New Orleans"]}'))).toEqual([]);
  });
  it('continues when browser storage is unavailable', () => {
    vi.stubGlobal('window', { get localStorage() { throw new Error('blocked'); } });
    expect(readStorage('jazz_filters')).toBeNull();
    expect(() => writeStorage('jazz_mode', 'manual')).not.toThrow();
    expect(() => writeStorage('last_selected_id', null)).not.toThrow();
    vi.unstubAllGlobals();
  });
});

describe('wheel result', () => {
  it('always places the chosen standard under the pointer, including repeated spins', () => {
    for (let count = 1; count <= 40; count++) {
      let rotation = 0;
      for (let selected = 0; selected < count; selected++) {
        rotation = rotationForIndex(selected, count, rotation);
        expect(indexAtPointer(rotation, count)).toBe(selected);
      }
    }
  });
  it('has one sourced score per wheel entry and the expected written forms', () => {
    expect(JAZZ_STANDARDS).toHaveLength(17);
    expect(new Set(JAZZ_STANDARDS.map(item => item.id)).size).toBe(JAZZ_STANDARDS.length);
    for (const item of JAZZ_STANDARDS) {
      expect(CHARTS[item.id]?.bars.length).toBeGreaterThanOrEqual(12);
      expect(CHARTS[item.id]?.sourceUrl).toMatch(/^https:\/\/drive\.google\.com\/file\/d\//);
      expect(item.recommendedScales.length).toBeGreaterThan(0);
      for (const scale of item.recommendedScales) expect(getNoteIndex(scale.root)).toBeGreaterThanOrEqual(0);
    }
    expect(CHARTS['autumn-leaves'].bars).toHaveLength(32);
    expect(CHARTS['autumn-leaves'].bars.slice(0, 4)).toEqual(['Cm7', 'F7', 'Bbmaj7', 'Ebmaj7']);
    expect(JAZZ_STANDARDS.find(tune => tune.id === 'autumn-leaves')?.recommendedScales[0].root).toBe('Bb');
    expect(CHARTS.footprints.bars).toHaveLength(12);
    expect(CHARTS.summertime.bars[0]).toBe('Dm');
    expect(CHARTS['maiden-voyage'].bars[0]).toBe('Am/D');
  });
  it('links each chord in every chart to a valid numbered scale or a neutral passing chord', () => {
    for (const tune of JAZZ_STANDARDS) {
      const bars = CHARTS[tune.id].bars;
      const links = SCALE_LINKS[tune.id];
      expect(links, tune.id).toHaveLength(bars.length);
      const used = new Set<number>();
      links.forEach((link, barIndex) => {
        const chordCount = bars[barIndex].split(' ').length;
        const indices = Array.isArray(link) ? link : Array(chordCount).fill(link);
        expect(indices, `${tune.id} bar ${barIndex + 1}`).toHaveLength(chordCount);
        for (const index of indices) {
          if (index === null) continue;
          expect(Number.isInteger(index)).toBe(true);
          expect(index).toBeGreaterThanOrEqual(0);
          expect(index).toBeLessThan(tune.recommendedScales.length);
          used.add(index);
        }
      });
      expect(used.size, `${tune.id} unused scale card`).toBe(tune.recommendedScales.length);
    }
  });
  it('uses one tonal center across ordinary cadences and one blues color across blues forms', () => {
    expect(SCALE_LINKS['blue-bossa'].slice(8, 12)).toEqual([1, 1, 1, 1]);
    expect(SCALE_LINKS['nature-boy'][1]).toBe(0); // Em7b5–A7, one D minor reference
    expect(SCALE_LINKS['autumn-leaves'].slice(0, 4)).toEqual([0, 0, 0, 0]);
    expect(SCALE_LINKS['autumn-leaves'].slice(27, 29)).toEqual([1, 1]);
    expect(SCALE_LINKS['beautiful-love'].slice(4, 7)).toEqual([0, 0, 0]); // Gm–C7–F
    for (const id of ['cantaloupe-island', 'footprints', 'mr-pc', 'watermelon-man']) {
      expect(JAZZ_STANDARDS.find(tune => tune.id === id)?.recommendedScales).toHaveLength(1);
      expect(new Set(SCALE_LINKS[id].filter(link => link !== null))).toEqual(new Set([0]));
    }
  });
  it('keeps a single proposed scale unless the chart changes tonal center', () => {
    for (const tune of JAZZ_STANDARDS) {
      expect(tune.recommendedScales.length, tune.id).toBeLessThanOrEqual(4);
      expect(tune.tags.complexity).toBe(tune.recommendedScales.length === 1 ? '1 gamme' : 'plusieurs gammes');
    }
    for (const id of ['all-of-me', 'beautiful-love', 'nature-boy', 'return-of-the-prodigal-son', 'song-for-my-father', 'st-thomas', 'summertime']) {
      expect(JAZZ_STANDARDS.find(tune => tune.id === id)?.recommendedScales).toHaveLength(1);
    }
  });
  it('marks out-of-scale chord targets without introducing another scale card', () => {
    for (const tune of JAZZ_STANDARDS) {
      for (const [writtenBar, notes] of Object.entries(SCALE_CUES[tune.id] ?? {})) {
        const bar = Number(writtenBar);
        expect(bar, tune.id).toBeGreaterThanOrEqual(1);
        expect(bar, tune.id).toBeLessThanOrEqual(CHARTS[tune.id].bars.length);
        const link = SCALE_LINKS[tune.id][bar - 1];
        const active = Array.isArray(link) ? link.find(value => value !== null) : link;
        expect(active, `${tune.id} bar ${bar}`).not.toBeNull();
        const scale = tune.recommendedScales[active as number];
        const pitches = scaleNotes(scale.root, scale.type).map(getNoteIndex);
        for (const note of notes) {
          expect(getNoteIndex(note), `${tune.id} bar ${bar}`).toBeGreaterThanOrEqual(0);
          expect(pitches, `${tune.id} bar ${bar}: ${note}`).not.toContain(getNoteIndex(note));
          const inChord = CHARTS[tune.id].bars[bar - 1].split(' ').some(chord => {
            const match = /^([A-G](?:b|#)?)([^/]*)/.exec(chord);
            if (!match) return false;
            const root = getNoteIndex(match[1]);
            const quality = match[2];
            const diminished = quality.includes('dim');
            const minorThird = quality.startsWith('m') && !quality.startsWith('maj');
            const intervals = [0, /sus4/.test(quality) ? 5 : minorThird || diminished ? 3 : 4,
              /b5|dim/.test(quality) ? 6 : /#5/.test(quality) ? 8 : 7];
            if (/maj7/.test(quality)) intervals.push(11);
            else if (/7|9/.test(quality)) intervals.push(diminished ? 9 : 10);
            else if (/6/.test(quality)) intervals.push(9);
            if (/b9/.test(quality)) intervals.push(1);
            if (/#9/.test(quality)) intervals.push(3);
            return intervals.some(interval => (root + interval) % 12 === getNoteIndex(note));
          });
          expect(inChord, `${tune.id} bar ${bar}: ${note} is not a chord tone`).toBe(true);
        }
      }
    }
  });
});
