import { lazy, Suspense, useEffect, useState } from 'react';
import WheelPage from './pages/WheelPage';
import type { JazzStandard } from './types';
import { JAZZ_STANDARDS } from './data/tunes';
import { readStorage, writeStorage } from './utils/storage';

const ProjectionPage = lazy(() => import('./pages/ProjectionPage'));
const fromHash = () => JAZZ_STANDARDS.find(item => window.location.hash === `#standard/${item.id}` || window.location.hash === `#projection/${item.id}`) ?? null;

export default function App() {
  const [selectedStandard, setSelectedStandard] = useState<JazzStandard | null>(() => {
    if (window.location.hash) return fromHash();
    return null;
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

  const handleSelect = (item: JazzStandard) => {
    writeStorage('last_selected_id', item.id);
    window.location.hash = `projection/${item.id}`;
    setSelectedStandard(item);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    writeStorage('last_selected_id', null);
    setSelectedStandard(null);
    window.location.hash = '';
    requestAnimationFrame(() => document.querySelector<HTMLElement>('#wheel-title')?.focus());
  };

  const handleProjectionSelect = (item: JazzStandard) => {
    writeStorage('last_selected_id', item.id);
    window.location.hash = `projection/${item.id}`;
    setSelectedStandard(item);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div hidden={selectedStandard !== null}>
        <WheelPage onSelect={handleSelect} />
      </div>
      {selectedStandard && (
        <Suspense fallback={<p role="status" className="p-8 text-center">Chargement de la projection…</p>}>
          <ProjectionPage item={selectedStandard} onBack={handleBack} onSelect={handleProjectionSelect} />
        </Suspense>
      )}
    </div>
  );
}
