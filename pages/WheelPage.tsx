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

  useEffect(() => {
    localStorage.setItem('jazz_filters', JSON.stringify(filters));
  }, [filters]);

  useEffect(() => {
    localStorage.setItem('jazz_mode', mode);
  }, [mode]);

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
    <div className="max-w-6xl mx-auto px-6 py-12">
      <header className="flex flex-col items-center mb-16 text-center">
        <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-black uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
            Jazz Wheel - Conservatoire de Montélimar
        </div>
        <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-3">
            Prêt pour la <span className="text-indigo-600">JAM session ?</span>
        </h1>
        <p className="text-slate-500 text-lg font-medium max-w-lg">
            Découvrez votre prochain standard de jazz avec une touche de hasard ou choisissez-le manuellement.
        </p>

        {/* Mode Switcher */}
        <div className="mt-10 p-1.5 bg-slate-200/30 rounded-2xl glass flex">
            <button 
                onClick={() => setMode('wheel')}
                className={`px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${mode === 'wheel' ? 'bg-white shadow-lg text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
                Roue Aléatoire
            </button>
            <button 
                onClick={() => setMode('manual')}
                className={`px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${mode === 'manual' ? 'bg-white shadow-lg text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
                Sélection Manuelle
            </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-4 space-y-8 glass p-8 rounded-[2.5rem] shadow-xl border-white/50 h-fit sticky top-10">
          <div>
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Styles Musicaux</h3>
            <div className="flex flex-wrap gap-2">
              {styles.map(s => (
                <button
                  key={s}
                  onClick={() => toggleFilter(filters.styles, s, (val) => setFilters({...filters, styles: val}))}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    filters.styles.includes(s) 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                    : 'bg-white/50 text-slate-600 hover:bg-white border border-slate-100'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Tempo</h3>
              <div className="flex flex-col gap-2">
                {tempos.map(t => (
                  <button
                    key={t}
                    onClick={() => toggleFilter(filters.tempo, t, (val) => setFilters({...filters, tempo: val}))}
                    className={`text-left px-4 py-3 rounded-xl text-xs font-bold transition-all border ${
                      filters.tempo.includes(t) 
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-700' 
                      : 'bg-white/50 border-slate-100 text-slate-500'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Complexité</h3>
              <div className="flex flex-col gap-2">
                {complexities.map(c => (
                  <button
                    key={c}
                    onClick={() => toggleFilter(filters.complexity, c, (val) => setFilters({...filters, complexity: val}))}
                    className={`text-left px-4 py-3 rounded-xl text-xs font-bold transition-all border ${
                      filters.complexity.includes(c) 
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-700' 
                      : 'bg-white/50 border-slate-100 text-slate-500'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Répertoire</span>
            <div className="px-3 py-1 bg-indigo-50 rounded-lg text-indigo-600 font-black text-sm">
                {filteredItems.length} <span className="text-[10px] font-medium opacity-70">TITRES</span>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-8 flex flex-col items-center">
          {mode === 'wheel' ? (
            <div className="w-full flex flex-col items-center">
              <Wheel 
                items={filteredItems} 
                onResult={setLastResult} 
                isSpinning={isSpinning} 
                setIsSpinning={setIsSpinning} 
              />

              {lastResult && !isSpinning && (
                <div className="mt-12 w-full max-w-md glass p-10 rounded-[3rem] text-center border-indigo-100 animate-in shadow-2xl">
                  <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-2 block text-center">C'est gagné !</span>
                  <h2 className="text-4xl font-black text-slate-900 mb-8 tracking-tight leading-tight">{lastResult.title}</h2>
                  <button
                    onClick={() => onSelect(lastResult)}
                    className="w-full py-5 rounded-2xl bg-indigo-600 text-white font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200"
                  >
                    VOIR LES GAMMES
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="w-full space-y-6 animate-in">
              <div className="glass p-10 rounded-[3rem] border-white shadow-xl">
                <h2 className="text-2xl font-black text-slate-900 mb-6">Répertoire Disponible</h2>
                {filteredItems.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
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
                        <div className="font-bold text-lg leading-tight mb-2">{item.title}</div>
                        <div className={`text-[10px] font-bold uppercase tracking-widest ${manualSelection?.id === item.id ? 'text-indigo-200' : 'text-slate-400'}`}>
                          {item.tags.styles[0]} • {item.tags.tempo}
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="py-20 text-center text-slate-400 italic">
                    Aucun standard correspondant à vos filtres.
                  </div>
                )}
              </div>

              {manualSelection && (
                <div className="glass p-10 rounded-[3rem] border-indigo-100 text-center shadow-2xl animate-in">
                  <h2 className="text-3xl font-black text-slate-900 mb-8">{manualSelection.title}</h2>
                  <button
                    onClick={() => onSelect(manualSelection)}
                    className="w-full py-5 rounded-2xl bg-indigo-600 text-white font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200"
                  >
                    OUVRIR LES GAMMES
                  </button>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default WheelPage;