import { JazzStandard } from '../types';

export const JAZZ_STANDARDS: JazzStandard[] = [
  {
    id: 'all-of-me',
    title: 'All of Me',
    tags: { styles: ['Swing'], tempo: 'Medium', complexity: 'plusieurs gammes' },
    recommendedScales: [
      { root: 'C', type: 'major', reason: 'Tonalité principale (I)' },
      { root: 'E', type: 'mixolydian', reason: 'Dominant secondaire (III7)' },
      { root: 'A', type: 'mixolydian', reason: 'Dominant secondaire (VI7)' },
      { root: 'D', type: 'dorian', reason: 'Sur Dm7 ; viser Fa et Do' }
    ]
  },
  {
    id: 'all-of-me-chant',
    title: 'All of Me Chant',
    tags: { styles: ['Swing', 'Ballad'], tempo: 'Lent', complexity: 'plusieurs gammes' },
    recommendedScales: [
      { root: 'Ab', type: 'major', reason: 'Souvent chanté en Ab' },
      { root: 'C', type: 'phrygian dominant', reason: 'Sur C7b9, dominante de Fm' },
      { root: 'Bb', type: 'dorian', reason: 'Sur Bbm7' }
    ]
  },
  {
    id: 'autumn-leaves',
    title: 'Autumn Leaves',
    tags: { styles: ['Swing'], tempo: 'Medium', complexity: 'plusieurs gammes' },
    recommendedScales: [
      { root: 'G', type: 'major', reason: 'Tonalité relative majeure' },
      { root: 'E', type: 'minor', reason: 'Tonalité relative mineure' },
      { root: 'B', type: 'phrygian dominant', reason: 'Sur B7b9 ou B7b13 : Ré# est la tierce de l’accord' },
      { root: 'F#', type: 'locrian', reason: 'Sur F#m7b5, avant B7' }
    ]
  },
  {
    id: 'beautiful-love',
    title: 'Beautiful Love',
    tags: { styles: ['Swing', 'Ballad'], tempo: 'Lent', complexity: 'plusieurs gammes' },
    recommendedScales: [
      { root: 'D', type: 'minor', reason: 'Tonalité principale' },
      { root: 'G', type: 'dorian', reason: 'Sur Gm7' },
      { root: 'E', type: 'locrian', reason: 'Sur Em7b5' },
      { root: 'A', type: 'phrygian dominant', reason: 'Sur A7b9, résolution vers Dm' }
    ]
  },
  {
    id: 'blue-bossa',
    title: 'Blue Bossa',
    tags: { styles: ['Bossa/Latin'], tempo: 'Medium', complexity: 'plusieurs gammes' },
    recommendedScales: [
      { root: 'C', type: 'minor', reason: 'Section A (mineur)' },
      { root: 'Db', type: 'major', reason: 'Section B (modulation majeure)' },
      { root: 'D', type: 'locrian', reason: 'Sur Dm7b5' },
      { root: 'G', type: 'altered', reason: 'Sur G7#9 ; viser Si, Fa et Sib' }
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
      { root: 'Db', type: 'lydian dominant', reason: 'Sur Db7#11 : Sol est la onzième augmentée' },
      { root: 'D', type: 'dorian', reason: 'Transition Dm7' }
    ]
  },
  {
    id: 'footprints',
    title: 'Footprints',
    tags: { styles: ['Modal', 'Soul-Jazz/Funk'], tempo: 'Medium', complexity: 'plusieurs gammes' },
    recommendedScales: [
      { root: 'C', type: 'dorian', reason: 'Blues mineur modal en C' },
      { root: 'F', type: 'dorian', reason: 'Sur le IVm7' },
      { root: 'C', type: 'blues', reason: 'Couleur blues sur les mesures de Cm' }
    ]
  },
  {
    id: 'maiden-voyage',
    title: 'Maiden Voyage',
    tags: { styles: ['Modal'], tempo: 'Medium', complexity: 'plusieurs gammes' },
    recommendedScales: [
      { root: 'D', type: 'dorian', reason: 'Sur D7sus4 : Sol est la quarte suspendue' },
      { root: 'F', type: 'dorian', reason: 'Sur F7sus4 : Sib est la quarte suspendue' },
      { root: 'Eb', type: 'dorian', reason: 'Sur Eb7sus4 : Lab est la quarte suspendue' },
      { root: 'Db', type: 'dorian', reason: 'Sur Db7sus4 : Solb est la quarte suspendue' }
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
      { root: 'D', type: 'minor', reason: 'Tonalité principale ; adapter la septième sur A7' },
      { root: 'E', type: 'locrian', reason: 'Sur Em7b5' },
      { root: 'A', type: 'phrygian dominant', reason: 'Sur A7b9' }
    ]
  },
  {
    id: 'return-of-the-prodigal-son',
    title: 'Return of the Prodigal Son',
    tags: { styles: ['Soul-Jazz/Funk'], tempo: 'Medium', complexity: '1 gamme' },
    recommendedScales: [
      { root: 'C', type: 'dorian', reason: 'Version iReal Pro en Cm7–F7' },
      { root: 'C', type: 'blues', reason: 'Couleur blues en do ; viser Fa sur F7' }
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
      { root: 'D', type: 'dorian', reason: 'Sections A : 16 puis 8 mesures' },
      { root: 'Eb', type: 'dorian', reason: 'Section B (pont)' }
    ]
  },
  {
    id: 'song-for-my-father',
    title: 'Song for My Father',
    tags: { styles: ['Bossa/Latin', 'Soul-Jazz/Funk'], tempo: 'Medium', complexity: '1 gamme' },
    recommendedScales: [
      { root: 'F', type: 'dorian', reason: 'Sur Fm7, centre modal du morceau' },
      { root: 'F', type: 'blues', reason: 'Couleur blues sur Fm7' },
      { root: 'C', type: 'phrygian dominant', reason: 'Sur C7 avant le retour à Fm' }
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
      { root: 'A', type: 'minor', reason: 'Version en la mineur ; pas sur tous les accords' },
      { root: 'B', type: 'locrian', reason: 'Sur Bm7b5' },
      { root: 'E', type: 'phrygian dominant', reason: 'Sur E7b9, dominante de Am' }
    ]
  },
  {
    id: 'summertime-chant',
    title: 'Summertime Chant',
    tags: { styles: ['Ballad'], tempo: 'Lent', complexity: '1 gamme' },
    recommendedScales: [
      { root: 'B', type: 'minor', reason: 'Version chant transposée en si mineur' },
      { root: 'F#', type: 'phrygian dominant', reason: 'Sur F#7b9, dominante de Bm' }
    ]
  },
  {
    id: 'watermelon-man',
    title: 'Watermelon Man',
    tags: { styles: ['Soul-Jazz/Funk'], tempo: 'Medium', complexity: '1 gamme' },
    recommendedScales: [
      { root: 'F', type: 'mixolydian', reason: 'Sur F7 ; viser La et Mib' },
      { root: 'Bb', type: 'mixolydian', reason: 'Sur Bb9 ; viser Ré et Lab' },
      { root: 'C', type: 'mixolydian', reason: 'Sur C9 ; viser Mi et Sib' }
    ]
  }
];
