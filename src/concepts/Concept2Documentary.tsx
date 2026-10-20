import React, { useState } from 'react';
import {
  ArrowUpRight,
  Camera,
  Compass,
  FileDown,
  MapPin,
  Mountain,
  Sparkles,
} from 'lucide-react';
import {
  FINAL_REFLECTION_SHELL,
  GLOBAL_EXPERIENCES_SHELL,
  NACE_SKILLS_SHELL,
  PROFILE_SHELL,
  REYKJAVIK_POSTER_SHELL,
  RESUME_TIMELINE_SHELL,
  RUBRIC_SECTIONS,
} from '../data/shellData';
import { ExperienceVisualHeader, TopographicPattern } from '../components/CuratedVisuals';

/**
 * CONCEPT 2: "Expedition Documentary"
 * - Aesthetic: Core E (Dark Cinematic Photo-First Documentary) + C (Cartographic Coordinates)
 * - Navigation: Style C — Single-Page Scrollytelling Narrative with Sticky Chapter Rubric Bar
 */
export const Concept2Documentary: React.FC = () => {
  const [activeStarSkill, setActiveStarSkill] = useState<string>(NACE_SKILLS_SHELL[0].id);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(`c2-${id}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-[#0B0F14] text-slate-100 pb-28 selection:bg-amber-400/30">
      {/* Sticky Scrollytelling Chapter Bar (Navigation Style C) */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0B0F14]/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-mono-tech text-xs uppercase tracking-widest text-amber-300">
              CONCEPT 02 // EXPEDITION DOCUMENTARY (SCROLLYTELLING)
            </span>
          </div>

          <nav className="flex flex-wrap items-center gap-1">
            {RUBRIC_SECTIONS.map((sec) => (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className="px-3 py-1.5 rounded-full text-xs font-mono-tech text-slate-300 hover:text-amber-300 hover:bg-white/5 transition-colors cursor-pointer"
              >
                {sec.shortLabel}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 space-y-24 pt-12">
        {/* CHAPTER 01: HOME (Full-Bleed Documentary Hero) */}
        <section id="c2-home" className="scroll-mt-24">
          <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-slate-900 via-[#0F1722] to-amber-950/30 p-8 sm:p-14">
            <TopographicPattern className="absolute inset-0 h-full w-full text-cyan-400/10" />
            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-3.5 py-1 text-xs font-mono-tech text-amber-300">
                <Compass className="h-3.5 w-3.5" />
                CHAPTER 01 • HOME // 29.6516° N, 82.3248° W → GLOBAL
              </div>
              <h1 className="mt-6 font-serif-editorial text-4xl sm:text-6xl font-semibold tracking-tight text-white leading-[1.08]">
                {PROFILE_SHELL.tagline}
              </h1>
              <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed">
                {PROFILE_SHELL.homeIntroPlaceholder}
              </p>
              <blockquote className="mt-6 border-l-2 border-amber-400 pl-4 font-serif-editorial italic text-xl text-amber-200/90">
                {PROFILE_SHELL.quote}
              </blockquote>
            </div>

            {/* Dual Cinematic Photo Reel Slots */}
            <div className="relative z-10 mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-cyan-400/30 bg-cyan-950/30 p-6 backdrop-blur-xs">
                <div className="flex items-center justify-between text-xs font-mono-tech text-cyan-300">
                  <span>FIELD REEL A • REYKJAVIK, ICELAND</span>
                  <span>64.1466° N, 21.9426° W</span>
                </div>
                <p className="mt-3 font-display-grotesk text-lg font-semibold">
                  [Cinematic Wide Photo Slot: Waterfall & Research Conference]
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Designed for high-contrast landscape & conference photography from Iceland.
                </p>
              </div>
              <div className="rounded-xl border border-amber-400/30 bg-amber-950/30 p-6 backdrop-blur-xs">
                <div className="flex items-center justify-between text-xs font-mono-tech text-amber-300">
                  <span>FIELD REEL B • BOGOTÁ & SUESCA, COLOMBIA</span>
                  <span>4.7110° N, 74.0721° W</span>
                </div>
                <p className="mt-3 font-display-grotesk text-lg font-semibold">
                  [Cinematic Wide Photo Slot: Suesca Sandstone & Family Finca]
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Designed for warm documentary photography from your week in Colombia.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CHAPTER 02: ABOUT ME */}
        <section id="c2-about" className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 rounded-2xl border border-white/15 bg-slate-900/70 p-8">
            <div className="aspect-[4/4] rounded-xl border border-dashed border-amber-400/40 bg-black/40 flex flex-col items-center justify-center p-6 text-center">
              <Camera className="h-9 w-9 text-amber-400 mb-3" />
              <span className="font-mono-tech text-xs uppercase text-amber-300">
                Documentary Portrait Slot
              </span>
              <p className="text-xs text-slate-400 mt-2">
                Holden • B.S. Geology & B.S. Microbiology • Minor in History
              </p>
            </div>
          </div>
          <div className="lg:col-span-7 space-y-5">
            <span className="font-mono-tech text-xs uppercase tracking-widest text-amber-400">
              CHAPTER 02 • ABOUT ME (&lt; 400 WORDS)
            </span>
            <h2 className="font-serif-editorial text-4xl font-semibold">
              Where Subsurface Earth Meets Lived History
            </h2>
            <p className="text-slate-300 leading-relaxed">{PROFILE_SHELL.aboutPlaceholder}</p>
            <div className="flex flex-wrap gap-2 pt-2">
              {PROFILE_SHELL.hobbies.map((hobby) => (
                <span
                  key={hobby}
                  className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-mono-tech text-slate-200"
                >
                  {hobby}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CHAPTER 03: RESUME & REYKJAVIK POSTER */}
        <section id="c2-resume" className="scroll-mt-24 space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="font-mono-tech text-xs uppercase tracking-widest text-cyan-400">
                CHAPTER 03 • CURRICULUM VITAE & REYKJAVIK RESEARCH POSTER
              </span>
              <h2 className="font-serif-editorial text-4xl font-semibold mt-1">
                Academic & Field Dossier
              </h2>
            </div>
            <button className="inline-flex items-center gap-2 rounded-full border border-amber-400/50 bg-amber-400/10 px-4 py-2 text-xs font-mono-tech text-amber-300">
              <FileDown className="h-4 w-4" />
              Download Resume PDF (Slot)
            </button>
          </div>

          {/* Reykjavik Poster Dark Showcase */}
          <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 via-slate-900 to-slate-900 p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono-tech text-cyan-300">
                  <Sparkles className="h-3.5 w-3.5" />
                  REYKJAVIK INTERNATIONAL RESEARCH CONFERENCE SHOWCASE
                </span>
                <h3 className="font-display-grotesk text-2xl font-bold text-white">
                  {REYKJAVIK_POSTER_SHELL.title}
                </h3>
                <p className="text-sm text-slate-300">{REYKJAVIK_POSTER_SHELL.abstractPlaceholder}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 shrink-0">
                {REYKJAVIK_POSTER_SHELL.sections.map((s) => (
                  <div key={s.label} className="rounded-lg border border-white/10 bg-black/40 p-3">
                    <div className="text-[11px] font-mono-tech text-cyan-300">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {RESUME_TIMELINE_SHELL.map((item) => (
              <div key={item.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                <div className="text-xs font-mono-tech text-amber-400">{item.period}</div>
                <h4 className="font-display-grotesk text-lg font-bold mt-1">{item.role}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{item.org}</p>
                <p className="text-xs text-slate-300 mt-3 leading-relaxed">{item.highlights[0]}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CHAPTER 04: NACE SKILLS (Interactive Tabbed Matrix) */}
        <section id="c2-skills" className="scroll-mt-24 space-y-6">
          <div>
            <span className="font-mono-tech text-xs uppercase tracking-widest text-amber-400">
              CHAPTER 04 • NACE COMPETENCIES (STAR METHOD)
            </span>
            <h2 className="font-serif-editorial text-4xl font-semibold mt-1">
              4 Core Competencies Forged in the Field
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 space-y-2">
              {NACE_SKILLS_SHELL.map((skill) => {
                const selected = skill.id === activeStarSkill;
                return (
                  <button
                    key={skill.id}
                    onClick={() => setActiveStarSkill(skill.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                      selected
                        ? 'border-amber-400 bg-amber-400/10 text-white'
                        : 'border-white/10 bg-white/[0.02] text-slate-400 hover:border-white/30'
                    }`}
                  >
                    <div className="text-[11px] font-mono-tech text-amber-300">{skill.badgeCode}</div>
                    <div className="font-display-grotesk font-bold text-base mt-0.5">
                      {skill.competency}
                    </div>
                    <div className="text-xs opacity-75 mt-1">{skill.contextTitle}</div>
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-7 rounded-2xl border border-white/15 bg-slate-900/80 p-8">
              {NACE_SKILLS_SHELL.filter((s) => s.id === activeStarSkill).map((skill) => (
                <div key={skill.id} className="space-y-4">
                  <div className="border-b border-white/10 pb-4">
                    <span className="font-mono-tech text-xs text-amber-400">
                      STAR METHOD BREAKDOWN
                    </span>
                    <h3 className="font-serif-editorial text-3xl font-semibold mt-1">
                      {skill.competency}
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(skill.star).map(([key, val]) => (
                      <div key={key} className="rounded-xl border border-white/10 bg-black/40 p-4">
                        <div className="font-mono-tech text-xs uppercase text-cyan-300 font-bold">
                          {key}
                        </div>
                        <p className="text-sm text-slate-300 mt-2 leading-relaxed">{val}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CHAPTER 05: GLOBAL EXPERIENCES (Documentary Dispatches) */}
        <section id="c2-experiences" className="scroll-mt-24 space-y-8">
          <div>
            <span className="font-mono-tech text-xs uppercase tracking-widest text-cyan-400">
              CHAPTER 05 • GLOBAL EXPERIENCES (TRAVEL + UF GLOBAL ACTIVITIES)
            </span>
            <h2 className="font-serif-editorial text-4xl font-semibold mt-1">
              Six Dispatches Across Continents & Disciplines
            </h2>
          </div>

          <div className="space-y-6">
            {GLOBAL_EXPERIENCES_SHELL.map((exp, idx) => (
              <div
                key={exp.id}
                className="rounded-2xl border border-white/15 bg-slate-900/50 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
              >
                <div className="lg:col-span-5">
                  <ExperienceVisualHeader item={exp} variant="cinema" />
                </div>
                <div className="lg:col-span-7 space-y-3">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono-tech text-amber-300">
                    <span>DISPATCH 0{idx + 1}</span>
                    <span>•</span>
                    <span>{exp.location}</span>
                    <span>•</span>
                    <span>{exp.date}</span>
                  </div>
                  <h3 className="font-serif-editorial text-2xl sm:text-3xl font-semibold text-white">
                    {exp.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{exp.summaryPlaceholder}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {exp.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-mono-tech text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CHAPTER 06: FINAL REFLECTION */}
        <section id="c2-reflection" className="scroll-mt-24">
          <div className="rounded-2xl border border-amber-400/30 bg-gradient-to-b from-amber-950/20 via-slate-900 to-black p-8 sm:p-14">
            <span className="font-mono-tech text-xs uppercase tracking-widest text-amber-400">
              CHAPTER 06 • FINAL REFLECTION (700+ WORD ESSAY SHELL)
            </span>
            <h2 className="font-serif-editorial text-4xl sm:text-5xl font-semibold mt-2">
              {FINAL_REFLECTION_SHELL.title}
            </h2>
            <p className="mt-6 font-serif-editorial italic text-2xl text-amber-200/90 leading-relaxed">
              “{FINAL_REFLECTION_SHELL.leadPullQuote}”
            </p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {FINAL_REFLECTION_SHELL.pillars.map((pil) => (
                <div key={pil.heading} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                  <h3 className="font-display-grotesk font-bold text-base text-amber-300">
                    {pil.heading}
                  </h3>
                  <p className="text-sm text-slate-300 mt-2 leading-relaxed">{pil.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
