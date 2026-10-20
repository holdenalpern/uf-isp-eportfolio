import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, Compass, Feather, FileText, Stamp } from 'lucide-react';
import {
  FINAL_REFLECTION_SHELL,
  GLOBAL_EXPERIENCES_SHELL,
  NACE_SKILLS_SHELL,
  PROFILE_SHELL,
  REYKJAVIK_POSTER_SHELL,
  RESUME_TIMELINE_SHELL,
  RUBRIC_SECTIONS,
} from '../data/shellData';
import { ExperienceVisualHeader } from '../components/CuratedVisuals';

/**
 * CONCEPT 4: "Naturalist Folio & Museum Archive"
 * - Aesthetic: Core F (Warm Archival / Museum Curation) + E (Editorial Essayist) + A (Field Journal)
 * - Navigation: Hybrid A/C — Sticky Archival Index + Expandable Museum Exhibit Cards (Advisor Summary vs. Full Essay Toggle)
 */
export const Concept4MuseumFolio: React.FC = () => {
  const [expandedExhibits, setExpandedExhibits] = useState<Record<string, boolean>>({
    'colombia-bogota': true,
    'uf-harn-one-world': true,
  });

  const toggleExhibit = (id: string) => {
    setExpandedExhibits((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const jumpTo = (id: string) => {
    const el = document.getElementById(`c4-${id}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-[#F4F0EA] text-[#1C1917] pb-28">
      {/* Archival Masthead */}
      <div className="border-b border-stone-900/15 px-6 py-2.5 text-center font-mono-tech text-[11px] uppercase tracking-widest text-stone-600 bg-[#EBE5DC]">
        CONCEPT 04 // NATURALIST FOLIO & MUSEUM ARCHIVE • BRIDGING EARTH SCIENCE & HUMAN HISTORY
      </div>

      {/* Sticky Editorial Chapter Index */}
      <header className="sticky top-0 z-30 border-b border-stone-900/20 bg-[#F4F0EA]/95 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Feather className="h-5 w-5 text-amber-900" />
            <span className="font-serif-editorial text-2xl font-bold tracking-tight">
              The {PROFILE_SHELL.name} Field & Historical Folio
            </span>
          </div>
          <nav className="flex flex-wrap gap-2">
            {RUBRIC_SECTIONS.map((sec) => (
              <button
                key={sec.id}
                onClick={() => jumpTo(sec.id)}
                className="px-3 py-1 rounded border border-stone-800/20 bg-[#FAF8F5] text-xs font-mono-tech text-stone-800 hover:border-amber-900 hover:bg-amber-900 hover:text-white transition-colors cursor-pointer"
              >
                {sec.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12 space-y-20">
        {/* FOLIO I: HOME & ABOUT ME (Editorial Double-Column Spread) */}
        <section id="c4-home" className="scroll-mt-24 border-b-2 border-stone-900/20 pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-widest text-amber-900">
                <Stamp className="h-3.5 w-3.5" />
                FOLIO I • HOME & INTRODUCTION (&lt; 400 WORDS)
              </div>
              <h1 className="font-serif-editorial text-4xl sm:text-6xl font-semibold leading-[1.06] text-stone-900">
                {PROFILE_SHELL.tagline}
              </h1>
              <p className="text-base leading-relaxed text-stone-700 font-serif-editorial text-xl">
                {PROFILE_SHELL.homeIntroPlaceholder}
              </p>
              <blockquote className="border-l-2 border-amber-900 pl-4 italic font-serif-editorial text-xl text-stone-800">
                {PROFILE_SHELL.quote}
              </blockquote>
            </div>

            <div id="c4-about" className="lg:col-span-5 rounded-lg border border-stone-800/20 bg-[#FAF8F5] p-6 space-y-4">
              <div className="text-xs font-mono-tech uppercase tracking-wider text-stone-500 border-b border-stone-300 pb-2">
                CURATORIAL BIO • 02. ABOUT ME (&lt; 400 WORDS)
              </div>
              <div className="aspect-[16/10] rounded border border-dashed border-stone-400 bg-stone-200/60 flex items-center justify-center p-4 text-center font-mono-tech text-xs text-stone-600">
                [Archival Portrait & Colombia/Iceland Dual Photo Plate]
              </div>
              <p className="text-sm text-stone-700 leading-relaxed">
                {PROFILE_SHELL.aboutPlaceholder}
              </p>
              <div className="pt-2 flex flex-wrap gap-1.5">
                {PROFILE_SHELL.hobbies.map((h) => (
                  <span
                    key={h}
                    className="px-2.5 py-1 text-[11px] font-mono-tech bg-stone-200/80 text-stone-800 rounded"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FOLIO II: RESUME & REYKJAVIK POSTER */}
        <section id="c4-resume" className="scroll-mt-24 border-b-2 border-stone-900/20 pb-14 space-y-6">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <span className="font-mono-tech text-xs uppercase tracking-widest text-amber-900">
                FOLIO II • 03. CURRICULUM VITAE & REYKJAVIK RESEARCH PLATE
              </span>
              <h2 className="font-serif-editorial text-4xl font-semibold mt-1">
                Academic Record & Reykjavik Conference Poster
              </h2>
            </div>
            <span className="font-mono-tech text-xs underline cursor-pointer text-amber-900">
              [Download Printable CV PDF]
            </span>
          </div>

          <div className="rounded-lg border border-stone-800/25 bg-[#FAF8F5] p-6">
            <div className="text-xs font-mono-tech uppercase text-amber-900 font-semibold">
              PLATE 01 • {REYKJAVIK_POSTER_SHELL.conference}
            </div>
            <h3 className="font-serif-editorial text-2xl font-semibold mt-1">
              {REYKJAVIK_POSTER_SHELL.title}
            </h3>
            <p className="text-sm text-stone-600 mt-2">{REYKJAVIK_POSTER_SHELL.abstractPlaceholder}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-stone-300">
              {RESUME_TIMELINE_SHELL.map((item) => (
                <div key={item.id}>
                  <div className="font-mono-tech text-xs text-amber-900">{item.period}</div>
                  <div className="font-serif-editorial text-xl font-semibold">{item.role}</div>
                  <div className="text-xs text-stone-500">{item.org}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOLIO III: NACE COMPETENCIES */}
        <section id="c4-skills" className="scroll-mt-24 border-b-2 border-stone-900/20 pb-14 space-y-6">
          <div>
            <span className="font-mono-tech text-xs uppercase tracking-widest text-amber-900">
              FOLIO III • 04. NACE COMPETENCIES (STAR METHOD)
            </span>
            <h2 className="font-serif-editorial text-4xl font-semibold mt-1">
              Four Pillars of Professional Readiness
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NACE_SKILLS_SHELL.map((skill) => (
              <div
                key={skill.id}
                className="rounded-lg border border-stone-800/20 bg-[#FAF8F5] p-6 space-y-3"
              >
                <div className="flex items-center justify-between text-xs font-mono-tech text-amber-900">
                  <span>{skill.badgeCode}</span>
                  <span>STAR METHOD</span>
                </div>
                <h3 className="font-serif-editorial text-2xl font-semibold">{skill.competency}</h3>
                <p className="text-xs font-mono-tech text-stone-500">{skill.contextTitle}</p>
                <div className="space-y-1.5 text-xs text-stone-700 pt-2 border-t border-stone-200">
                  <p><strong>S:</strong> {skill.star.situation}</p>
                  <p><strong>T:</strong> {skill.star.task}</p>
                  <p><strong>A:</strong> {skill.star.action}</p>
                  <p><strong>R:</strong> {skill.star.resolution}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FOLIO IV: GLOBAL EXPERIENCES (Expandable Museum Exhibit Plaques) */}
        <section id="c4-experiences" className="scroll-mt-24 border-b-2 border-stone-900/20 pb-14 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="font-mono-tech text-xs uppercase tracking-widest text-amber-900">
                FOLIO IV • 05. GLOBAL EXPERIENCES & UF CAMPUS LECTURES
              </span>
              <h2 className="font-serif-editorial text-4xl font-semibold mt-1">
                Curated Exhibit Catalog (Click Any Plaque to Expand Essay)
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            {GLOBAL_EXPERIENCES_SHELL.map((exp, idx) => {
              const isOpen = !!expandedExhibits[exp.id];
              return (
                <div
                  key={exp.id}
                  className="rounded-lg border border-stone-800/25 bg-[#FAF8F5] overflow-hidden"
                >
                  <button
                    onClick={() => toggleExhibit(exp.id)}
                    className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-stone-200/40 transition-colors cursor-pointer"
                  >
                    <div>
                      <div className="text-xs font-mono-tech text-amber-900">
                        EXHIBIT 0{idx + 1} • {exp.category.toUpperCase()} • {exp.date}
                      </div>
                      <h3 className="font-serif-editorial text-2xl font-semibold mt-1">
                        {exp.title}
                      </h3>
                      <p className="text-xs font-mono-tech text-stone-500 mt-0.5">
                        {exp.location} — {exp.coordinates}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 font-mono-tech text-xs text-stone-600 shrink-0">
                      <span>{isOpen ? 'Collapse Plaque' : 'Read Exhibit'}</span>
                      {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 border-t border-stone-200 space-y-4">
                      <ExperienceVisualHeader item={exp} variant="museum" />
                      <p className="text-sm text-stone-700 leading-relaxed">
                        {exp.summaryPlaceholder}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* FOLIO V: FINAL REFLECTION (Essayist Longform Layout) */}
        <section id="c4-reflection" className="scroll-mt-24">
          <div className="rounded-lg border-2 border-stone-800/30 bg-[#FAF8F5] p-8 sm:p-12">
            <span className="font-mono-tech text-xs uppercase tracking-widest text-amber-900">
              FOLIO V • 06. FINAL REFLECTION ({FINAL_REFLECTION_SHELL.wordCountTarget})
            </span>
            <h2 className="font-serif-editorial text-4xl sm:text-5xl font-semibold mt-2">
              {FINAL_REFLECTION_SHELL.title}
            </h2>
            <blockquote className="my-8 border-y border-stone-300 py-6 font-serif-editorial italic text-2xl text-stone-800 text-center">
              “{FINAL_REFLECTION_SHELL.leadPullQuote}”
            </blockquote>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {FINAL_REFLECTION_SHELL.pillars.map((pil) => (
                <div key={pil.heading} className="space-y-2">
                  <h3 className="font-serif-editorial text-xl font-bold text-stone-900">
                    {pil.heading}
                  </h3>
                  <p className="text-sm text-stone-700 leading-relaxed">{pil.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
