import type { ChordChart } from '../types';
import { transposeChord } from '../utils/musicUtils';

// Chord symbols transcribed from the user's Eb scores. The app stores concert pitch.
const eb = (bars: string[]): string[] => bars.map(bar => transposeChord(bar, 3));
const score = (file: string, id: string, note: string, bars: string[]): ChordChart => ({
  source: `${file} · partition Mi♭ fournie`,
  sourceUrl: `https://drive.google.com/file/d/${id}/view`,
  note,
  bars: eb(bars),
});

export const CHARTS: Record<string, ChordChart> = {
  'all-of-me': score('All of me.pdf', '18rrCnCo9_M1VIVt8_yDjWITgdg-21ylP', 'Forme A–B de 32 mesures. Accords entre parenthèses : propositions de relance.', [
    'A6','A6','C#7','C#7','F#7','F#7','Bm7','Bm7',
    'C#7','C#7','F#7','F#7','B7','B7','Bm7','E7',
    'A6','A6','C#7','C#7','F#7','F#7','Bm7','Bm7',
    'D6','Dm6','Amaj7 C#m7b5/G','F#7','Bm7','E7','A6 Cdim7','Bm7 E7',
  ]),
  'autumn-leaves': score('Autumn Leaves.pdf', '18XbLqJHaVXWKe_KsC0wAcTDwMLxwsegD', '32 mesures, sections A puis B. Les accords entre parenthèses sur la feuille sont des substitutions facultatives.', [
    'Am7','D7','Gmaj7','Cmaj7','F#m7b5','B7','Em','Em',
    'Am7','D7','Gmaj7','Cmaj7','F#m7b5','B7','Em','Em',
    'F#m7b5','B7','Em','Em','Am7','D7','Gmaj7','Cmaj7',
    'F#m7b5','B7','Em A7','Dm7 G7','Cmaj7','F#m7b5 B7#5','Em','E7',
  ]),
  'beautiful-love': score('Beautiful Love.pdf', '1WLOUeADFAibGYSZpawRqe0_B2UvqsSka', '20 mesures écrites : jouer 1–16, reprendre 1–12 puis jouer la deuxième fin 17–20.', [
    'C#m7b5','F#7#5','Bm','B7','Em7','A7','Dmaj7','C#m7b5 F#7',
    'Bm','Em7','G7','F#7','Bm','G#7b5','C#m7b5','F#7',
    'Bm G#7#9','G7 F#7','Bm','Bm',
  ]),
  'blue-bossa': score('Blue Bossa Eb.tif', '1MAeJZH0NT659cx04Ie86eGCujhMauM1f', '16 mesures. Croches égales ; souligner tierces et septièmes aux mesures 9–12.', [
    'Am','Am','Dm','Dm','Bm7b5','E7#9','Am','Am',
    'Cm','F7','Bbmaj7','Bbmaj7','Bm7b5','E7#9','Am','Bm7b5 E7#9',
  ]),
  'bluesette': score('Bluesette.pdf', '1U2HY95eQIWTBpn8Pq9ZB4xsZaz8OJHsi', 'Valse jazz de 24 mesures ; suivre les modulations indiquées sur la partition.', [
    'Gmaj7','Gmaj7','F#m7b5','B7','Em7','A7','Dm7','G7',
    'Cmaj7','Cmaj7','Cm7','F7','Bbmaj7','Bbmaj7','Bb7','Eb7',
    'Abmaj7','Abmaj7','Am7b5','D7','Bm7','Bm7','Am7','D7',
  ]),
  'cantaloupe-island': score('Cantaloupe Island Eb.tif', '1rjl9YBab35svovC2mDxE12Hfwu6caDbB', '16 mesures en phrases de quatre. La feuille suggère la gamme blues et la #11 sur le deuxième accord.', [
    'Dm','Dm','Dm','Dm','Bb7','Bb7','Bb7','Bb7',
    'Bm','Bm','Bm','Bm','Dm','Dm','Dm','Dm',
  ]),
  'footprints': score('Footprints Eb.tif', '19UEcudcbKdnKxOEF5JxUF4LWJ3nmDR19', 'Blues mineur de 12 mesures en 6/4. La feuille conseille la pentatonique mineure sur toute la forme.', [
    'Am','Am','Am','Am','Dm','Dm','Am','Am',
    'Ebm7b5 Ab7#9','C#7#9 F#7#9#5','Am','Am',
  ]),
  'maiden-voyage': score('Maiden Voyage Eb.tif', '1VLzVvqUIzVg-lk2_oExS--R7_iEnrwIU', '24 mesures, A–B–A. Quatre accords/gammes doriens indiqués sur la feuille.', [
    'F#m/B','F#m/B','F#m/B','F#m/B','Am/D','Am/D','Am/D','Am/D',
    'Gm/C','Gm/C','Gm/C','Gm/C','Bbm','Bbm','Bbm','Bbm',
    'F#m/B','F#m/B','F#m/B','F#m/B','Am/D','Am/D','Am/D','Am/D',
  ]),
  'mr-pc': score('Mr PC.pdf', '1KUFGrh8hFGhibCjKgzx1DugAtv6PZ6F4', 'Blues mineur de 12 mesures ; la partition indique surtout les accords par les slashs du rythme.', [
    'Am7','Am7','Am7','Am7','Dm7','Dm7','Am7','Am7 B7',
    'Am7 B7','B7','Am7','Am7',
  ]),
  'nature-boy': score('Nature Boy.pdf', '1HXlnjGz0KbX6vrmuG8ozwoFob2vBUufD', '32 mesures A–B ; la feuille concentre deux anciennes mesures en une à la 7e mesure de chaque partie.', [
    'Bm','C#m7b5 F#7','Bm','C#m7b5 F#7','Bm Bmmaj7','Bm7 Bm6','Em6 Bm','C#m7b5',
    'F#7','F#7','Bm','Bm','C#7b9','C#7b9','F#7','F#7',
    'Bm','C#m7b5 F#7','Bm','C#m7b5 F#7','Bm Bmmaj7','Bm7 Bm6','Em6 Bm','C#m7b5',
    'F#7','F#7','Bm','G#m7b5','C#7b9','F#7#5','Bm','C#m7b5 F#7',
  ]),
  'return-of-the-prodigal-son': score('return of the prodigal son.pdf', '1tV4AMV_Emujr0NmW0dxTyftoQ4GHoIce', 'Thème de 16 mesures. Intro : vamp Am7–D7 sur 4 mesures ; même vamp pour les solos. Coda : Em7–E7, Am.', [
    'Am7 D7','Am7 D7','Am7 D7','Am7 D7','Am7 D7','Am7 D7','Am7 D7','Am7 D7',
    'Am G','Dm Em','Em7 E7/G# Am','Am7 D7','Am G','Dm Em','Em7 E7/G# Am','Am7 D7',
  ]),
  'road-song': score('Road song.pdf', '1b9EFR5ipO7YSxTprTxKgDQHd2ktam4O_', 'La partition comporte deux fins et un D.S. al coda ; les accords entre parenthèses sont facultatifs sur les solos.', [
    'Em7','Em7','B7#9','F#m7 B7','Em7 Dm7','Cmaj7 Am7','C#7b5 Am7','B7#9 Em7',
    'Am7 D7','D7/C','Gmaj7/B','Gmaj7/A','Abm7 Db7','Gm7','C7','Fmaj7',
    'B7b9','Em7','Em7','B7#9','F#m7 B7','Em7 Dm7','Cmaj7 Am7','C#7b5 Am7',
    'B7#9 Em7',
  ]),
  'so-what': score('So what.pdf', '1KPnTlQ9cE51bUvl8-e_vPWNc5t0hSFxz', 'A–B–A : 16 mesures, 8 mesures, 8 mesures. Deux centres doriens séparés d’un demi-ton.', [
    ...Array(16).fill('Bm7'), ...Array(8).fill('Cm7'), ...Array(8).fill('Bm7'),
  ]),
  'song-for-my-father': score('Song for my father.pdf', '1RRibwGyE_mRbBOiD36wa4oePi0mO7WuX', '16 mesures, avec reprise et deux fins sur la partition.', [
    'Dm7','Dm7','C7','C7','Bb7','A7sus4','Dm7','Dm7',
    'C7','C7','Dm7','Dm7','C7 Bb7','A7','Dm7','Dm7',
  ]),
  'st-thomas': score('Saint Thomas.pdf', '1wnI_0eWC2HriHnKDvDyWBAXxVn8xhKbY', 'Grille de solos à 16 mesures relevée sous le thème. Thème joué deux fois avant et après les solos.', [
    'A6','F#7','Bm7 E7','A6','A6','F#7','Bm7 E7','A6',
    'C#m7b5','F#7','Bm7','E7','A7 A7/C#','D6 D#dim7','A6/E E7','A6',
  ]),
  'summertime': score('Summertime Eb.tif', '1SrCxYHRyFMAxDzlSfClwLFA_9U0zXGt_', '16 mesures en si mineur écrit (ré mineur concert). La feuille indique trois zones de gammes.', [
    'Bm','Bm','Bm','Bm B7#9','Em','Em','C#m7b5','F#7#9',
    'Bm','Bm','Bm','Em A7','Dmaj7','C#m7b5 F#7#9','Bm','F#7#9',
  ]),
  'watermelon-man': score('Watermelon man.pdf', '1C5x1eyV_IMVQTUsfOHD_A9EzRbmxbwQ5', '16 mesures ; accords 7 de la partition. La fin reste sur le premier accord.', [
    'D7','D7','D7','D7','G7','G7','D7','D7',
    'A7','G7','A7','G7','A7','G7','D7','D7',
  ]),
};
