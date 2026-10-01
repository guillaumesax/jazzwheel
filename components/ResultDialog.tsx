import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { JazzStandard } from '../types';

export default function ResultDialog({ item, onSelect, onClose }: {
  item: JazzStandard; onSelect: () => void; onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    const previousFocus = document.activeElement;
    dialog?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus();
    };
  }, []);

  return createPortal(
    <dialog ref={ref} aria-labelledby="result-title" onCancel={event => {
      event.preventDefault(); onClose();
    }} className="m-auto w-[calc(100%-2rem)] max-w-3xl max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-[2rem] sm:rounded-[4rem] bg-white p-6 sm:p-12 text-center shadow-2xl">
      <span className="inline-block px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-xs font-black uppercase tracking-widest mb-6">Standard gagnant !</span>
      <h2 id="result-title" className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight break-words">{item.title}</h2>
      <p className="text-slate-600 font-bold mb-8">{item.tags.styles.join(' • ')} • {item.tags.tempo}</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button onClick={onSelect} className="px-6 py-5 rounded-2xl bg-indigo-600 text-white font-black hover:bg-indigo-700">VOIR LES GAMMES</button>
        <button onClick={onClose} className="px-6 py-5 rounded-2xl bg-slate-100 text-slate-700 font-black hover:bg-slate-200">REJOUER</button>
      </div>
    </dialog>, document.body,
  );
}
