
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { JazzStandard } from '../types';

interface WheelProps {
  items: JazzStandard[];
  onResult: (item: JazzStandard) => void;
  isSpinning: boolean;
  setIsSpinning: (s: boolean) => void;
}

const Wheel: React.FC<WheelProps> = ({ items, onResult, isSpinning, setIsSpinning }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);
  const [velocity, setVelocity] = useState(0);

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
      const angle = rotation + i * sliceAngle;
      
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
      
      let fontSize = 16;
      if (items.length > 10) fontSize = 14;
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
  }, [items, rotation]);

  useEffect(() => {
    draw();
  }, [draw]);

  useEffect(() => {
    if (!isSpinning) return;

    let currentRotation = rotation;
    let currentVelocity = velocity;
    const friction = 0.992;
    let rafId: number;

    const animate = () => {
      currentRotation += currentVelocity;
      currentVelocity *= friction;

      if (currentVelocity < 0.0005) {
        setIsSpinning(false);
        const sliceAngle = (2 * Math.PI) / items.length;
        const normalizedRotation = (2 * Math.PI - (currentRotation % (2 * Math.PI))) % (2 * Math.PI);
        const selectedIndex = Math.floor(normalizedRotation / sliceAngle);
        onResult(items[selectedIndex]);
        return;
      }

      setRotation(currentRotation);
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isSpinning, items, onResult, setIsSpinning, velocity]);

  const spin = () => {
    if (isSpinning || items.length === 0) return;
    const initialVelocity = 0.25 + Math.random() * 0.25;
    setVelocity(initialVelocity);
    setIsSpinning(true);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl relative z-10">
      <div className="relative w-full aspect-square max-w-[650px] flex items-center justify-center">
        {/* Halo atmosphérique */}
        <div className="absolute inset-0 bg-indigo-500/5 blur-[120px] rounded-full scale-150 pointer-events-none"></div>
        
        <canvas 
          ref={canvasRef} 
          width={800} 
          height={800} 
          className="relative w-full h-full rounded-full shadow-[0_30px_70px_rgba(0,0,0,0.08)] transition-transform duration-700"
        />
        
        {/* Needle Indicator */}
        <div className="absolute top-1/2 -right-6 -translate-y-1/2 z-10">
            <div className="w-14 h-14 bg-indigo-600 rotate-45 rounded-md shadow-2xl border-8 border-white flex items-center justify-center">
               <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
        </div>

        {/* Bouton Central GO */}
        <button
          onClick={spin}
          disabled={isSpinning || items.length === 0}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full font-black text-2xl shadow-[0_10px_30px_rgba(79,70,229,0.4)] transition-all transform active:scale-90 z-20 flex items-center justify-center border-4 border-white ${
            isSpinning || items.length === 0 
            ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none' 
            : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105'
          }`}
        >
          {isSpinning ? '...' : 'GO'}
        </button>
      </div>
    </div>
  );
};

export default Wheel;
