import { lazy, Suspense, useEffect, useState } from 'react';
import WheelPage from './pages/WheelPage';
import type { JazzStandard } from './types';
import { JAZZ_STANDARDS } from './data/tunes';
import { readStorage, writeStorage } from './utils/storage';

const ScalesPage = lazy(() => import('./pages/ScalesPage'));
const fromHash = () => JAZZ_STANDARDS.find(item => window.location.hash === `#standard/${item.id}`) ?? null;

export default function App() {
  const [selectedStandard, setSelectedStandard] = useState<JazzStandard | null>(() => {
    if (window.location.hash) return fromHash();
    return JAZZ_STANDARDS.find(item => item.id === readStorage('last_selected_id')) ?? null;
  });

  useEffect(() => {
    const update = () => {
      const item = fromHash();
      setSelectedStandard(item);
      writeStorage('last_selected_id', item?.id ?? null);
    };
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);

  useEffect(() => {
    if (selectedStandard && !window.location.hash) {
      window.history.replaceState(null, '', `#standard/${selectedStandard.id}`);
    }
  }, [selectedStandard]);

  const handleSelect = (item: JazzStandard) => {
    writeStorage('last_selected_id', item.id);
    window.location.hash = `standard/${item.id}`;
    setSelectedStandard(item);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    writeStorage('last_selected_id', null);
    setSelectedStandard(null);
    window.location.hash = '';
    requestAnimationFrame(() => document.querySelector<HTMLElement>('#wheel-title')?.focus());
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div hidden={selectedStandard !== null}>
        <WheelPage onSelect={handleSelect} />
      </div>
      {selectedStandard && (
        <Suspense fallback={<p role="status" className="p-8 text-center">Chargement des gammes…</p>}>
          <ScalesPage item={selectedStandard} onBack={handleBack} />
        </Suspense>
      )}
    </div>
  );
}
