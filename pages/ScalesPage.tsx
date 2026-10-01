
import React, { useState, useEffect, useRef } from 'react';
import type { JazzStandard, AccidentalPreference } from '../types';
import { readStorage, writeStorage } from '../utils/storage';
import { transposeNote, formatScaleName, scaleNotes, transposeChord } from '../utils/musicUtils';
import { CHARTS } from '../data/charts';

interface ScalesPageProps {
  item: JazzStandard;
  onBack: () => void;
}

const ScalesPage: React.FC<ScalesPageProps> = ({ item, onBack }) => {
  const [chartPitch, setChartPitch] = useState<'concert' | 'bb' | 'eb'>('concert');
  const variantShift = item.id === 'all-of-me-chant' ? -4 : item.id === 'summertime-chant' ? 2 : 0;
  const chart = CHARTS[item.id.replace(/-chant$/, '')];
  const instrumentShift = chartPitch === 'bb' ? 2 : chartPitch === 'eb' ? 9 : 0;
  const [pref, setPref] = useState<AccidentalPreference>(() => {
    const saved = readStorage('accidental_pref');
    return saved === '#' || saved === 'b' ? saved : 'auto';
  });

  const titleRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => { titleRef.current?.focus(); }, [item.id]);

  useEffect(() => {
    writeStorage('accidental_pref', pref);
  }, [pref]);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col p-4 md:p-8 animate-in fade-in duration-500 overflow-x-hidden">
      {/* Top Navigation - Extra Visible */}
      <nav className="flex items-center justify-between mb-8 shrink-0">
        <button
          aria-label="Retour au répertoire"
          onClick={onBack}
          className="group flex items-center gap-4 text-slate-400 hover:text-white transition-all font-black text-sm uppercase tracking-[0.2em]"
        >
          <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center border border-slate-700 shadow-xl group-hover:bg-indigo-600 group-hover:border-indigo-500 transition-colors">
              <svg aria-hidden="true" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
          </div>
          <span className="hidden sm:inline">Retour</span>
        </button>

        <div className="flex bg-slate-800/50 p-1.5 rounded-2xl border border-slate-700 shadow-inner">
          {(['#', 'b', 'auto'] as AccidentalPreference[]).map(p => (
            <button
              aria-pressed={pref === p}
              aria-label={p === "#" ? "Afficher les dièses" : p === "b" ? "Afficher les bémols" : "Altérations automatiques"}
              key={p}
              onClick={() => setPref(p)}
              className={`px-4 sm:px-6 py-3 rounded-xl text-xs font-black transition-all uppercase tracking-widest ${
                pref === p ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              {p === 'auto' ? 'Auto' : p}
            </button>
          ))}
        </div>
      </nav>

      {/* Hero Title Section */}
      <header className="mb-10 text-center md:text-left">
        <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4 border border-indigo-500/20">
            Gammes conseillées
        </div>
        <h1 ref={titleRef} tabIndex={-1} className="text-4xl sm:text-6xl md:text-8xl break-words font-black text-white tracking-tighter mb-4 leading-none">
            {item.title}
        </h1>
        <div className="flex gap-4 flex-wrap justify-center md:justify-start">
          {item.tags.styles.map(s => (
            <span key={s} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-400 text-xs font-black uppercase tracking-widest border border-slate-700">{s}</span>
          ))}
          <span className="px-4 py-2 rounded-xl bg-indigo-600/20 text-indigo-400 text-xs font-black uppercase tracking-widest border border-indigo-500/30">{item.tags.tempo}</span>
        </div>
      </header>

      <p className="max-w-4xl mb-8 text-slate-300 leading-relaxed">
        Les notes ci-dessous sont écrites pour chaque instrument. Une gamme indique les notes disponibles sur les accords cités, pas une consigne de la jouer du début à la fin : place d’abord les notes de l’accord sur les temps forts, puis relie-les avec les autres notes de la gamme. Sur une dominante, suis l’accord indiqué dans la grille.
      </p>

      {/* LARGE SCALE GRID */}
      <main aria-label="Gammes et transpositions" className="flex-grow grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
        {item.recommendedScales.map((scale, idx) => {
          const concertRoot = transposeNote(scale.root, 0, pref);
          const bbRoot = transposeNote(scale.root, 2, pref);
          const ebRoot = transposeNote(scale.root, 9, pref);

          return (
            <div key={idx} className="bg-slate-800/40 rounded-[3rem] border border-slate-700/50 p-5 sm:p-8 md:p-12 shadow-2xl min-w-0 flex flex-col gap-8 hover:border-indigo-500/50 transition-all duration-500 relative overflow-hidden group">
              {/* Background Accent */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/5 blur-[100px] rounded-full group-hover:bg-indigo-600/10 transition-colors"></div>
              
              {/* Scale Title - Concert Key */}
              <div className="relative z-10 border-b border-slate-700/50 pb-6">
                <div className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Concert / Piano</div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl break-words font-black text-white tracking-tight">
                    {formatScaleName(concertRoot, scale.type)}
                </h2>
                <p className="text-indigo-300 text-sm font-bold mt-2 tracking-wide">{scale.reason}</p>
                <p className="text-white text-lg font-semibold mt-5 leading-relaxed" aria-label={`Notes de ${formatScaleName(concertRoot, scale.type)} : ${scaleNotes(concertRoot, scale.type).join(', ')}`}>
                  {scaleNotes(concertRoot, scale.type).join(' · ')}
                </p>
              </div>

              {/* Transposition Blocks - HUGE TEXT */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                {/* Bb Block */}
                <div className="bg-slate-900/60 p-5 sm:p-8 min-w-0 rounded-[2rem] border border-slate-700/30 group-hover:border-indigo-500/20 transition-all">
                   <div className="flex items-center justify-between mb-4">
                      <span className="text-indigo-300 font-black text-xs tracking-widest">TÉNOR / SOPRANO</span>
                      <span className="px-2 py-1 rounded bg-indigo-500/10 text-indigo-400 text-[10px] font-black border border-indigo-500/20">Bb</span>
                   </div>
                   <div className="text-3xl sm:text-4xl break-words font-black text-white tracking-tighter">
                      {formatScaleName(bbRoot, scale.type)}
                   </div>
                   <div className="text-slate-200 text-base font-semibold mt-4 leading-relaxed">
                      {scaleNotes(bbRoot, scale.type).join(' · ')}
                   </div>
                </div>

                {/* Eb Block */}
                <div className="bg-slate-900/60 p-5 sm:p-8 min-w-0 rounded-[2rem] border border-slate-700/30 group-hover:border-indigo-500/20 transition-all">
                   <div className="flex items-center justify-between mb-4">
                      <span className="text-amber-500 font-black text-xs tracking-widest">ALTO / BARYTON</span>
                      <span className="px-2 py-1 rounded bg-amber-500/10 text-amber-400 text-[10px] font-black border border-amber-500/20">Eb</span>
                   </div>
                   <div className="text-3xl sm:text-4xl break-words font-black text-white tracking-tighter">
                      {formatScaleName(ebRoot, scale.type)}
                   </div>
                   <div className="text-slate-200 text-base font-semibold mt-4 leading-relaxed">
                      {scaleNotes(ebRoot, scale.type).join(' · ')}
                   </div>
                </div>
              </div>
            </div>
          );
        })}
      </main>

      {chart && <section aria-labelledby="chart-title" className="mb-10 bg-slate-800/60 border border-slate-700 rounded-[2rem] p-5 sm:p-8">
        <div className="flex flex-wrap justify-between gap-5 items-start mb-6">
          <div>
            <h2 id="chart-title" className="text-3xl sm:text-4xl font-black">Grille d’accords</h2>
            <p className="text-slate-300 mt-2">{chart.bars.length} mesures écrites{variantShift ? ' · version chant transposée' : ''}. {chart.note}</p>
            <p className="text-slate-400 text-xs mt-2">Source : {chart.source}. Les reprises et variantes peuvent différer selon les éditions.</p>
          </div>
          <div role="group" aria-label="Tonalité de la grille" className="flex flex-wrap gap-2">
            {([['concert', 'Concert'], ['bb', 'Sib'], ['eb', 'Mib']] as const).map(([value, label]) =>
              <button key={value} type="button" aria-pressed={chartPitch === value} onClick={() => setChartPitch(value)}
                className={`px-4 py-2 rounded-xl font-bold text-sm border ${chartPitch === value ? 'bg-indigo-600 border-indigo-400 text-white' : 'border-slate-600 text-slate-300 hover:bg-slate-700'}`}>
                {label}
              </button>)}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3" aria-label={`Grille pour ${chartPitch === 'concert' ? 'instrument en ut' : chartPitch === 'bb' ? 'instrument en si bémol' : 'instrument en mi bémol'}`}>
          {chart.bars.map((bar, index) => <div key={index} className="min-h-24 rounded-xl border border-slate-600 bg-slate-900/70 p-3 sm:p-4 flex flex-col justify-between">
            <span className="text-slate-400 text-xs font-bold">{index + 1}</span>
            <span className="text-lg sm:text-xl font-bold break-words">{bar.split(' ').map((chord, chordIndex) =>
              <React.Fragment key={chordIndex}>{chordIndex > 0 && <span className="text-slate-500 mx-2">·</span>}{transposeChord(chord, variantShift + instrumentShift, pref)}</React.Fragment>)}</span>
          </div>)}
        </div>
        <p className="text-slate-400 text-sm mt-5">Une case = une mesure ; deux accords dans une case = deux demi-mesures. La grille est en sons réels par défaut. Les boutons Sib et Mib affichent les accords écrits pour saxophone.</p>
      </section>}

      {/* Visual Footer */}
      <footer className="mt-auto pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 font-black text-[10px] uppercase tracking-[0.4em]">
        <div className="flex flex-wrap justify-center items-center gap-4">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                <span>Bb Transpose +2</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                <span>Eb Transpose +9</span>
            </div>
        </div>
        <span>Jazz Wheel Pro • Digital Stand Mode</span>
      </footer>


    </div>
  );
};

export default ScalesPage;
