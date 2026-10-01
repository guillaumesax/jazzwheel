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
  major: 'majeure', minor: 'mineure', dorian: 'dorienne', mixolydian: 'mixolydienne',
  blues: 'blues', 'pentatonic major': 'pentatonique majeure', 'pentatonic minor': 'pentatonique mineure',
};
export const formatScaleName = (root: string, type: ScaleRecommendation['type']): string =>
  `${root} ${SCALE_LABELS[type]}`;
