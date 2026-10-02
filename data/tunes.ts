import { JazzStandard } from '../types';

// Scale roots are in concert pitch. Reasons refer to the Eb scores in the supplied Drive folder.
export const JAZZ_STANDARDS: JazzStandard[] = [
  { id: 'all-of-me', title: 'All of Me', tags: { styles: ['Swing'], tempo: 'Medium', complexity: '1 gamme' }, recommendedScales: [
    { root: 'C', type: 'major', reason: 'Repère unique. Les dominantes E7, A7 et D7 ont une tierce à viser (+), sans changer de gamme.' },
  ] },
  { id: 'autumn-leaves', title: 'Autumn Leaves', tags: { styles: ['Swing'], tempo: 'Medium', complexity: 'plusieurs gammes' }, recommendedScales: [
    { root: 'Bb', type: 'major', reason: 'Cm7–F7–Bbmaj7, puis Gm : un seul repère. Sur D7, viser Fa♯ (+).' },
    { root: 'Eb', type: 'major', reason: 'Bref II–V–I Fm7–Bb7–Ebmaj7, mesures 28–29' },
  ] },
  { id: 'beautiful-love', title: 'Beautiful Love', tags: { styles: ['Swing', 'Ballad'], tempo: 'Lent', complexity: '1 gamme' }, recommendedScales: [
    { root: 'D', type: 'minor', reason: 'Un centre mineur ; Gm7–C7–Fmaj7 partage les mêmes notes. Viser Do♯ sur A7.' },
  ] },
  { id: 'blue-bossa', title: 'Blue Bossa', tags: { styles: ['Bossa/Latin'], tempo: 'Medium', complexity: 'plusieurs gammes' }, recommendedScales: [
    { root: 'C', type: 'minor', reason: 'Cm–Fm et cadence Dm7♭5–G7 ; viser Si naturel (+) sur G7' },
    { root: 'Db', type: 'major', reason: 'II–V–I Ebm7–Ab7–Dbmaj7, mesures 9–12' },
  ] },
  { id: 'bluesette', title: 'Bluesette', tags: { styles: ['Swing'], tempo: 'Medium', complexity: 'plusieurs gammes' }, recommendedScales: [
    { root: 'Bb', type: 'major', reason: 'Départ, cadence vers Gm et retour final. Viser Fa♯ (+) sur D7.' },
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
  { id: 'nature-boy', title: 'Nature Boy', tags: { styles: ['Ballad', 'Bossa/Latin'], tempo: 'Lent', complexity: '1 gamme' }, recommendedScales: [
    { root: 'D', type: 'minor', reason: 'Repère de Ré mineur ; les notes-cibles (+) suivent les dominantes et Dm(maj7)/Dm6.' },
  ] },
  { id: 'return-of-the-prodigal-son', title: 'Return of the Prodigal Son', tags: { styles: ['Soul-Jazz/Funk'], tempo: 'Medium', complexity: '1 gamme' }, recommendedScales: [
    { root: 'C', type: 'minor', reason: 'Même centre sur le vamp et le pont ; viser La sur F7 et Si sur G7.' },
  ] },
  { id: 'road-song', title: 'Road Song', tags: { styles: ['Soul-Jazz/Funk'], tempo: 'Medium', complexity: 'plusieurs gammes' }, recommendedScales: [
    { root: 'Bb', type: 'major', reason: 'Gm et II–V–I Cm7–F7–Bb ; viser Fa♯ sur D7.' },
    { root: 'Ab', type: 'major', reason: 'Bbm7–Eb7–Abmaj7 : une seule gamme' },
  ] },
  { id: 'so-what', title: 'So What', tags: { styles: ['Modal'], tempo: 'Medium', complexity: 'plusieurs gammes' }, recommendedScales: [
    { root: 'D', type: 'dorian', reason: 'A : 16 mesures, puis retour A : 8 mesures' },
    { root: 'Eb', type: 'dorian', reason: 'B : 8 mesures' },
  ] },
  { id: 'song-for-my-father', title: 'Song for My Father', tags: { styles: ['Bossa/Latin', 'Soul-Jazz/Funk'], tempo: 'Medium', complexity: '1 gamme' }, recommendedScales: [
    { root: 'F', type: 'minor', reason: 'Fa mineur sur la forme ; viser Si sur Db7 et Mi sur C7.' },
  ] },
  { id: 'st-thomas', title: 'St Thomas', tags: { styles: ['Bossa/Latin', 'Swing'], tempo: 'Rapide', complexity: '1 gamme' }, recommendedScales: [
    { root: 'C', type: 'major', reason: 'Do majeur sur le thème ; Dm7–G7–C6 reste dans le même centre.' },
  ] },
  { id: 'summertime', title: 'Summertime', tags: { styles: ['Swing', 'Bossa/Latin'], tempo: 'Lent', complexity: '1 gamme' }, recommendedScales: [
    { root: 'D', type: 'minor', reason: 'Ré mineur sur la forme, y compris Gm–C7–Fmaj7 ; viser Do♯ sur A7.' },
  ] },
  { id: 'watermelon-man', title: 'Watermelon Man', tags: { styles: ['Soul-Jazz/Funk'], tempo: 'Medium', complexity: '1 gamme' }, recommendedScales: [
    { root: 'F', type: 'blues', reason: 'Même couleur blues sur les trois accords du thème ; souligner leur rythme' },
  ] },
];
