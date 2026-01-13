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
    <div className="h-screen flex flex-col px-6 py-6 md:px-12 animate-in overflow-hidden">
      {/* Mini Header / Nav */}
      <nav className="flex items-center justify-between mb-6 shrink-0">
        <button
          onClick={onBack}
          className="group flex items-center gap-3 text-slate-400 hover:text-indigo-600 transition-all font-bold text-[10px] uppercase tracking-widest"
        >
          <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center border border-slate-100">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </div>
          Retour
        </button>

        <div className="glass px-1 py-1 rounded-xl flex items-center gap-1 border-white shadow-md">
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mx-2">Notation</span>
          <div className="flex bg-slate-100/50 p-0.5 rounded-lg">
            {(['#', 'b', 'auto'] as AccidentalPreference[]).map(p => (
              <button
                key={p}
                onClick={() => setPref(p)}
                className={`px-4 py-1.5 rounded-md text-[9px] font-black transition-all uppercase tracking-widest ${
                  pref === p ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {p === 'auto' ? 'Auto' : p}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Condensed Title Section */}
      <header className="mb-6 flex flex-col md:flex-row md:items-end justify-between shrink-0 gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-2">{item.title}</h1>
          <div className="flex gap-2 flex-wrap">
            {item.tags.styles.map(s => (
              <span key={s} className="px-3 py-1 rounded-lg bg-indigo-50 text-indigo-600 text-[9px] font-black uppercase tracking-widest border border-indigo-100">{s}</span>
            ))}
            <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-600 text-[9px] font-black uppercase tracking-widest">{item.tags.tempo}</span>
          </div>
        </div>
      </header>

      {/* Main Content Area - Fullscreen Table Style */}
      <div className="flex-grow glass rounded-[2.5rem] border-white shadow-2xl overflow-hidden flex flex-col mb-4">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-8 py-4 bg-slate-50/50 border-b border-slate-100 shrink-0 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <div className="col-span-3">Gamme (Concert)</div>
            <div className="col-span-3">Contexte / Raison</div>
            <div className="col-span-3">Sib (Ténor/Soprano)</div>
            <div className="col-span-3">Mib (Alto/Baryton)</div>
        </div>

        {/* Scrollable Rows */}
        <div className="flex-grow overflow-y-auto custom-scrollbar p-2 space-y-2">
            {item.recommendedScales.map((scale, idx) => {
                const concertRoot = transposeNote(scale.root, 0, pref);
                const bbRoot = transposeNote(scale.root, 2, pref);
                const ebRoot = transposeNote(scale.root, 9, pref);

                return (
                    <div key={idx} className="grid grid-cols-12 gap-4 px-6 py-5 rounded-[1.5rem] bg-white/40 border border-transparent hover:border-indigo-100 hover:bg-white transition-all items-center">
                        <div className="col-span-3">
                            <span className="text-lg font-black text-indigo-600 tracking-tight">{formatScaleName(concertRoot, scale.type)}</span>
                        </div>
                        <div className="col-span-3">
                            <p className="text-slate-500 italic text-xs font-medium leading-tight line-clamp-2">"{scale.reason}"</p>
                        </div>
                        <div className="col-span-3">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50/50 rounded-xl border border-indigo-100/50">
                                <span className="text-[9px] font-black text-indigo-400">Bb</span>
                                <span className="font-mono text-sm font-black text-slate-800 tracking-tight">{formatScaleName(bbRoot, scale.type)}</span>
                            </div>
                        </div>
                        <div className="col-span-3">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-900/5 rounded-xl border border-slate-200/50">
                                <span className="text-[9px] font-black text-slate-400">Eb</span>
                                <span className="font-mono text-sm font-black text-slate-800 tracking-tight">{formatScaleName(ebRoot, scale.type)}</span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
      </div>

      {/* Compact Footer */}
      <footer className="flex justify-between items-center text-[9px] font-black text-slate-400 uppercase tracking-widest shrink-0 px-4">
        <span>Bb (+2) • Eb (+9)</span>
        <span>© Jazz Wheel Pro 2025</span>
      </footer>
    </div>
  );
};

export default ScalesPage;