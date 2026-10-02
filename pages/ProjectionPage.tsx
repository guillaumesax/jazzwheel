import { useEffect, useRef, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import type { AccidentalPreference, JazzStandard } from '../types';
import { CHARTS } from '../data/charts';
import { SCALE_LINKS, type ScaleLink } from '../data/scaleLinks';
import { SCALE_CUES } from '../data/scaleCues';
import { JAZZ_STANDARDS } from '../data/tunes';
import { formatFrenchNote, formatScaleName, scaleNotes, transposeChord, transposeNote } from '../utils/musicUtils';
import { readStorage, writeStorage } from '../utils/storage';
import './projection.css';

type Pitch = 'concert' | 'bb' | 'eb';
const PITCHES: { value: Pitch; label: string; notation: string; description: string; shift: number }[] = [
  { value: 'concert', label: 'Concert', notation: 'C', description: 'piano · guitare · basse', shift: 0 },
  { value: 'bb', label: 'Si♭', notation: 'Bb', description: 'ténor · soprano · trompette', shift: 2 },
  { value: 'eb', label: 'Mi♭', notation: 'Eb', description: 'alto · baryton', shift: 9 },
];
const PUBLIC_URL = 'https://guillaumesax.github.io/jazzwheel/';

const sectionFor = (id: string, bar: number, count: number): string => {
  if (id === 'so-what') return bar < 16 ? 'A · 16' : bar < 24 ? 'B · 8' : 'A · 8';
  if (id === 'maiden-voyage') return bar < 8 ? 'A · 8' : bar < 16 ? 'B · 8' : 'A · 8';
  const phraseSize = count === 12 ? 4 : count === 22 ? 4 : 8;
  const first = Math.floor(bar / phraseSize) * phraseSize + 1;
  return `${first}–${Math.min(first + phraseSize - 1, count)}`;
};

const linksForChords = (link: ScaleLink | undefined, count: number): (number | null)[] =>
  Array.isArray(link) ? [...link] : Array(count).fill(link ?? null);

const scaleMarkers = (links: (number | null)[]): (number | null)[] =>
  links.filter((link, index) => index === 0 || link !== links[index - 1]);

interface Props {
  item: JazzStandard;
  onBack: () => void;
  onSelect: (item: JazzStandard) => void;
}

export default function ProjectionPage({ item, onBack, onSelect }: Props) {
  const [pitch, setPitch] = useState<Pitch>(() => {
    const saved = readStorage('projection_pitch');
    return saved === 'bb' || saved === 'eb' ? saved : 'concert';
  });
  const [pref, setPref] = useState<AccidentalPreference>(() => {
    const saved = readStorage('accidental_pref');
    return saved === '#' || saved === 'b' ? saved : 'auto';
  });
  const heading = useRef<HTMLHeadingElement>(null);
  const shareDialog = useRef<HTMLDialogElement>(null);
  const chart = CHARTS[item.id];
  const pitchInfo = PITCHES.find(p => p.value === pitch)!;
  const shift = pitchInfo.shift;
  const count = chart?.bars.length ?? 0;
  const shareUrl = `${PUBLIC_URL}#projection/${item.id}`;

  useEffect(() => { heading.current?.focus(); }, [item.id]);
  useEffect(() => { writeStorage('projection_pitch', pitch); }, [pitch]);
  useEffect(() => { writeStorage('accidental_pref', pref); }, [pref]);
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLElement && /^(SELECT|INPUT)$/.test(event.target.tagName)) return;
      if (event.key === 'Escape') onBack();
      if (event.key === '1') setPitch('concert');
      if (event.key === '2') setPitch('bb');
      if (event.key === '3') setPitch('eb');
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onBack]);

  return <main className={`projection projection--${count}`} aria-label={`Projection de ${item.title}`}>
    <header className="projection__header">
      <div className="projection__identity">
        <button className="projection__back" onClick={onBack} aria-label="Quitter le mode projection et revenir à la roue">← <span>La roue</span></button>
        <div className="projection__title-block">
          <div className="projection__eyebrow">JAM SESSION <span aria-hidden="true">/</span> {count} MESURES</div>
          <h1 ref={heading} tabIndex={-1}>{item.title}</h1>
        </div>
      </div>
      <div className="projection__header-right">
        <label className="projection__tune-picker">MORCEAU
          <select value={item.id} onChange={event => {
            const next = JAZZ_STANDARDS.find(tune => tune.id === event.target.value);
            if (next) onSelect(next);
          }}>
            {JAZZ_STANDARDS.map(tune => <option key={tune.id} value={tune.id}>{tune.title}</option>)}
          </select>
        </label>
        <button className="projection__share" type="button" onClick={() => shareDialog.current?.showModal()} aria-label={`Afficher le QR code de ${item.title} pour les musiciens`} aria-haspopup="dialog" title="Scanner pour ouvrir ce morceau sur son téléphone">
          <QRCodeSVG value={shareUrl} size={70} level="M" marginSize={4} bgColor="#ffffff" fgColor="#171a36" aria-hidden="true" />
          <span>SCANNE</span>
        </button>
        <div className="projection__key">
          <span>GAMME REPÈRE · {pitchInfo.label.toUpperCase()}</span>
          <strong>{transposeNote(item.recommendedScales[0].root, pitchInfo.shift, pref)}</strong>
        </div>
      </div>
    </header>
    <dialog ref={shareDialog} className="projection__share-dialog" aria-label={`QR code de ${item.title}`} onClick={event => { if (event.target === shareDialog.current) shareDialog.current.close(); }}>
      <div className="projection__share-dialog-content">
        <p className="projection__share-kicker">SUR TON TÉLÉPHONE</p>
        <h2>{item.title}</h2>
        <p>Scanne, puis choisis ta tonalité : C, Bb ou Eb.</p>
        <QRCodeSVG value={shareUrl} size={260} level="M" marginSize={4} bgColor="#ffffff" fgColor="#171a36" title={`Lien vers ${item.title}`} />
        <a href={shareUrl} target="_blank" rel="noopener noreferrer">Ouvrir le morceau ↗</a>
        <form method="dialog"><button type="submit">Fermer</button></form>
      </div>
    </dialog>

    <div className="projection__toolbar">
      <div className="projection__pitch" role="group" aria-label="Transposition de la grille et des gammes">
        {PITCHES.map(option => <button key={option.value} aria-label={option.label} aria-pressed={pitch === option.value} onClick={() => setPitch(option.value)} title={option.description}><span>{option.label}</span><small aria-hidden="true">{option.notation}</small></button>)}
      </div>
      <div className="projection__instrument">{pitchInfo.description}</div>
      <div className="projection__pref" role="group" aria-label="Altérations">
        {(['auto', 'b', '#'] as AccidentalPreference[]).map(value => <button key={value} aria-pressed={pref === value} onClick={() => setPref(value)} aria-label={value === 'auto' ? 'Altérations automatiques' : value === 'b' ? 'Bémols' : 'Dièses'}>{value === 'auto' ? 'AUTO' : value === 'b' ? '♭' : '♯'}</button>)}
      </div>
    </div>

    <div className="projection__body">
      <section className="projection__chart" aria-label={`Grille complète en ${pitchInfo.label}, ${count} mesures`}>
        <div className="projection__panel-title"><h2>GRILLE</h2>{chart && <a href={chart.sourceUrl} target="_blank" rel="noopener noreferrer" title={chart.source}>PARTITION MI♭ ↗</a>}<span>GRIS = NOTES DE L’ACCORD</span></div>
        <div className="projection__bars" style={{ '--bar-rows': Math.ceil(count / 4) } as React.CSSProperties}>
          {chart?.bars.map((bar, index) => {
            const section = sectionFor(item.id, index, count);
            const previous = index > 0 ? sectionFor(item.id, index - 1, count) : null;
            const chords = bar.split(' ').map(chord => transposeChord(chord, shift, pref));
            const links = linksForChords(SCALE_LINKS[item.id]?.[index], chords.length);
            const sameScale = links.every(link => link === links[0]) ? links[0] : null;
            const markers = scaleMarkers(links);
            const scaleDescription = links.map(link => link === null ? 'notes de l’accord' : `gamme ${link + 1}`).join(', puis ');
            const targetNotes = SCALE_CUES[item.id]?.[index + 1]?.map(note =>
              transposeNote(note, shift, pref === 'auto' && note.includes('#') ? '#' : pref)) ?? [];
            const targetDescription = targetNotes.length ? ` ; notes-cibles de l’accord : ${targetNotes.map(formatFrenchNote).join(', ')}` : '';
            return <div className={`projection__bar ${section !== previous ? 'projection__bar--section' : ''}`} data-scale={sameScale ?? 'none'} role="group" aria-label={`Mesure ${index + 1} : ${chords.join(', puis ')} ; ${scaleDescription}${targetDescription}`} key={index}>
              <div className="projection__bar-meta"><span>{String(index + 1).padStart(2, '0')}</span>{section !== previous && <b>{section}</b>}{targetNotes.length > 0 && <span className="projection__target-note" title="Note-cible de l’accord, hors de la gamme repère" aria-label={`Note-cible : ${targetNotes.map(formatFrenchNote).join(', ')}`}>+{targetNotes.join(' / ')}</span>}<span className="projection__scale-markers" aria-hidden="true">{markers.map((link, markerIndex) => <span className="projection__scale-marker-part" key={markerIndex}>{markerIndex > 0 && <span className="projection__scale-arrow">›</span>}<span className="projection__scale-marker" data-scale={link ?? 'none'}>{link === null ? '·' : link + 1}</span></span>)}</span></div>
              <div className={`projection__chords ${chords.length > 1 ? 'projection__chords--split' : ''}`}>
                {chords.map((chord, chordIndex) => <span className="projection__chord" data-scale={links[chordIndex] ?? 'none'} key={chordIndex}>{chord}</span>)}
              </div>
            </div>;
          })}
        </div>
      </section>

      <section className="projection__scales" aria-label="Modes, gammes et notes à jouer">
        <div className="projection__panel-title"><h2>À JOUER</h2><span>MÊME COULEUR + N° · {pitchInfo.label.toUpperCase()}</span></div>
        <p className="projection__play-tip">Une couleur = une gamme · + = note-cible hors gamme · visez les 3es et 7es.</p>
        <div className={`projection__scale-list ${item.recommendedScales.length === 1 ? 'projection__scale-list--single' : ''}`} style={{ '--scale-count': item.recommendedScales.length } as React.CSSProperties}>
          {item.recommendedScales.map((scale, index) => {
            const root = transposeNote(scale.root, pitchInfo.shift, pref);
            const notes = scaleNotes(root, scale.type);
            return <article className="projection__scale" data-scale={index} aria-label={`Gamme ${index + 1} : ${formatScaleName(root, scale.type)}`} key={`${scale.root}-${scale.type}-${index}`}>
              <div className="projection__scale-index">{index + 1}</div>
              <div className="projection__scale-main">
                <h3>{formatScaleName(root, scale.type)}</h3>
                <p className="projection__reason">{scale.reason}</p>
                <p className="projection__notes" aria-label={`Notes : ${notes.join(', ')}`}>{notes.join(' · ')}</p>
                <p className="projection__notes-fr" lang="fr" aria-label={`Noms des notes en français : ${notes.map(formatFrenchNote).join(', ')}`}>{notes.map(formatFrenchNote).join(' · ')}</p>
              </div>
            </article>;
          })}
        </div>
      </section>
    </div>
    <footer className="projection__footer"><span>{chart?.note}</span><span>Échap · retour &nbsp; 1 / 2 / 3 · transposition</span></footer>
  </main>;
}
