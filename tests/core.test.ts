import { describe, expect, it, vi } from 'vitest';
import { getNoteIndex, transposeNote, formatScaleName, scaleNotes, formatFrenchNote, transposeChord } from '../utils/musicUtils';
import { parseFilters, filterStandards } from '../utils/filters';
import { rotationForIndex, indexAtPointer } from '../utils/wheelUtils';
import { readStorage, writeStorage } from '../utils/storage';
import { JAZZ_STANDARDS } from '../data/tunes';
import { CHARTS } from '../data/charts';

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
  it('has unique ids and valid notes in the imported repertoire', () => {
    expect(new Set(JAZZ_STANDARDS.map(item => item.id)).size).toBe(JAZZ_STANDARDS.length);
    for (const item of JAZZ_STANDARDS) {
      expect(CHARTS[item.id.replace(/-chant$/, '')]?.bars.length).toBeGreaterThanOrEqual(12);
      expect(item.recommendedScales.length).toBeGreaterThan(0);
      for (const scale of item.recommendedScales) expect(getNoteIndex(scale.root)).toBeGreaterThanOrEqual(0);
    }
  });
});
