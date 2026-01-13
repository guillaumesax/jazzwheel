
import { AccidentalPreference } from '../types';

const NOTES_SHARP = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const NOTES_FLAT = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

const FLAT_ROOTS = ['F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb'];

export const getNoteIndex = (note: string): number => {
  const sharpIndex = NOTES_SHARP.indexOf(note);
  if (sharpIndex !== -1) return sharpIndex;
  return NOTES_FLAT.indexOf(note);
};

export const transposeNote = (
  root: string, 
  semitones: number, 
  pref: AccidentalPreference
): string => {
  const index = getNoteIndex(root);
  if (index === -1) return root;

  const newIndex = (index + semitones) % 12;
  
  let useFlats = false;
  if (pref === 'b') {
    useFlats = true;
  } else if (pref === 'auto') {
    // If we're transposing TO a flat-heavy key, use flats
    // This is a simplification but works for our scope
    const baseNote = NOTES_SHARP[newIndex];
    if (FLAT_ROOTS.includes(baseNote) || (semitones === 2 && ['Bb', 'Eb', 'Ab'].includes(root))) {
       useFlats = true;
    }
    // Specific common jazz keys
    if (['F', 'Bb', 'Eb', 'Ab', 'C'].includes(NOTES_FLAT[newIndex])) useFlats = true;
  }

  return useFlats ? NOTES_FLAT[newIndex] : NOTES_SHARP[newIndex];
};

export const formatScaleName = (root: string, type: string): string => {
  const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
  return `${root} ${capitalizedType}`;
};
