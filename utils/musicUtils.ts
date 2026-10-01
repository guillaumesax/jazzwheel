import type { AccidentalPreference, ScaleRecommendation } from '../types';

const NOTES_SHARP = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const NOTES_FLAT = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
const NATURAL_NOTES: Record<string, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

export const getNoteIndex = (note: string): number => {
  const match = /^([A-G])([#b♯♭]?)$/.exec(note);
  if (!match) return -1;
  const accidental = match[2] === '#' || match[2] === '♯' ? 1 : match[2] ? -1 : 0;
  return (NATURAL_NOTES[match[1]] + accidental + 12) % 12;
};

export const transposeNote = (root: string, semitones: number, pref: AccidentalPreference): string => {
  const index = getNoteIndex(root);
  if (index === -1 || !Number.isInteger(semitones)) return root;
  // Keep the source spelling in concert pitch unless explicitly overridden.
  if (pref === 'auto' && semitones % 12 === 0) return root;
  const newIndex = ((index + semitones) % 12 + 12) % 12;
  const useFlats = pref === 'b' || (pref === 'auto' &&
    (root.includes('b') || root.includes('♭') || [3, 8, 10].includes(newIndex)));
  return (useFlats ? NOTES_FLAT : NOTES_SHARP)[newIndex];
};

const SCALE_LABELS: Record<ScaleRecommendation['type'], string> = {
  major: 'majeur', minor: 'mineur naturel', dorian: 'dorien', mixolydian: 'mixolydien',
  blues: 'blues', 'pentatonic major': 'pentatonique majeure', 'pentatonic minor': 'pentatonique mineure',
  locrian: 'locrien', 'phrygian dominant': 'phrygien dominant',
  altered: 'altéré',
  'lydian dominant': 'lydien dominant',
};
export const formatScaleName = (root: string, type: ScaleRecommendation['type']): string =>
  `${root} ${SCALE_LABELS[type]}`.trim();

type Degree = readonly [number, number];
const SCALE_DEGREES: Record<ScaleRecommendation['type'], readonly Degree[]> = {
  major: [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]],
  minor: [[1, 0], [2, 0], [3, -1], [4, 0], [5, 0], [6, -1], [7, -1]],
  dorian: [[1, 0], [2, 0], [3, -1], [4, 0], [5, 0], [6, 0], [7, -1]],
  mixolydian: [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, -1]],
  blues: [[1, 0], [3, -1], [4, 0], [5, -1], [5, 0], [7, -1]],
  'pentatonic major': [[1, 0], [2, 0], [3, 0], [5, 0], [6, 0]],
  'pentatonic minor': [[1, 0], [3, -1], [4, 0], [5, 0], [7, -1]],
  locrian: [[1, 0], [2, -1], [3, -1], [4, 0], [5, -1], [6, -1], [7, -1]],
  'phrygian dominant': [[1, 0], [2, -1], [3, 0], [4, 0], [5, 0], [6, -1], [7, -1]],
  altered: [[1, 0], [2, -1], [3, -1], [3, 0], [5, -1], [6, -1], [7, -1]],
  'lydian dominant': [[1, 0], [2, 0], [3, 0], [4, 1], [5, 0], [6, 0], [7, -1]],
};
const LETTERS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const MAJOR_STEPS = [0, 2, 4, 5, 7, 9, 11];

export function scaleNotes(root: string, type: ScaleRecommendation['type']): string[] {
  const rootMatch = /^([A-G])([#b♯♭]?)$/.exec(root);
  const rootPitch = getNoteIndex(root);
  if (!rootMatch || rootPitch < 0) return [];
  const rootLetter = LETTERS.indexOf(rootMatch[1]);
  return SCALE_DEGREES[type].map(([degree, alteration]) => {
    const letter = LETTERS[(rootLetter + degree - 1) % 7];
    const target = (rootPitch + MAJOR_STEPS[degree - 1] + alteration + 12) % 12;
    let difference = (target - NATURAL_NOTES[letter] + 12) % 12;
    if (difference > 6) difference -= 12;
    return letter + (difference === 0 ? '' : difference > 0 ? '#'.repeat(difference) : 'b'.repeat(-difference));
  });
}

export function transposeChord(chord: string, semitones: number, pref: AccidentalPreference = 'auto'): string {
  return chord.replace(/(^|\s|\/)([A-G](?:#|b)?)/g, (_, prefix: string, root: string) =>
    prefix + transposeNote(root, semitones, pref === 'auto' && root.includes('#') ? '#' : pref));
}
