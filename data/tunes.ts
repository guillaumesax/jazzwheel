import { JazzStandard } from '../types';

export const JAZZ_STANDARDS: JazzStandard[] = [
  {
    id: 'all-of-me',
    title: 'All of Me',
    tags: { styles: ['Swing'], tempo: 'Medium', complexity: 'plusieurs gammes' },
    recommendedScales: [
      { root: 'C', type: 'major', reason: 'Tonalité principale (I)' },
      { root: 'E', type: 'mixolydian', reason: 'Dominant secondaire (III7)' },
      { root: 'A', type: 'mixolydian', reason: 'Dominant secondaire (VI7)' }
    ]
  },
  {
    id: 'all-of-me-chant',
    title: 'All of Me Chant',
    tags: { styles: ['Swing', 'Ballad'], tempo: 'Lent', complexity: 'plusieurs gammes' },
    recommendedScales: [
      { root: 'Ab', type: 'major', reason: 'Souvent chanté en Ab' },
      { root: 'C', type: 'mixolydian', reason: 'Sur le III7' }
    ]
  },
  {
    id: 'autumn-leaves',
    title: 'Autumn Leaves',
    tags: { styles: ['Swing'], tempo: 'Medium', complexity: 'plusieurs gammes' },
    recommendedScales: [
      { root: 'G', type: 'major', reason: 'Tonalité relative majeure' },
      { root: 'E', type: 'minor', reason: 'Tonalité relative mineure' },
      { root: 'B', type: 'mixolydian', reason: 'Altérée sur le V7 du mineur' }
    ]
  },
  {
    id: 'beautiful-love',
    title: 'Beautiful Love',
    tags: { styles: ['Swing', 'Ballad'], tempo: 'Lent', complexity: 'plusieurs gammes' },
    recommendedScales: [
      { root: 'D', type: 'minor', reason: 'Tonalité principale' },
      { root: 'G', type: 'dorian', reason: 'Sur le IVm' }
    ]
  },
  {
    id: 'blue-bossa',
    title: 'Blue Bossa',
    tags: { styles: ['Bossa/Latin'], tempo: 'Medium', complexity: 'plusieurs gammes' },
    recommendedScales: [
      { root: 'C', type: 'minor', reason: 'Section A (mineur)' },
      { root: 'Db', type: 'major', reason: 'Section B (modulation majeure)' }
    ]
  },
  {
    id: 'bluesette',
    title: 'Bluesette',
    tags: { styles: ['Swing'], tempo: 'Medium', complexity: 'plusieurs gammes' },
    recommendedScales: [
      { root: 'Bb', type: 'major', reason: 'Tonalité principale (I)' },
      { root: 'G', type: 'minor', reason: 'Passage en relatif mineur (VIm)' },
      { root: 'Eb', type: 'major', reason: 'Modulation descendante (II-V-I en Eb)' },
      { root: 'Db', type: 'major', reason: 'Modulation II-V-I en Db' },
      { root: 'B', type: 'major', reason: 'Modulation en Cb (B majeur)' }
    ]
  },
  {
    id: 'cantaloupe-island',
    title: 'Cantaloupe Island',
    tags: { styles: ['Soul-Jazz/Funk'], tempo: 'Medium', complexity: 'plusieurs gammes' },
    recommendedScales: [
      { root: 'F', type: 'dorian', reason: 'Premier accord (Fm7)' },
      { root: 'Db', type: 'mixolydian', reason: 'Accord suivant (Db7)' },
      { root: 'D', type: 'dorian', reason: 'Transition Dm7' }
    ]
  },
  {
    id: 'footprints',
    title: 'Footprints',
    tags: { styles: ['Modal', 'Soul-Jazz/Funk'], tempo: 'Medium', complexity: 'plusieurs gammes' },
    recommendedScales: [
      { root: 'C', type: 'dorian', reason: 'Blues mineur modal en C' },
      { root: 'F', type: 'dorian', reason: 'Sur le IVm7' }
    ]
  },
  {
    id: 'maiden-voyage',
    title: 'Maiden Voyage',
    tags: { styles: ['Modal'], tempo: 'Medium', complexity: 'plusieurs gammes' },
    recommendedScales: [
      { root: 'D', type: 'mixolydian', reason: 'D7sus4' },
      { root: 'F', type: 'mixolydian', reason: 'F7sus4' },
      { root: 'Eb', type: 'mixolydian', reason: 'Eb7sus4' }
    ]
  },
  {
    id: 'mr-pc',
    title: 'Mr PC',
    tags: { styles: ['Bebop'], tempo: 'Rapide', complexity: '1 gamme' },
    recommendedScales: [
      { root: 'C', type: 'blues', reason: 'Blues mineur rapide en C' }
    ]
  },
  {
    id: 'nature-boy',
    title: 'Nature Boy',
    tags: { styles: ['Ballad', 'Bossa/Latin'], tempo: 'Lent', complexity: '1 gamme' },
    recommendedScales: [
      { root: 'D', type: 'minor', reason: 'Mélodie mélancolique en D mineur' }
    ]
  },
  {
    id: 'return-of-the-prodigal-son',
    title: 'Return of the Prodigal Son',
    tags: { styles: ['Soul-Jazz/Funk'], tempo: 'Medium', complexity: '1 gamme' },
    recommendedScales: [
      { root: 'F', type: 'blues', reason: 'Structure Blues Gospel' }
    ]
  },
  {
    id: 'road-song',
    title: 'Road Song',
    tags: { styles: ['Soul-Jazz/Funk'], tempo: 'Medium', complexity: '1 gamme' },
    recommendedScales: [
      { root: 'G', type: 'minor', reason: 'Groove Wes Montgomery en G mineur' }
    ]
  },
  {
    id: 'so-what',
    title: 'So What',
    tags: { styles: ['Modal'], tempo: 'Medium', complexity: 'plusieurs gammes' },
    recommendedScales: [
      { root: 'D', type: 'dorian', reason: 'Section A (32 mesures)' },
      { root: 'Eb', type: 'dorian', reason: 'Section B (pont)' }
    ]
  },
  {
    id: 'song-for-my-father',
    title: 'Song for My Father',
    tags: { styles: ['Bossa/Latin', 'Soul-Jazz/Funk'], tempo: 'Medium', complexity: '1 gamme' },
    recommendedScales: [
      { root: 'F', type: 'blues', reason: 'Blues mineur binaire en F' }
    ]
  },
  {
    id: 'st-thomas',
    title: 'St Thomas',
    tags: { styles: ['Bossa/Latin', 'Swing'], tempo: 'Rapide', complexity: '1 gamme' },
    recommendedScales: [
      { root: 'C', type: 'major', reason: 'Tonalité de C majeur, mélodie joyeuse' }
    ]
  },
  {
    id: 'summertime',
    title: 'Summertime',
    tags: { styles: ['Swing', 'Bossa/Latin'], tempo: 'Lent', complexity: '1 gamme' },
    recommendedScales: [
      { root: 'A', type: 'minor', reason: 'Tonalité standard de Summertime' }
    ]
  },
  {
    id: 'summertime-chant',
    title: 'Summertime Chant',
    tags: { styles: ['Ballad'], tempo: 'Lent', complexity: '1 gamme' },
    recommendedScales: [
      { root: 'B', type: 'minor', reason: 'Tonalité souvent choisie pour voix' }
    ]
  },
  {
    id: 'watermelon-man',
    title: 'Watermelon Man',
    tags: { styles: ['Soul-Jazz/Funk'], tempo: 'Medium', complexity: '1 gamme' },
    recommendedScales: [
      { root: 'F', type: 'mixolydian', reason: 'Blues en F avec un groove funk' }
    ]
  }
];