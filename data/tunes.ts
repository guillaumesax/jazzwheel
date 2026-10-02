import { JazzStandard } from '../types';

// Scale roots are in concert pitch. Reasons refer to the Eb scores in the supplied Drive folder.
export const JAZZ_STANDARDS: JazzStandard[] = [
  { id: 'all-of-me', title: 'All of Me', tags: { styles: ['Swing'], tempo: 'Medium', complexity: 'plusieurs gammes' }, recommendedScales: [
    { root: 'C', type: 'major', reason: 'Centre tonal : C, Dm et G7, notamment les cadences vers C' },
    { root: 'E', type: 'mixolydian', reason: 'Dominante E7 : viser G♯ avant A7' },
    { root: 'A', type: 'mixolydian', reason: 'Dominante A7 : viser C♯ avant Dm' },
    { root: 'D', type: 'mixolydian', reason: 'Dominante D7 : viser F♯ avant G7' },
  ] },
  { id: 'autumn-leaves', title: 'Autumn Leaves', tags: { styles: ['Swing'], tempo: 'Medium', complexity: 'plusieurs gammes' }, recommendedScales: [
    { root: 'G', type: 'minor', reason: 'Même réservoir de notes que Sib majeur : Cm–F7–Bb, puis Gm' },
    { root: 'G', type: 'harmonic minor', reason: 'Cadence mineure Am7♭5–D7 ; revenir au Fa naturel sur Gm' },
    { root: 'Eb', type: 'major', reason: 'Cadence Fm7–Bb7–Ebmaj7 en fin de forme' },
  ] },
  { id: 'beautiful-love', title: 'Beautiful Love', tags: { styles: ['Swing', 'Ballad'], tempo: 'Lent', complexity: 'plusieurs gammes' }, recommendedScales: [
    { root: 'D', type: 'minor', reason: 'Centre mineur et cadence Gm7–C7–Fmaj7 : mêmes notes que Fa majeur' },
    { root: 'D', type: 'harmonic minor', reason: 'Cadence Em7♭5–A7 vers Dm ; viser Do♯ sur A7' },
  ] },
  { id: 'blue-bossa', title: 'Blue Bossa', tags: { styles: ['Bossa/Latin'], tempo: 'Medium', complexity: 'plusieurs gammes' }, recommendedScales: [
    { root: 'C', type: 'minor', reason: 'Centre de Do mineur : Cm et Fm' },
    { root: 'C', type: 'harmonic minor', reason: 'Dm7♭5–G7 vers Cm ; le Si naturel annonce la résolution' },
    { root: 'Db', type: 'major', reason: 'Une seule gamme sur Ebm7–Ab7–Dbmaj7, mesures 9–12' },
  ] },
  { id: 'bluesette', title: 'Bluesette', tags: { styles: ['Swing'], tempo: 'Medium', complexity: 'plusieurs gammes' }, recommendedScales: [
    { root: 'Bb', type: 'major', reason: 'Centre Sib ; retour final Cm7–F7–Bb' },
    { root: 'G', type: 'harmonic minor', reason: 'Am7♭5–D7 vers Gm ; viser Fa♯ sur D7' },
    { root: 'Eb', type: 'major', reason: 'Fm7–Bb7–Ebmaj7 : un centre tonal' },
    { root: 'Db', type: 'major', reason: 'Ebm7–Ab7–Dbmaj7 : un centre tonal' },
    { root: 'B', type: 'major', reason: 'Gb7–Bmaj7 : arrivée en Si majeur' },
  ] },
  { id: 'cantaloupe-island', title: 'Cantaloupe Island', tags: { styles: ['Soul-Jazz/Funk'], tempo: 'Medium', complexity: '1 gamme' }, recommendedScales: [
    { root: 'F', type: 'blues', reason: 'Couleur blues commune à tout le thème ; suivre le groove et les notes des accords' },
  ] },
  { id: 'footprints', title: 'Footprints', tags: { styles: ['Modal', 'Soul-Jazz/Funk'], tempo: 'Medium', complexity: '1 gamme' }, recommendedScales: [
    { root: 'C', type: 'pentatonic minor', reason: 'Conseillée par la partition sur les 12 mesures' },
  ] },
  { id: 'maiden-voyage', title: 'Maiden Voyage', tags: { styles: ['Modal'], tempo: 'Medium', complexity: 'plusieurs gammes' }, recommendedScales: [
    { root: 'A', type: 'dorian', reason: 'Sur Am/D, mesures 1–4 et 17–20' },
    { root: 'C', type: 'dorian', reason: 'Sur Cm/F, mesures 5–8 et 21–24' },
    { root: 'Bb', type: 'dorian', reason: 'Sur Bbm/Eb, mesures 9–12' },
    { root: 'Db', type: 'dorian', reason: 'Sur Dbm, mesures 13–16' },
  ] },
  { id: 'mr-pc', title: 'Mr PC', tags: { styles: ['Bebop'], tempo: 'Rapide', complexity: '1 gamme' }, recommendedScales: [
    { root: 'C', type: 'blues', reason: 'Blues mineur : couleur commune aux 12 mesures' },
  ] },
  { id: 'nature-boy', title: 'Nature Boy', tags: { styles: ['Ballad', 'Bossa/Latin'], tempo: 'Lent', complexity: 'plusieurs gammes' }, recommendedScales: [
    { root: 'D', type: 'minor', reason: 'Centre de Ré mineur : repos sur Dm et Gm' },
    { root: 'D', type: 'melodic minor', reason: 'Couleur Dm(maj7) et Dm6 ; aussi sur Bm7♭5' },
    { root: 'D', type: 'harmonic minor', reason: 'Em7♭5–A7 vers Dm : un seul mouvement' },
    { root: 'E', type: 'phrygian dominant', reason: 'E7♭9 avant A7 : dominante secondaire' },
  ] },
  { id: 'return-of-the-prodigal-son', title: 'Return of the Prodigal Son', tags: { styles: ['Soul-Jazz/Funk'], tempo: 'Medium', complexity: 'plusieurs gammes' }, recommendedScales: [
    { root: 'C', type: 'dorian', reason: 'Vamp Cm7–F7 : une seule couleur pour le groove' },
    { root: 'C', type: 'minor', reason: 'Section B : Cm–Bb–Fm–Gm et retour vers Cm' },
    { root: 'C', type: 'harmonic minor', reason: 'Sur G7 avant le retour vers Cm ; viser Si naturel' },
  ] },
  { id: 'road-song', title: 'Road Song', tags: { styles: ['Soul-Jazz/Funk'], tempo: 'Medium', complexity: 'plusieurs gammes' }, recommendedScales: [
    { root: 'G', type: 'minor', reason: 'Centre de Sol mineur : départ et retour' },
    { root: 'G', type: 'melodic minor', reason: 'Am7–D7 vers Gm ; les altérations de D7 restent des couleurs de passage' },
    { root: 'Bb', type: 'major', reason: 'Cm7–F7–Bbmaj7 : une seule gamme' },
    { root: 'Ab', type: 'major', reason: 'Bbm7–Eb7–Abmaj7 : une seule gamme' },
  ] },
  { id: 'so-what', title: 'So What', tags: { styles: ['Modal'], tempo: 'Medium', complexity: 'plusieurs gammes' }, recommendedScales: [
    { root: 'D', type: 'dorian', reason: 'A : 16 mesures, puis retour A : 8 mesures' },
    { root: 'Eb', type: 'dorian', reason: 'B : 8 mesures' },
  ] },
  { id: 'song-for-my-father', title: 'Song for My Father', tags: { styles: ['Bossa/Latin', 'Soul-Jazz/Funk'], tempo: 'Medium', complexity: 'plusieurs gammes' }, recommendedScales: [
    { root: 'F', type: 'minor', reason: 'Centre Fa mineur : Fm, Eb7 et C7sus4' },
    { root: 'Db', type: 'mixolydian', reason: 'Db7 : couleur de dominante avant le retour' },
    { root: 'C', type: 'phrygian dominant', reason: 'C7 vers Fm ; viser Mi naturel' },
  ] },
  { id: 'st-thomas', title: 'St Thomas', tags: { styles: ['Bossa/Latin', 'Swing'], tempo: 'Rapide', complexity: 'plusieurs gammes' }, recommendedScales: [
    { root: 'C', type: 'major', reason: 'Centre Do : une couleur sur Dm7–G7–C6' },
    { root: 'A', type: 'mixolydian', reason: 'A7 : dominante secondaire qui mène à Dm' },
    { root: 'F', type: 'major', reason: 'C7–F6 : brève cadence vers Fa' },
  ] },
  { id: 'summertime', title: 'Summertime', tags: { styles: ['Swing', 'Bossa/Latin'], tempo: 'Lent', complexity: 'plusieurs gammes' }, recommendedScales: [
    { root: 'D', type: 'minor', reason: 'Centre mineur ; aussi Gm–C7–Fmaj7, mêmes notes que Fa majeur' },
    { root: 'D', type: 'harmonic minor', reason: 'Em7♭5–A7 vers Dm ; Do naturel sur A7♯9 comme couleur blues' },
  ] },
  { id: 'watermelon-man', title: 'Watermelon Man', tags: { styles: ['Soul-Jazz/Funk'], tempo: 'Medium', complexity: '1 gamme' }, recommendedScales: [
    { root: 'F', type: 'blues', reason: 'Même couleur blues sur les trois accords du thème ; souligner leur rythme' },
  ] },
];
