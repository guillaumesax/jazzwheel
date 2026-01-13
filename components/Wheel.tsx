
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

  // Modern soft palette
  const colors = ['#eff6ff', '#e0e7ff', '#f5f3ff', '#fae8ff'];

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvas.width;
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2 - 20;

    ctx.clearRect(0, 0, size, size);

    if (items.length === 0) {
      ctx.fillStyle = '#94a3b8';
      ctx.font = '600 16px "Plus Jakarta Sans"';
      ctx.textAlign = 'center';
      ctx.fillText('Aucun standard', centerX, centerY);
      return;
    }

    const sliceAngle = (2 * Math.PI) / items.length;

    items.forEach((item, i) => {
      const angle = rotation + i * sliceAngle;
      
      // Draw slice
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, angle, angle + sliceAngle);
      ctx.closePath();
      ctx.fillStyle = colors[i % colors.length];
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw text
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(angle + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#1e1b4b';
      ctx.font = items.length > 15 ? '700 10px "Plus Jakarta Sans"' : '700 12px "Plus Jakarta Sans"';
      ctx.fillText(item.title.length > 20 ? item.title.slice(0, 18) + '...' : item.title, radius - 30, 5);
      ctx.restore();
    });

    // Outer shadow ring
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.lineWidth = 10;
    ctx.stroke();

    // Center Hub
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 3;
    ctx.stroke();

  }, [items, rotation]);

  useEffect(() => {
    draw();
  }, [draw]);

  useEffect(() => {
    if (!isSpinning) return;

    let currentRotation = rotation;
    let currentVelocity = velocity;
    const friction = 0.99;
    let rafId: number;

    const animate = () => {
      currentRotation += currentVelocity;
      currentVelocity *= friction;

      if (currentVelocity < 0.001) {
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
    const initialVelocity = 0.2 + Math.random() * 0.3;
    setVelocity(initialVelocity);
    setIsSpinning(true);
  };

  return (
    <div className="flex flex-col items-center gap-10">
      <div className="relative">
        <div className="absolute -inset-4 bg-indigo-500/10 blur-3xl rounded-full"></div>
        <canvas 
          ref={canvasRef} 
          width={440} 
          height={440} 
          className="relative max-w-full h-auto rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-transform duration-700"
        />
        {/* Needle Indicator */}
        <div className="absolute top-1/2 -right-4 -translate-y-1/2 flex items-center">
            <div className="w-10 h-10 bg-indigo-600 rotate-45 rounded-sm shadow-xl border-4 border-white"></div>
        </div>
      </div>
      
      <button
        onClick={spin}
        disabled={isSpinning || items.length === 0}
        className={`px-16 py-5 rounded-3xl font-extrabold text-xl shadow-2xl transition-all transform active:scale-95 tracking-tight ${
          isSpinning || items.length === 0 
          ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none' 
          : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-300/50'
        }`}
      >
        {isSpinning ? 'EN ROTATION...' : 'SPIN'}
      </button>
    </div>
  );
};

export default Wheel;
