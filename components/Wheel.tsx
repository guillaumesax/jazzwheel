
import React, { useRef, useEffect, useCallback } from 'react';
import type { JazzStandard } from '../types';
import { normalizeAngle, rotationForIndex } from '../utils/wheelUtils';

interface WheelProps {
  items: JazzStandard[];
  onResult: (item: JazzStandard) => void;
  isSpinning: boolean;
  setIsSpinning: (s: boolean) => void;
}

const Wheel: React.FC<WheelProps> = ({ items, onResult, isSpinning, setIsSpinning }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotationRef = useRef(0);
  const animationRef = useRef<Animation | null>(null);
  const spinningRef = useRef(false);

  const colors = ['#eff6ff', '#e0e7ff', '#f5f3ff', '#fae8ff'];

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvas.width;
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2 - 30;

    ctx.clearRect(0, 0, size, size);

    if (items.length === 0) {
      ctx.fillStyle = '#94a3b8';
      ctx.font = '700 20px "Plus Jakarta Sans"';
      ctx.textAlign = 'center';
      ctx.fillText('Aucun standard', centerX, centerY);
      return;
    }

    const sliceAngle = (2 * Math.PI) / items.length;

    items.forEach((item, i) => {
      const angle = i * sliceAngle;
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, angle, angle + sliceAngle);
      ctx.closePath();
      ctx.fillStyle = colors[i % colors.length];
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(angle + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#1e1b4b';
      
      let fontSize = 22;
      if (items.length > 10) fontSize = 20;
      if (items.length > 20) fontSize = 12;
      if (items.length > 30) fontSize = 10;
      
      ctx.font = `800 ${fontSize}px "Plus Jakarta Sans"`;
      const textX = radius - 40;
      const displayTitle = item.title.length > 22 ? item.title.slice(0, 20) + '...' : item.title;
      ctx.fillText(displayTitle.toUpperCase(), textX, fontSize / 3);
      ctx.restore();
    });

    // Bordure extérieure décorative
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.03)';
    ctx.lineWidth = 15;
    ctx.stroke();

    // On ne dessine plus le hub central dans le canvas car le bouton DOM va le remplacer
  }, [items]);

  useEffect(() => {
    draw();
    let active = true;
    void document.fonts.ready.then(() => { if (active) draw(); });
    return () => { active = false; };
  }, [draw]);

  useEffect(() => () => {
    animationRef.current?.cancel();
  }, []);

  const spin = () => {
    const canvas = canvasRef.current;
    if (!canvas || spinningRef.current || isSpinning || !items.length) return;
    spinningRef.current = true;
    setIsSpinning(true);
    const selectedIndex = Math.floor(Math.random() * items.length);
    const result = items[selectedIndex];
    const start = rotationRef.current;
    const end = rotationForIndex(selectedIndex, items.length, start);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const animation = canvas.animate([
      { transform: `rotate(${start}rad)` },
      { transform: `rotate(${end}rad)` },
    ], { duration: reducedMotion ? 1 : 4200, easing: 'cubic-bezier(0.12, 0.75, 0.15, 1)' });
    animationRef.current = animation;
    animation.onfinish = () => {
      rotationRef.current = normalizeAngle(end);
      canvas.style.transform = `rotate(${rotationRef.current}rad)`;
      animationRef.current = null;
      spinningRef.current = false;
      setIsSpinning(false);
      onResult(result);
    };
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl relative z-10">
      <div className="wheel-frame relative w-full aspect-square max-w-[650px] flex items-center justify-center">
        {/* Halo atmosphérique */}
        <div className="absolute inset-0 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none"></div>
        
        <canvas 
          role="img"
          aria-label={`Roue de tirage au sort : ${items.length} standards disponibles. La sélection complète est accessible dans le mode Sélection.`}
          ref={canvasRef} 
          width={800} 
          height={800} 
          className="relative w-full h-full rounded-full shadow-[0_30px_70px_rgba(0,0,0,0.08)] "
        />
        
        {/* Needle Indicator */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 z-10">
            <div className="w-10 h-10 sm:w-14 sm:h-14 bg-indigo-600 rotate-45 rounded-md shadow-2xl border-4 sm:border-8 border-white flex items-center justify-center">
               <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
        </div>

        {/* Bouton Central GO */}
        <button
          aria-label={isSpinning ? "Tirage en cours" : "Lancer la roue"}
          onClick={spin}
          disabled={isSpinning || items.length === 0}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full font-black text-2xl shadow-[0_10px_30px_rgba(79,70,229,0.4)] transition-all transform active:scale-90 z-20 flex items-center justify-center border-4 border-white ${
            isSpinning || items.length === 0 
            ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none' 
            : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105'
          }`}
        >
          {isSpinning ? '…' : 'GO'}
        </button>
      </div>
      <p role="status" className="mt-4 text-sm text-slate-600 text-center">
        {isSpinning ? "Tirage en cours…" : items.length ? `${items.length} standards disponibles` : "Aucun standard ne correspond à vos filtres. Réinitialisez-les pour rejouer."}
      </p>
    </div>
  );
};

export default Wheel;
