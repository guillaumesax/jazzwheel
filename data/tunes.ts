import { JazzStandard } from '../types';

// Scale roots are in concert pitch. Reasons refer to the Eb scores in the supplied Drive folder.
export const JAZZ_STANDARDS: JazzStandard[] = [
  { id: 'all-of-me', title: 'All of Me', tags: { styles: ['Swing'], tempo: 'Medium', complexity: 'plusieurs gammes' }, recommendedScales: [
    { root: 'C', type: 'major', reason: 'Sur C6 et Cmaj7, mesures 1–2, 17–18 et 27' },
    { root: 'E', type: 'mixolydian', reason: 'Sur E7, dominante secondaire des mesures 3–4 et 19–20' },
    { root: 'A', type: 'mixolydian', reason: 'Sur A7, mesures 5–6 et 21–22' },
    { root: 'D', type: 'dorian', reason: 'Sur Dm7, mesures 7–8 et 23–24' },
    { root: 'D', type: 'mixolydian', reason: 'Sur D7, mesures 13–14' },
  ] },
  { id: 'autumn-leaves', title: 'Autumn Leaves', tags: { styles: ['Swing'], tempo: 'Medium', complexity: 'plusieurs gammes' }, recommendedScales: [
    { root: 'G', type: 'minor', reason: 'Sur la résolution en Gm de la partition fournie' },
    { root: 'Bb', type: 'major', reason: 'Sur Cm7–F7–Bbmaj7–Ebmaj7' },
    { root: 'A', type: 'locrian', reason: 'Sur Am7♭5' },
    { root: 'D', type: 'phrygian dominant', reason: 'Sur D7 qui résout en Gm' },
  ] },
  { id: 'beautiful-love', title: 'Beautiful Love', tags: { styles: ['Swing', 'Ballad'], tempo: 'Lent', complexity: 'plusieurs gammes' }, recommendedScales: [
    { root: 'D', type: 'minor', reason: 'Centre mineur de la forme' },
    { root: 'E', type: 'locrian', reason: 'Sur Em7♭5' },
    { root: 'A', type: 'altered', reason: 'Sur A7 altéré, résolution vers Dm' },
    { root: 'F', type: 'major', reason: 'Sur Gm7–C7–Fmaj7' },
  ] },
  { id: 'blue-bossa', title: 'Blue Bossa', tags: { styles: ['Bossa/Latin'], tempo: 'Medium', complexity: 'plusieurs gammes' }, recommendedScales: [
    { root: 'C', type: 'minor', reason: 'Sur Cm et Fm de la première partie' },
    { root: 'D', type: 'locrian', reason: 'Sur D diminué / Dm7♭5' },
    { root: 'G', type: 'altered', reason: 'Sur G7♯9' },
    { root: 'Db', type: 'major', reason: 'Sur Ebm7–Ab7–Dbmaj7, mesures 9–12' },
  ] },
  { id: 'bluesette', title: 'Bluesette', tags: { styles: ['Swing'], tempo: 'Medium', complexity: 'plusieurs gammes' }, recommendedScales: [
    { root: 'Bb', type: 'major', reason: 'Départ en Sib majeur' },
    { root: 'G', type: 'minor', reason: 'Passage en Sol mineur' },
    { root: 'Eb', type: 'major', reason: 'Cadence vers Mib majeur' },
    { root: 'Db', type: 'major', reason: 'Cadence vers Réb majeur' },
    { root: 'B', type: 'major', reason: 'Cadence vers Si majeur' },
  ] },
  { id: 'cantaloupe-island', title: 'Cantaloupe Island', tags: { styles: ['Soul-Jazz/Funk'], tempo: 'Medium', complexity: 'plusieurs gammes' }, recommendedScales: [
    { root: 'F', type: 'blues', reason: 'La partition conseille la gamme blues sur tout le morceau' },
    { root: 'F', type: 'dorian', reason: 'Sur les mesures de Fm' },
    { root: 'Db', type: 'lydian dominant', reason: 'Option sur Db7(#11), mesures 5–8' },
    { root: 'D', type: 'dorian', reason: 'Sur Dm, mesures 9–12' },
  ] },
  { id: 'footprints', title: 'Footprints', tags: { styles: ['Modal', 'Soul-Jazz/Funk'], tempo: 'Medium', complexity: 'plusieurs gammes' }, recommendedScales: [
    { root: 'C', type: 'pentatonic minor', reason: 'Conseillée par la partition sur les 12 mesures' },
    { root: 'C', type: 'dorian', reason: 'Couleur modale sur Cm' },
    { root: 'F', type: 'dorian', reason: 'Sur Fm, mesures 5–6' },
  ] },
  { id: 'maiden-voyage', title: 'Maiden Voyage', tags: { styles: ['Modal'], tempo: 'Medium', complexity: 'plusieurs gammes' }, recommendedScales: [
    { root: 'A', type: 'dorian', reason: 'Sur Am/D, mesures 1–4 et 17–20' },
    { root: 'C', type: 'dorian', reason: 'Sur Cm/F, mesures 5–8 et 21–24' },
    { root: 'Bb', type: 'dorian', reason: 'Sur Bbm/Eb, mesures 9–12' },
    { root: 'Db', type: 'dorian', reason: 'Sur Dbm, mesures 13–16' },
  ] },
  { id: 'mr-pc', title: 'Mr PC', tags: { styles: ['Bebop'], tempo: 'Rapide', complexity: 'plusieurs gammes' }, recommendedScales: [
    { root: 'C', type: 'blues', reason: 'Blues mineur : couleur commune aux 12 mesures' },
    { root: 'F', type: 'dorian', reason: 'Sur Fm7, mesures 5–6' },
    { root: 'D', type: 'mixolydian', reason: 'Sur le B7 écrit (Ré7 concert) de la relance' },
  ] },
  { id: 'nature-boy', title: 'Nature Boy', tags: { styles: ['Ballad', 'Bossa/Latin'], tempo: 'Lent', complexity: 'plusieurs gammes' }, recommendedScales: [
    { root: 'D', type: 'minor', reason: 'Centre mineur sur Dm' },
    { root: 'D', type: 'melodic minor', reason: 'Sur Dm(maj7) et Dm6, mesures 5–6 et 21–22' },
    { root: 'E', type: 'locrian', reason: 'Sur Em7♭5' },
    { root: 'A', type: 'phrygian dominant', reason: 'Sur A7, dominante de Dm' },
    { root: 'E', type: 'phrygian dominant', reason: 'Sur E7♭9, avant A7' },
  ] },
  { id: 'return-of-the-prodigal-son', title: 'Return of the Prodigal Son', tags: { styles: ['Soul-Jazz/Funk'], tempo: 'Medium', complexity: 'plusieurs gammes' }, recommendedScales: [
    { root: 'C', type: 'dorian', reason: 'Sur le vamp Cm7–F7 de la section A' },
    { root: 'C', type: 'blues', reason: 'Couleur possible sur le vamp et les solos' },
    { root: 'F', type: 'dorian', reason: 'Sur Fm dans la section B' },
    { root: 'G', type: 'phrygian dominant', reason: 'Sur G7 avant le retour vers Cm' },
  ] },
  { id: 'road-song', title: 'Road Song', tags: { styles: ['Soul-Jazz/Funk'], tempo: 'Medium', complexity: 'plusieurs gammes' }, recommendedScales: [
    { root: 'G', type: 'minor', reason: 'Centre mineur au début et au retour du thème' },
    { root: 'D', type: 'altered', reason: 'Sur D7♯9, résolution en Gm' },
    { root: 'Bb', type: 'major', reason: 'Passage Cm7–F7–Bbmaj7' },
    { root: 'Ab', type: 'major', reason: 'Passage Bbm7–Eb7–Abmaj7' },
  ] },
  { id: 'so-what', title: 'So What', tags: { styles: ['Modal'], tempo: 'Medium', complexity: 'plusieurs gammes' }, recommendedScales: [
    { root: 'D', type: 'dorian', reason: 'A : 16 mesures, puis retour A : 8 mesures' },
    { root: 'Eb', type: 'dorian', reason: 'B : 8 mesures' },
  ] },
  { id: 'song-for-my-father', title: 'Song for My Father', tags: { styles: ['Bossa/Latin', 'Soul-Jazz/Funk'], tempo: 'Medium', complexity: 'plusieurs gammes' }, recommendedScales: [
    { root: 'F', type: 'dorian', reason: 'Sur Fm7, centre du morceau' },
    { root: 'F', type: 'blues', reason: 'Couleur blues sur Fm7' },
    { root: 'Eb', type: 'mixolydian', reason: 'Sur Eb7, mesures 3–4 et 9–10' },
    { root: 'Db', type: 'mixolydian', reason: 'Sur Db7 avant C7sus4' },
    { root: 'C', type: 'mixolydian', reason: 'Sur C7sus4 avant Fm' },
  ] },
  { id: 'st-thomas', title: 'St Thomas', tags: { styles: ['Bossa/Latin', 'Swing'], tempo: 'Rapide', complexity: 'plusieurs gammes' }, recommendedScales: [
    { root: 'C', type: 'major', reason: 'Sur C6 et les cadences de la grille de solos' },
    { root: 'A', type: 'mixolydian', reason: 'Sur A7, dominante de Dm' },
    { root: 'D', type: 'dorian', reason: 'Sur Dm7' },
  ] },
  { id: 'summertime', title: 'Summertime', tags: { styles: ['Swing', 'Bossa/Latin'], tempo: 'Lent', complexity: 'plusieurs gammes' }, recommendedScales: [
    { root: 'D', type: 'minor', reason: 'Sur Dm, centre mineur du thème' },
    { root: 'G', type: 'minor', reason: 'Sur Gm' },
    { root: 'A', type: 'altered', reason: 'Sur A7♯9, vers Dm' },
  ] },
  { id: 'watermelon-man', title: 'Watermelon Man', tags: { styles: ['Soul-Jazz/Funk'], tempo: 'Medium', complexity: 'plusieurs gammes' }, recommendedScales: [
    { root: 'F', type: 'mixolydian', reason: 'Sur F7' },
    { root: 'Bb', type: 'mixolydian', reason: 'Sur Bb7' },
    { root: 'C', type: 'mixolydian', reason: 'Sur C7' },
  ] },
];
