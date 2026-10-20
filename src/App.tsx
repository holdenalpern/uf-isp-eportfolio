import React, { useEffect, useState } from 'react';
import { Layers, Sparkles } from 'lucide-react';
import { Concept1SwissLab } from './concepts/Concept1SwissLab';
import { Concept2Documentary } from './concepts/Concept2Documentary';
import { Concept3FieldAtlas } from './concepts/Concept3FieldAtlas';
import { Concept4MuseumFolio } from './concepts/Concept4MuseumFolio';

const CONCEPTS = [
  {
    id: 1,
    name: '1. Swiss Lab & Stratigraphy',
    styleTag: 'Core D + A • Style A Top Rubric Nav + Drawer',
  },
  {
    id: 2,
    name: '2. Expedition Documentary',
    styleTag: 'Core E + C • Style C Scrollytelling + Sticky Bar',
  },
  {
    id: 3,
    name: '3. Global Field Atlas',
    styleTag: 'Core C + D • Interactive SVG Map + Bento Hybrid',
  },
  {
    id: 4,
    name: '4. Naturalist Folio & Museum',
    styleTag: 'Core F + E • Archival Chapters + Exhibit Plaques',
  },
] as const;

export function App() {
  const [activeConcept, setActiveConcept] = useState<1 | 2 | 3 | 4>(1);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === '1') setActiveConcept(1);
      if (e.key === '2') setActiveConcept(2);
      if (e.key === '3') setActiveConcept(3);
      if (e.key === '4') setActiveConcept(4);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen">
      {activeConcept === 1 && <Concept1SwissLab />}
      {activeConcept === 2 && <Concept2Documentary />}
      {activeConcept === 3 && <Concept3FieldAtlas />}
      {activeConcept === 4 && <Concept4MuseumFolio />}

      {/* Floating Concept Switcher HUD */}
      <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 w-[95%] max-w-4xl rounded-2xl border border-white/20 bg-slate-950/90 p-2.5 text-white shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 px-2 text-xs font-mono-tech text-slate-300">
            <Layers className="h-4 w-4 text-teal-400 shrink-0" />
            <span className="font-semibold text-white">UI Shell Switcher</span>
            <span className="hidden md:inline text-slate-400">(Press keys 1–4)</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 w-full sm:w-auto">
            {CONCEPTS.map((c) => {
              const selected = activeConcept === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    setActiveConcept(c.id as 1 | 2 | 3 | 4);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`px-3 py-2 rounded-xl text-left transition-all cursor-pointer border ${
                    selected
                      ? 'bg-teal-500 text-slate-950 border-teal-300 font-bold shadow-md'
                      : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="text-xs font-mono-tech truncate">{c.name}</div>
                  <div
                    className={`text-[10px] truncate ${
                      selected ? 'text-slate-900' : 'text-slate-400'
                    }`}
                  >
                    {c.styleTag}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
