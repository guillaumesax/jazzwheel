
import React, { useState, useEffect } from 'react';
import WheelPage from './pages/WheelPage';
import ScalesPage from './pages/ScalesPage';
import { JazzStandard } from './types';
import { JAZZ_STANDARDS } from './data/tunes';

const App: React.FC = () => {
  const [selectedStandard, setSelectedStandard] = useState<JazzStandard | null>(null);

  useEffect(() => {
    // Basic persistent storage for the current session's selected standard
    const savedId = localStorage.getItem('last_selected_id');
    if (savedId) {
      const found = JAZZ_STANDARDS.find(s => s.id === savedId);
      if (found) setSelectedStandard(found);
    }
  }, []);

  const handleSelect = (item: JazzStandard) => {
    setSelectedStandard(item);
    localStorage.setItem('last_selected_id', item.id);
  };

  const handleBack = () => {
    setSelectedStandard(null);
    localStorage.removeItem('last_selected_id');
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {selectedStandard ? (
        <ScalesPage item={selectedStandard} onBack={handleBack} />
      ) : (
        <WheelPage onSelect={handleSelect} />
      )}
      
      <style>{`
        @keyframes bounce-short {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-short {
          animation: bounce-short 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default App;
