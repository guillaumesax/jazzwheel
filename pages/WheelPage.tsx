
import React, { useState, useEffect, useMemo } from 'react';
import Wheel from '../components/Wheel';
import { JAZZ_STANDARDS } from '../data/tunes';
import type { JazzStandard, Filters } from '../types';
import { readStorage, writeStorage } from '../utils/storage';
import { parseFilters, filterStandards, STYLES, TEMPOS, COMPLEXITIES } from '../utils/filters';
import ResultDialog from '../components/ResultDialog';

interface WheelPageProps {
  onSelect: (item: JazzStandard) => void;
  onWheelSelect: (item: JazzStandard) => void;
}

type Mode = 'wheel' | 'manual';

const WheelPage: React.FC<WheelPageProps> = ({ onSelect, onWheelSelect }) => {
  const [mode, setMode] = useState<Mode>(() => {
    return readStorage('jazz_mode') === 'manual' ? 'manual' : 'wheel';
  });

  const [filters, setFilters] = useState<Filters>(() => {
    return parseFilters(readStorage('jazz_filters'));
  });

  const [lastResult, setLastResult] = useState<JazzStandard | null>(null);
  const [manualSelection, setManualSelection] = useState<JazzStandard | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showVictory, setShowVictory] = useState(false);

  useEffect(() => {
    writeStorage('jazz_filters', JSON.stringify(filters));
  }, [filters]);

  useEffect(() => {
    writeStorage('jazz_mode', mode);
  }, [mode]);

  // Déclencher l'effet de victoire quand un résultat arrive de la roue
  const handleWheelResult = (item: JazzStandard) => {
    setLastResult(item);
    setShowVictory(true);
  };

  const filteredItems = useMemo(() => {
    return filterStandards(JAZZ_STANDARDS, filters);
  }, [filters]);

  useEffect(() => {
    if (manualSelection && !filteredItems.some(item => item.id === manualSelection.id)) {
      setManualSelection(null);
    }
  }, [filteredItems, manualSelection]);

  const toggleFilter = <T,>(list: T[], value: T, setter: (val: T[]) => void) => {
    if (list.includes(value)) {
      setter(list.filter(item => item !== value));
    } else {
      setter([...list, value]);
    }
  };

  const styles = STYLES;
  const tempos = TEMPOS;
  const complexities = COMPLEXITIES;

  return (
    <div className="wheel-page max-w-7xl mx-auto px-4 sm:px-6 py-8 min-h-screen flex flex-col relative z-0">
      <header className="flex flex-col items-center mb-8 text-center shrink-0 relative z-50">
        <div className="mb-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse"></span>
            Jazz Wheel Pro
        </div>
        <h1 id="wheel-title" tabIndex={-1} className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-2">
            Prêt pour la <span className="text-indigo-600">JAM session ?</span>
        </h1>
        
        <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <div className="p-1 bg-slate-200/30 rounded-2xl glass flex shrink-0 shadow-sm relative z-50">
                <button 
                    disabled={isSpinning}
                    aria-pressed={mode === 'wheel'}
                    onClick={() => { setMode('wheel'); setShowVictory(false); }}
                    className={`px-6 py-2 rounded-xl text-xs font-bold transition-all duration-300 relative z-50 ${mode === 'wheel' ? 'bg-white shadow-md text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    Roue
                </button>
                <button 
                    disabled={isSpinning}
                    aria-pressed={mode === 'manual'}
                    onClick={() => setMode('manual')}
                    className={`px-6 py-2 rounded-xl text-xs font-bold transition-all duration-300 relative z-50 ${mode === 'manual' ? 'bg-white shadow-md text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    Sélection
                </button>
            </div>

            <button 
                aria-expanded={showFilters}
                aria-controls="filters"
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all glass border relative z-50 ${showFilters ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg' : 'text-slate-600 border-white hover:bg-white'}`}
            >
                <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                Filtres {filteredItems.length < JAZZ_STANDARDS.length && `(${filteredItems.length})`}
            </button>
        </div>

        {showFilters && (
            <fieldset disabled={isSpinning} id="filters" aria-label="Filtres du répertoire" className="mt-4 w-full max-w-4xl glass p-4 sm:p-8 rounded-[2rem] shadow-2xl border-white animate-in slide-in-from-top-4 duration-300 grid grid-cols-1 md:grid-cols-3 gap-8 text-left relative z-[60]">
                <div>
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Styles</h3>
                    <div className="flex flex-wrap gap-1.5">
                        {styles.map(s => (
                            <button
                                aria-pressed={filters.styles.includes(s)}
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
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Tempo</h3>
                    <div className="flex flex-wrap gap-1.5">
                        {tempos.map(t => (
                            <button
                                aria-pressed={filters.tempo.includes(t)}
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
                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Complexité</h3>
                        <div className="flex flex-wrap gap-1.5">
                            {complexities.map(c => (
                                <button
                                    aria-pressed={filters.complexity.includes(c)}
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
            </fieldset>
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
              <ResultDialog item={lastResult} onSelect={() => {
                setShowVictory(false);
                onWheelSelect(lastResult);
              }} onClose={() => { setShowVictory(false); setLastResult(null); }} />
            )}
          </div>
        ) : (
          <div className="w-full max-w-4xl space-y-6 animate-in relative z-20">
            <div className="glass p-5 sm:p-10 rounded-[2rem] sm:rounded-[3rem] border-white shadow-xl">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-slate-900">Répertoire ({filteredItems.length})</h2>
              </div>
              
              {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
                  {filteredItems.map(item => (
                    <button
                      aria-pressed={manualSelection?.id === item.id}
                      key={item.id}
                      onClick={() => setManualSelection(item)}
                      className={`text-left p-6 rounded-3xl border transition-all duration-300 ${
                        manualSelection?.id === item.id 
                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-200' 
                        : 'bg-white/50 border-slate-100 text-slate-700 hover:border-indigo-300'
                      }`}
                    >
                      <div className="font-bold text-base leading-tight mb-2 uppercase tracking-tight">{item.title}</div>
                      <div className={`text-xs font-bold uppercase tracking-widest ${manualSelection?.id === item.id ? 'text-indigo-200' : 'text-slate-500'}`}>
                        {item.tags.styles[0]} • {item.tags.tempo}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center text-slate-500 italic font-medium">
                  Aucun standard ne correspond à vos filtres.
                </div>
              )}
            </div>

            {manualSelection && (
              <div className="glass p-5 sm:p-10 rounded-[2rem] sm:rounded-[3rem] border-indigo-100 text-center shadow-2xl animate-in flex flex-col items-center">
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
      
      <footer className="mt-8 text-center text-[10px] font-bold text-slate-500 uppercase tracking-widest py-4 shrink-0 relative z-10">
         Conservatoire de Montélimar • Jazz Wheel Pro
      </footer>
    </div>
  );
};

export default WheelPage;
