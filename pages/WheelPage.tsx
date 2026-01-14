
import React, { useState, useEffect, useMemo } from 'react';
import Wheel from '../components/Wheel';
import { JAZZ_STANDARDS } from '../data/tunes';
import { JazzStandard, Style, Tempo, Complexity, Filters } from '../types';

interface WheelPageProps {
  onSelect: (item: JazzStandard) => void;
}

type Mode = 'wheel' | 'manual';

const WheelPage: React.FC<WheelPageProps> = ({ onSelect }) => {
  const [mode, setMode] = useState<Mode>(() => {
    return (localStorage.getItem('jazz_mode') as Mode) || 'wheel';
  });

  const [filters, setFilters] = useState<Filters>(() => {
    const saved = localStorage.getItem('jazz_filters');
    return saved ? JSON.parse(saved) : { styles: [], tempo: [], complexity: [] };
  });

  const [lastResult, setLastResult] = useState<JazzStandard | null>(null);
  const [manualSelection, setManualSelection] = useState<JazzStandard | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showVictory, setShowVictory] = useState(false);

  useEffect(() => {
    localStorage.setItem('jazz_filters', JSON.stringify(filters));
  }, [filters]);

  useEffect(() => {
    localStorage.setItem('jazz_mode', mode);
  }, [mode]);

  // Déclencher l'effet de victoire quand un résultat arrive de la roue
  const handleWheelResult = (item: JazzStandard) => {
    setLastResult(item);
    setShowVictory(true);
  };

  const filteredItems = useMemo(() => {
    return JAZZ_STANDARDS.filter(item => {
      const styleMatch = filters.styles.length === 0 || item.tags.styles.some(s => filters.styles.includes(s));
      const tempoMatch = filters.tempo.length === 0 || filters.tempo.includes(item.tags.tempo);
      const complexityMatch = filters.complexity.length === 0 || filters.complexity.includes(item.tags.complexity);
      return styleMatch && tempoMatch && complexityMatch;
    });
  }, [filters]);

  const toggleFilter = <T,>(list: T[], value: T, setter: (val: T[]) => void) => {
    if (list.includes(value)) {
      setter(list.filter(item => item !== value));
    } else {
      setter([...list, value]);
    }
  };

  const styles: Style[] = ['New Orleans', 'Swing', 'Bebop', 'Modal', 'Bossa/Latin', 'Soul-Jazz/Funk', 'Ballad'];
  const tempos: Tempo[] = ['Lent', 'Medium', 'Rapide'];
  const complexities: Complexity[] = ['1 gamme', 'plusieurs gammes'];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 min-h-screen flex flex-col relative z-0">
      <header className="flex flex-col items-center mb-8 text-center shrink-0 relative z-50">
        <div className="mb-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse"></span>
            Jazz Wheel Pro
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-2">
            Prêt pour la <span className="text-indigo-600">JAM session ?</span>
        </h1>
        
        <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <div className="p-1 bg-slate-200/30 rounded-2xl glass flex shrink-0 shadow-sm relative z-50">
                <button 
                    onClick={() => { setMode('wheel'); setShowVictory(false); }}
                    className={`px-6 py-2 rounded-xl text-xs font-bold transition-all duration-300 relative z-50 ${mode === 'wheel' ? 'bg-white shadow-md text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    Roue
                </button>
                <button 
                    onClick={() => setMode('manual')}
                    className={`px-6 py-2 rounded-xl text-xs font-bold transition-all duration-300 relative z-50 ${mode === 'manual' ? 'bg-white shadow-md text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    Sélection
                </button>
            </div>

            <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all glass border relative z-50 ${showFilters ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg' : 'text-slate-600 border-white hover:bg-white'}`}
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                Filtres {filteredItems.length < JAZZ_STANDARDS.length && `(${filteredItems.length})`}
            </button>
        </div>

        {showFilters && (
            <div className="mt-4 w-full max-w-4xl glass p-8 rounded-[2rem] shadow-2xl border-white animate-in slide-in-from-top-4 duration-300 grid grid-cols-1 md:grid-cols-3 gap-8 text-left relative z-[60]">
                <div>
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Styles</h3>
                    <div className="flex flex-wrap gap-1.5">
                        {styles.map(s => (
                            <button
                                key={s}
                                onClick={() => toggleFilter(filters.styles, s, (val) => setFilters({...filters, styles: val}))}
                                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all border ${
                                    filters.styles.includes(s) 
                                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-md' 
                                    : 'bg-white border-slate-100 text-slate-500 hover:border-indigo-200'
                                }`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Tempo</h3>
                    <div className="flex flex-wrap gap-1.5">
                        {tempos.map(t => (
                            <button
                                key={t}
                                onClick={() => toggleFilter(filters.tempo, t, (val) => setFilters({...filters, tempo: val}))}
                                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all border ${
                                    filters.tempo.includes(t) 
                                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-md' 
                                    : 'bg-white border-slate-100 text-slate-500'
                                }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col justify-between">
                    <div>
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Complexité</h3>
                        <div className="flex flex-wrap gap-1.5">
                            {complexities.map(c => (
                                <button
                                    key={c}
                                    onClick={() => toggleFilter(filters.complexity, c, (val) => setFilters({...filters, complexity: val}))}
                                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all border ${
                                        filters.complexity.includes(c) 
                                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-md' 
                                        : 'bg-white border-slate-100 text-slate-500'
                                    }`}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button 
                        onClick={() => setFilters({ styles: [], tempo: [], complexity: [] })}
                        className="mt-6 text-[10px] font-black text-indigo-500 uppercase tracking-widest hover:text-indigo-700 transition-colors"
                    >
                        Réinitialiser
                    </button>
                </div>
            </div>
        )}
      </header>

      <main className="flex-grow flex flex-col items-center justify-center py-4 relative z-10">
        {mode === 'wheel' ? (
          <div className="w-full flex flex-col items-center relative">
            <Wheel 
              items={filteredItems} 
              onResult={handleWheelResult} 
              isSpinning={isSpinning} 
              setIsSpinning={setIsSpinning} 
            />

            {/* VICTORY OVERLAY */}
            {showVictory && lastResult && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-indigo-900/10 backdrop-blur-md animate-in fade-in duration-500">
                <div 
                  className="w-full max-w-3xl glass-victory p-12 rounded-[4rem] text-center shadow-[0_50px_100px_rgba(0,0,0,0.15)] border-white/40 flex flex-col items-center animate-in zoom-in-95 slide-in-from-bottom-12 duration-500 relative overflow-hidden"
                  style={{ background: 'rgba(255, 255, 255, 0.95)' }}
                >
                  {/* Decorative background circle */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full aspect-square bg-indigo-500/5 blur-3xl rounded-full -translate-y-1/2"></div>
                  
                  <div className="relative z-10">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-600 text-xs font-black uppercase tracking-widest mb-6 animate-bounce">
                      Standard Gagnant !
                    </span>
                    
                    <h2 className="text-6xl md:text-8xl font-black text-slate-900 mb-4 tracking-tighter leading-none">
                      {lastResult.title}
                    </h2>
                    
                    <div className="flex gap-4 justify-center mb-12">
                      {lastResult.tags.styles.map(s => (
                        <span key={s} className="text-slate-400 font-bold uppercase tracking-widest text-sm">{s}</span>
                      ))}
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-400 font-bold uppercase tracking-widest text-sm">{lastResult.tags.tempo}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                      <button
                        onClick={() => onSelect(lastResult)}
                        className="flex-1 py-6 rounded-3xl bg-indigo-600 text-white font-black text-xl hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-300 transform hover:-translate-y-1 active:scale-95"
                      >
                        VOIR LES GAMMES
                      </button>
                      <button
                        onClick={() => { setShowVictory(false); setLastResult(null); }}
                        className="flex-1 py-6 rounded-3xl bg-slate-100 text-slate-600 font-black text-xl hover:bg-slate-200 transition-all transform active:scale-95"
                      >
                        REJOUER
                      </button>
                    </div>
                  </div>

                  {/* Visual confetti elements (pseudo) */}
                  <div className="absolute top-10 left-10 w-4 h-4 rounded-full bg-indigo-300 opacity-20 animate-pulse"></div>
                  <div className="absolute bottom-20 right-10 w-8 h-8 rounded-full bg-indigo-400 opacity-10 animate-bounce"></div>
                  <div className="absolute top-1/2 right-20 w-3 h-3 rotate-45 bg-indigo-500 opacity-15"></div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full max-w-4xl space-y-6 animate-in relative z-20">
            <div className="glass p-10 rounded-[3rem] border-white shadow-xl">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-slate-900">Répertoire ({filteredItems.length})</h2>
              </div>
              
              {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
                  {filteredItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => setManualSelection(item)}
                      className={`text-left p-6 rounded-3xl border transition-all duration-300 ${
                        manualSelection?.id === item.id 
                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-200' 
                        : 'bg-white/50 border-slate-100 text-slate-700 hover:border-indigo-300'
                      }`}
                    >
                      <div className="font-bold text-base leading-tight mb-2 uppercase tracking-tight">{item.title}</div>
                      <div className={`text-[9px] font-bold uppercase tracking-widest ${manualSelection?.id === item.id ? 'text-indigo-200' : 'text-slate-400'}`}>
                        {item.tags.styles[0]} • {item.tags.tempo}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center text-slate-400 italic font-medium">
                  Aucun standard ne correspond à vos filtres.
                </div>
              )}
            </div>

            {manualSelection && (
              <div className="glass p-10 rounded-[3rem] border-indigo-100 text-center shadow-2xl animate-in flex flex-col items-center">
                <h2 className="text-3xl font-black text-slate-900 mb-8 uppercase tracking-tight">{manualSelection.title}</h2>
                <button
                  onClick={() => onSelect(manualSelection)}
                  className="w-full max-w-md py-5 rounded-2xl bg-indigo-600 text-white font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200"
                >
                  OUVRIR LES GAMMES
                </button>
              </div>
            )}
          </div>
        )}
      </main>
      
      <footer className="mt-8 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest py-4 shrink-0 relative z-10">
         Conservatoire de Montélimar • Jazz Wheel Pro v2.1
      </footer>
    </div>
  );
};

export default WheelPage;
