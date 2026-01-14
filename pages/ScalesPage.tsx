
import React, { useState, useEffect } from 'react';
import { JazzStandard, AccidentalPreference } from '../types';
import { transposeNote, formatScaleName } from '../utils/musicUtils';

interface ScalesPageProps {
  item: JazzStandard;
  onBack: () => void;
}

const ScalesPage: React.FC<ScalesPageProps> = ({ item, onBack }) => {
  const [pref, setPref] = useState<AccidentalPreference>(() => {
    return (localStorage.getItem('accidental_pref') as AccidentalPreference) || 'auto';
  });

  useEffect(() => {
    localStorage.setItem('accidental_pref', pref);
  }, [pref]);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col p-4 md:p-8 animate-in fade-in duration-500 overflow-x-hidden">
      {/* Top Navigation - Extra Visible */}
      <nav className="flex items-center justify-between mb-8 shrink-0">
        <button
          onClick={onBack}
          className="group flex items-center gap-4 text-slate-400 hover:text-white transition-all font-black text-sm uppercase tracking-[0.2em]"
        >
          <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center border border-slate-700 shadow-xl group-hover:bg-indigo-600 group-hover:border-indigo-500 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
          </div>
          <span className="hidden sm:inline">Retour</span>
        </button>

        <div className="flex bg-slate-800/50 p-1.5 rounded-2xl border border-slate-700 shadow-inner">
          {(['#', 'b', 'auto'] as AccidentalPreference[]).map(p => (
            <button
              key={p}
              onClick={() => setPref(p)}
              className={`px-6 py-3 rounded-xl text-xs font-black transition-all uppercase tracking-widest ${
                pref === p ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
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
            Partition Digitale
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-4 leading-none">
            {item.title}
        </h1>
        <div className="flex gap-4 flex-wrap justify-center md:justify-start">
          {item.tags.styles.map(s => (
            <span key={s} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-400 text-xs font-black uppercase tracking-widest border border-slate-700">{s}</span>
          ))}
          <span className="px-4 py-2 rounded-xl bg-indigo-600/20 text-indigo-400 text-xs font-black uppercase tracking-widest border border-indigo-500/30">{item.tags.tempo}</span>
        </div>
      </header>

      {/* LARGE SCALE GRID */}
      <div className="flex-grow grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
        {item.recommendedScales.map((scale, idx) => {
          const concertRoot = transposeNote(scale.root, 0, pref);
          const bbRoot = transposeNote(scale.root, 2, pref);
          const ebRoot = transposeNote(scale.root, 9, pref);

          return (
            <div key={idx} className="bg-slate-800/40 rounded-[3rem] border border-slate-700/50 p-8 md:p-12 shadow-2xl flex flex-col gap-8 hover:border-indigo-500/50 transition-all duration-500 relative overflow-hidden group">
              {/* Background Accent */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/5 blur-[100px] rounded-full group-hover:bg-indigo-600/10 transition-colors"></div>
              
              {/* Scale Title - Concert Key */}
              <div className="relative z-10 border-b border-slate-700/50 pb-6">
                <div className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Concert / Piano</div>
                <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    {formatScaleName(concertRoot, scale.type)}
                </h3>
                <p className="text-indigo-400/60 italic text-sm font-bold mt-2 tracking-wide">"{scale.reason}"</p>
              </div>

              {/* Transposition Blocks - HUGE TEXT */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                {/* Bb Block */}
                <div className="bg-slate-900/60 p-8 rounded-[2rem] border border-slate-700/30 group-hover:border-indigo-500/20 transition-all">
                   <div className="flex items-center justify-between mb-4">
                      <span className="text-indigo-500 font-black text-xs tracking-widest">TÉNOR / SOPRANO</span>
                      <span className="px-2 py-1 rounded bg-indigo-500/10 text-indigo-400 text-[10px] font-black border border-indigo-500/20">Bb</span>
                   </div>
                   <div className="text-5xl md:text-6xl font-black text-white tracking-tighter">
                      {bbRoot}<span className="text-indigo-500 text-3xl ml-1">{scale.type.split(' ')[0]}</span>
                   </div>
                   <div className="text-slate-600 text-[10px] font-bold mt-4 uppercase tracking-widest truncate">
                      {scale.type}
                   </div>
                </div>

                {/* Eb Block */}
                <div className="bg-slate-900/60 p-8 rounded-[2rem] border border-slate-700/30 group-hover:border-indigo-500/20 transition-all">
                   <div className="flex items-center justify-between mb-4">
                      <span className="text-amber-500 font-black text-xs tracking-widest">ALTO / BARYTON</span>
                      <span className="px-2 py-1 rounded bg-amber-500/10 text-amber-400 text-[10px] font-black border border-amber-500/20">Eb</span>
                   </div>
                   <div className="text-5xl md:text-6xl font-black text-white tracking-tighter">
                      {ebRoot}<span className="text-amber-500 text-3xl ml-1">{scale.type.split(' ')[0]}</span>
                   </div>
                   <div className="text-slate-600 text-[10px] font-bold mt-4 uppercase tracking-widest truncate">
                      {scale.type}
                   </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Visual Footer */}
      <footer className="mt-auto pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 font-black text-[10px] uppercase tracking-[0.4em]">
        <div className="flex items-center gap-6">
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

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-in {
          animation: fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default ScalesPage;
