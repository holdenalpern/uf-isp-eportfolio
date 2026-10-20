import React, { useState } from 'react';
import {
  Compass,
  FileText,
  Globe2,
  Layers,
  MapPin,
  Maximize2,
  Microscope,
  Navigation,
  Sparkles,
} from 'lucide-react';
import {
  ExperienceShellItem,
  FINAL_REFLECTION_SHELL,
  GLOBAL_EXPERIENCES_SHELL,
  NACE_SKILLS_SHELL,
  PROFILE_SHELL,
  REYKJAVIK_POSTER_SHELL,
  RESUME_TIMELINE_SHELL,
  RUBRIC_SECTIONS,
  RubricSectionId,
} from '../data/shellData';
import { ExperienceVisualHeader } from '../components/CuratedVisuals';

/**
 * CONCEPT 3: "Global Field Atlas"
 * - Aesthetic: Core C (Interactive Cartographic Atlas) + D (Data-Clean Bento Grid)
 * - Navigation: Hybrid A/C — Split-Pane Interactive Map + Rubric Bento Filter
 */
export const Concept3FieldAtlas: React.FC = () => {
  const [selectedExp, setSelectedExp] = useState<ExperienceShellItem>(GLOBAL_EXPERIENCES_SHELL[0]);
  const [activeRubricFocus, setActiveRubricFocus] = useState<RubricSectionId | 'all'>('all');
  const [activeStarStep, setActiveStarStep] = useState<'situation' | 'task' | 'action' | 'resolution'>('situation');

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 pb-28">
      {/* Top Command Bar */}
      <header className="sticky top-0 z-30 border-b border-slate-800 bg-[#0F172A]/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-emerald-300">
              <Globe2 className="h-4 w-4" />
            </div>
            <div>
              <span className="font-mono-tech text-xs uppercase tracking-wider text-emerald-400 font-semibold block">
                CONCEPT 03 // GLOBAL FIELD ATLAS & BENTO WORKSPACE
              </span>
              <span className="text-xs text-slate-400">
                Hybrid Nav: Filter Bento by ISP Rubric or Click Geographic Pins
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setActiveRubricFocus('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono-tech cursor-pointer border transition-all ${
                activeRubricFocus === 'all'
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold'
                  : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500'
              }`}
            >
              All Bento Modules
            </button>
            {RUBRIC_SECTIONS.map((sec) => (
              <button
                key={sec.id}
                onClick={() => setActiveRubricFocus(sec.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono-tech cursor-pointer border transition-all ${
                  activeRubricFocus === sec.id
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold'
                    : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500'
                }`}
              >
                {sec.shortLabel}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8 space-y-6">
        {/* TOP BENTO ROW: Interactive Cartographic Map + Selected Pin Inspector */}
        {(activeRubricFocus === 'all' ||
          activeRubricFocus === 'home' ||
          activeRubricFocus === 'experiences') && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Interactive World Map Canvas */}
            <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 flex flex-col justify-between relative overflow-hidden">
              <div className="flex items-center justify-between z-10">
                <div>
                  <span className="text-[11px] font-mono-tech uppercase text-emerald-400">
                    INTERACTIVE CARTOGRAPHIC INDEX • CLICK ANY PIN
                  </span>
                  <h2 className="font-display-grotesk text-2xl font-bold text-white mt-0.5">
                    {PROFILE_SHELL.name}’s Global & UF Field Coordinates
                  </h2>
                </div>
                <span className="text-xs font-mono-tech text-slate-400">6 ACTIVE STATIONS</span>
              </div>

              {/* Stylized SVG World Map + Coordinate Grid */}
              <div className="relative my-6 aspect-[16/9] w-full rounded-xl border border-slate-800 bg-[#090E1A] overflow-hidden">
                {/* Lat/Long Grid Lines */}
                <svg className="absolute inset-0 h-full w-full opacity-25" viewBox="0 0 800 450" fill="none">
                  {[90, 180, 270, 360].map((y) => (
                    <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="#334155" strokeDasharray="4 4" />
                  ))}
                  {[160, 320, 480, 640].map((x) => (
                    <line key={x} x1={x} y1="0" x2={x} y2="450" stroke="#334155" strokeDasharray="4 4" />
                  ))}
                  {/* Stylized Continental Silhouettes */}
                  {/* North America */}
                  <path
                    d="M80 70 L230 60 L250 160 L190 210 L140 190 Z"
                    fill="#1E293B"
                    stroke="#475569"
                  />
                  {/* South America */}
                  <path
                    d="M210 230 L310 250 L290 390 L230 410 L200 290 Z"
                    fill="#1E293B"
                    stroke="#475569"
                  />
                  {/* Iceland */}
                  <path d="M330 70 L365 65 L368 88 L332 90 Z" fill="#1E293B" stroke="#38BDF8" />
                  {/* Europe & Africa */}
                  <path
                    d="M380 80 L510 75 L540 200 L490 380 L420 375 L385 210 Z"
                    fill="#1E293B"
                    stroke="#475569"
                  />
                  {/* Flight Arcs from Gainesville UF (25%, 38%) */}
                  {GLOBAL_EXPERIENCES_SHELL.map((exp) => (
                    <line
                      key={exp.id}
                      x1="200"
                      y1="171"
                      x2={exp.mapX * 8}
                      y2={exp.mapY * 4.5}
                      stroke={selectedExp.id === exp.id ? '#10B981' : '#38BDF8'}
                      strokeWidth={selectedExp.id === exp.id ? '2' : '1'}
                      strokeDasharray="3 3"
                      opacity={selectedExp.id === exp.id ? '0.9' : '0.35'}
                    />
                  ))}
                </svg>

                {/* Interactive Pin Buttons */}
                {GLOBAL_EXPERIENCES_SHELL.map((exp) => {
                  const isSelected = selectedExp.id === exp.id;
                  return (
                    <button
                      key={exp.id}
                      onClick={() => setSelectedExp(exp)}
                      style={{ left: `${exp.mapX}%`, top: `${exp.mapY}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-all ${
                        isSelected ? 'z-20 scale-110' : 'z-10 hover:scale-110'
                      }`}
                    >
                      <span
                        className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-mono-tech font-semibold shadow-lg border ${
                          isSelected
                            ? 'bg-emerald-400 text-slate-950 border-white'
                            : exp.hasPersonalPhotos
                            ? 'bg-cyan-950/90 text-cyan-200 border-cyan-400/50'
                            : 'bg-slate-900/90 text-slate-200 border-slate-600'
                        }`}
                      >
                        <MapPin className="h-3 w-3 shrink-0" />
                        <span className=" whitespace-nowrap">{exp.location.split(',')[0]}</span>
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Pin Selector Pills */}
              <div className="flex flex-wrap gap-2">
                {GLOBAL_EXPERIENCES_SHELL.map((exp) => (
                  <button
                    key={exp.id}
                    onClick={() => setSelectedExp(exp)}
                    className={`px-2.5 py-1 rounded text-xs font-mono-tech cursor-pointer border ${
                      selectedExp.id === exp.id
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                        : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    {exp.location.split('→').pop()?.trim()}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Selected Pin Inspector Card */}
            <div className="lg:col-span-5 rounded-2xl border border-emerald-500/30 bg-slate-900/95 p-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono-tech text-emerald-400">
                  <span>ACTIVE ATLAS PIN // {selectedExp.category.toUpperCase()}</span>
                  <span>{selectedExp.coordinates}</span>
                </div>

                <ExperienceVisualHeader item={selectedExp} variant="atlas" />

                <div>
                  <h3 className="font-display-grotesk text-2xl font-bold text-white">
                    {selectedExp.title}
                  </h3>
                  <p className="text-xs font-mono-tech text-slate-400 mt-1">
                    {selectedExp.subtitle} • {selectedExp.date}
                  </p>
                  <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                    {selectedExp.summaryPlaceholder}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap gap-1.5">
                {selectedExp.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-slate-800 px-2.5 py-1 text-[11px] font-mono-tech text-emerald-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECOND BENTO ROW: Home/About Summary + Reykjavik Poster Viewer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {(activeRubricFocus === 'all' ||
            activeRubricFocus === 'home' ||
            activeRubricFocus === 'about') && (
            <div className="lg:col-span-6 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono-tech text-cyan-400">
                <span>01. HOME & 02. ABOUT ME BENTO MODULE</span>
                <span>B.S. GEOLOGY + MICROBIOLOGY | HISTORY MINOR</span>
              </div>
              <h3 className="font-display-grotesk text-2xl font-bold">{PROFILE_SHELL.tagline}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {PROFILE_SHELL.homeIntroPlaceholder}
              </p>
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300">
                <strong className="font-mono-tech text-emerald-400 block mb-1">
                  ABOUT ME SUMMARY (&lt; 400W SLOT):
                </strong>
                {PROFILE_SHELL.aboutPlaceholder}
              </div>
            </div>
          )}

          {(activeRubricFocus === 'all' || activeRubricFocus === 'resume') && (
            <div className="lg:col-span-6 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/40 via-slate-900 to-slate-900 p-6 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono-tech text-cyan-300">
                <span>03. REYKJAVIK RESEARCH POSTER & INTERACTIVE CV</span>
                <span>ICELAND 2025</span>
              </div>
              <h3 className="font-display-grotesk text-xl font-bold">
                {REYKJAVIK_POSTER_SHELL.title}
              </h3>
              <div className="grid grid-cols-2 gap-2.5">
                {REYKJAVIK_POSTER_SHELL.sections.map((sec) => (
                  <div key={sec.label} className="rounded-lg border border-slate-700 bg-slate-950/60 p-3">
                    <div className="font-mono-tech text-xs font-semibold text-cyan-300">
                      {sec.label}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">{sec.detail}</p>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono-tech text-slate-400">
                <span>+ Interactive Resume Timeline (3 Eras)</span>
                <span className="text-emerald-400">PDF Resume Button Ready →</span>
              </div>
            </div>
          )}
        </div>

        {/* THIRD BENTO ROW: Interactive S-T-A-R Competency Matrix + Final Reflection */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {(activeRubricFocus === 'all' || activeRubricFocus === 'skills') && (
            <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-mono-tech text-emerald-400">
                  04. NACE COMPETENCIES MATRIX — CLICK S / T / A / R STAGE
                </span>
                <div className="flex gap-1">
                  {(['situation', 'task', 'action', 'resolution'] as const).map((step) => (
                    <button
                      key={step}
                      onClick={() => setActiveStarStep(step)}
                      className={`px-2.5 py-1 rounded text-xs font-mono-tech uppercase cursor-pointer ${
                        activeStarStep === step
                          ? 'bg-emerald-400 text-slate-950 font-bold'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {step[0]} — {step}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {NACE_SKILLS_SHELL.map((skill) => (
                  <div
                    key={skill.id}
                    className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-2"
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono-tech text-emerald-400">
                      <span>{skill.badgeCode}</span>
                      <span className="uppercase">{activeStarStep}</span>
                    </div>
                    <h4 className="font-display-grotesk font-bold text-base">{skill.competency}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {skill.star[activeStarStep]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(activeRubricFocus === 'all' || activeRubricFocus === 'reflection') && (
            <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-mono-tech text-amber-400">
                  06. FINAL REFLECTION (700+ WORDS)
                </span>
                <h3 className="font-display-grotesk text-2xl font-bold">
                  {FINAL_REFLECTION_SHELL.title}
                </h3>
                <p className="text-xs italic text-amber-200/90 border-l-2 border-amber-400 pl-3">
                  “{FINAL_REFLECTION_SHELL.leadPullQuote}”
                </p>
                <div className="space-y-2 pt-2">
                  {FINAL_REFLECTION_SHELL.pillars.map((p) => (
                    <div key={p.heading} className="rounded-lg bg-slate-950/60 p-3 border border-slate-800">
                      <div className="text-xs font-semibold text-white">{p.heading}</div>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{p.summary}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
