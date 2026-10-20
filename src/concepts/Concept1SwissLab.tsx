import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  Compass,
  Download,
  ExternalLink,
  FileText,
  Globe,
  Layers,
  MapPin,
  Microscope,
  Sparkles,
  X,
} from 'lucide-react';
import {
  ExperienceShellItem,
  FINAL_REFLECTION_SHELL,
  GLOBAL_EXPERIENCES_SHELL,
  NACE_SKILLS_SHELL,
  NaceSkillShell,
  PROFILE_SHELL,
  REYKJAVIK_POSTER_SHELL,
  RESUME_TIMELINE_SHELL,
  RUBRIC_SECTIONS,
  RubricSectionId,
} from '../data/shellData';
import { ExperienceVisualHeader, TopographicPattern } from '../components/CuratedVisuals';

/**
 * CONCEPT 1: "Swiss Lab & Stratigraphy"
 * - Aesthetic: Core D (Crisp Scientific & Academic Grid) + A (Topographic Accents)
 * - Navigation: Style A — Prominent Top ISP Rubric Nav Bar + Slide-Over Inspector Drawer for deep-dives
 */
export const Concept1SwissLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<RubricSectionId>('home');
  const [drawerItem, setDrawerItem] = useState<{
    type: 'experience' | 'skill' | 'poster';
    data: ExperienceShellItem | NaceSkillShell | typeof REYKJAVIK_POSTER_SHELL;
  } | null>(null);
  const [resumeFilter, setResumeFilter] = useState<string>('All');

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-[#0F172A] pb-24 relative">
      {/* Subtle Topographic Header Strip */}
      <div className="border-b border-slate-900/10 bg-[#F1EFEA] px-6 py-2 text-[11px] font-mono-tech flex flex-wrap items-center justify-between gap-2 text-slate-600">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 font-semibold text-teal-800">
            <Microscope className="h-3.5 w-3.5" />
            CONCEPT 01 // SWISS LAB & STRATIGRAPHY
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">B.S. GEOLOGY + B.S. MICROBIOLOGY | MINOR IN HISTORY</span>
        </div>
        <div>NAV ARCHITECTURE: TOP RUBRIC TABS + SLIDE-OVER INSPECTOR DRAWER</div>
      </div>

      {/* Prominent ISP Rubric Top Navigation */}
      <header className="sticky top-0 z-30 border-b border-slate-900/15 bg-[#F8F7F4]/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded border border-slate-900 bg-slate-900 text-white font-mono-tech font-bold text-sm">
              UF
            </div>
            <div>
              <h1 className="font-display-grotesk text-lg font-bold tracking-tight leading-none">
                {PROFILE_SHELL.name} — ISP Capstone ePortfolio
              </h1>
              <p className="text-xs font-mono-tech text-slate-500 mt-1">
                SPECIMEN LOG • GAINESVILLE / BOGOTÁ / REYKJAVIK
              </p>
            </div>
          </div>

          {/* 6 Exact ISP Rubric Buttons */}
          <nav className="flex flex-wrap gap-1.5" aria-label="ISP Rubric Navigation">
            {RUBRIC_SECTIONS.map((sec) => {
              const isActive = activeTab === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveTab(sec.id)}
                  className={`px-3 py-2 rounded text-xs font-mono-tech transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-teal-800 text-white border-teal-900 shadow-xs font-semibold'
                      : 'bg-white/80 text-slate-700 border-slate-300 hover:border-slate-900'
                  }`}
                >
                  {sec.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Swiss Grid Workspace */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Rubric Requirement Status Bar */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded border border-teal-900/20 bg-teal-950/[0.03] px-4 py-3">
          <div className="flex items-center gap-2 text-xs font-mono-tech text-teal-900">
            <span className="inline-block h-2 w-2 rounded-full bg-teal-600" />
            <span>
              ACTIVE RUBRIC MODULE:{' '}
              <strong>{RUBRIC_SECTIONS.find((s) => s.id === activeTab)?.label}</strong>
            </span>
            <span className="text-slate-400">|</span>
            <span>{RUBRIC_SECTIONS.find((s) => s.id === activeTab)?.rubricRequirement}</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono-tech text-slate-500">
            <span>Click any card to open the Inspector Drawer</span>
          </div>
        </div>

        {/* TAB 1: HOME */}
        {activeTab === 'home' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 border border-slate-900/15 bg-white shadow-2xs">
            <div className="lg:col-span-7 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-slate-900/15 relative overflow-hidden">
              <TopographicPattern className="absolute inset-0 h-full w-full text-teal-800/10" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-teal-800/30 bg-teal-50 px-3 py-1 text-xs font-mono-tech text-teal-900 mb-6">
                  <span>UF INTERNATIONAL SCHOLARS PROGRAM</span>
                  <span>•</span>
                  <span>GRADUATING FALL/SPRING 2026</span>
                </div>
                <h2 className="font-display-grotesk text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-[1.1]">
                  {PROFILE_SHELL.tagline}
                </h2>
                <p className="mt-6 text-base leading-relaxed text-slate-600 max-w-2xl">
                  {PROFILE_SHELL.homeIntroPlaceholder}
                </p>

                <blockquote className="mt-8 border-l-2 border-teal-700 pl-4 py-1 italic text-slate-800 bg-slate-50 p-3 rounded-r">
                  {PROFILE_SHELL.quote}
                </blockquote>

                {/* Quick Rubric Jump Grid */}
                <div className="mt-10 pt-6 border-t border-slate-200">
                  <p className="text-xs font-mono-tech uppercase tracking-wider text-slate-400 mb-3">
                    Advisor Quick-Grading Matrix (All 6 Required Sections)
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {RUBRIC_SECTIONS.filter((s) => s.id !== 'home').map((sec) => (
                      <button
                        key={sec.id}
                        onClick={() => setActiveTab(sec.id)}
                        className="group text-left p-3 rounded border border-slate-200 hover:border-teal-700 hover:bg-teal-50/30 transition-all cursor-pointer"
                      >
                        <div className="text-xs font-mono-tech font-semibold text-teal-800 group-hover:underline">
                          {sec.label} →
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                          {sec.rubricRequirement}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Photo Slots + Field Metrics */}
            <div className="lg:col-span-5 p-8 bg-[#FAF9F6] flex flex-col justify-between gap-6">
              <div>
                <div className="flex items-center justify-between text-xs font-mono-tech text-slate-500 mb-3">
                  <span>HERO VISUAL SLOTS (PERSONAL PHOTOS)</span>
                  <span>64.14°N / 4.71°N</span>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <div className="rounded-lg border-2 border-dashed border-teal-800/30 bg-gradient-to-br from-teal-900/5 to-cyan-900/10 p-6">
                    <span className="text-[10px] font-mono-tech uppercase px-2 py-0.5 rounded bg-teal-900 text-white">
                      Primary Hero Slot • Iceland
                    </span>
                    <h3 className="mt-3 font-display-grotesk font-semibold text-lg">
                      Reykjavik Waterfall & Conference Portrait
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Personal photo slot: Standing before the Icelandic waterfall after presenting undergraduate research.
                    </p>
                  </div>
                  <div className="rounded-lg border-2 border-dashed border-amber-800/30 bg-gradient-to-br from-amber-900/5 to-orange-900/10 p-6">
                    <span className="text-[10px] font-mono-tech uppercase px-2 py-0.5 rounded bg-amber-800 text-white">
                      Secondary Hero Slot • Colombia
                    </span>
                    <h3 className="mt-3 font-display-grotesk font-semibold text-lg">
                      Suesca Sandstone Climbing & Bogotá Immersion
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Personal photo slot: Climbing in Suesca or dominoes & coffee at Lucia’s family finca.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 border border-slate-300 bg-white divide-x divide-slate-300 text-center">
                <div className="p-3">
                  <div className="font-mono-tech text-xl font-bold text-teal-800">2</div>
                  <div className="text-[11px] font-mono-tech text-slate-500">STEM Majors</div>
                </div>
                <div className="p-3">
                  <div className="font-mono-tech text-xl font-bold text-teal-800">6</div>
                  <div className="text-[11px] font-mono-tech text-slate-500">Global Logs</div>
                </div>
                <div className="p-3">
                  <div className="font-mono-tech text-xl font-bold text-teal-800">4</div>
                  <div className="text-[11px] font-mono-tech text-slate-500">NACE STARs</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ABOUT ME */}
        {activeTab === 'about' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 border border-slate-900/15 bg-white">
            <div className="lg:col-span-4 p-8 border-b lg:border-b-0 lg:border-r border-slate-900/15 bg-[#FAF9F6]">
              <div className="aspect-[4/5] rounded-lg border-2 border-dashed border-slate-400 bg-slate-100 flex flex-col items-center justify-center p-6 text-center">
                <Compass className="h-10 w-10 text-teal-800 mb-3" />
                <span className="font-mono-tech text-xs uppercase tracking-wider text-slate-700 font-semibold">
                  Portrait Photo Slot
                </span>
                <p className="text-xs text-slate-500 mt-1">
                  Fieldwork / Climbing / Reykjavik Conference Portrait
                </p>
              </div>
              <div className="mt-6 space-y-3 font-mono-tech text-xs">
                <div className="border-b border-slate-200 pb-2">
                  <span className="text-slate-400 block">MAJORS</span>
                  <span className="font-semibold">Geology (B.S.) & Microbiology (B.S.)</span>
                </div>
                <div className="border-b border-slate-200 pb-2">
                  <span className="text-slate-400 block">MINOR</span>
                  <span className="font-semibold">History (Latin American & Global Focus)</span>
                </div>
                <div>
                  <span className="text-slate-400 block">POST-GRAD TARGET</span>
                  <span className="font-semibold text-teal-800">Peace Corps & Applied Geobiology</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 p-8 lg:p-12 space-y-6">
              <div className="inline-block text-xs font-mono-tech uppercase px-2.5 py-1 bg-slate-100 border border-slate-300 rounded">
                ISP Rubric: About Me (&lt; 400 Words)
              </div>
              <h2 className="font-display-grotesk text-3xl font-bold">
                The Geoscientist Who Reads History
              </h2>
              <p className="text-slate-600 leading-relaxed">{PROFILE_SHELL.aboutPlaceholder}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded border border-slate-200 bg-slate-50">
                  <h3 className="font-mono-tech text-xs uppercase font-bold text-teal-800">
                    Scientific Lens
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Investigating how geological substrates, hydrology, and microbial ecosystems interact under climate and anthropogenic stress.
                  </p>
                </div>
                <div className="p-4 rounded border border-slate-200 bg-slate-50">
                  <h3 className="font-mono-tech text-xs uppercase font-bold text-amber-800">
                    Humanities & Service Lens
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Understanding colonial history, language, and lived community realities so scientific solutions serve people directly.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <h4 className="font-mono-tech text-xs uppercase text-slate-400 mb-2">
                  Interests & Field Pursuits
                </h4>
                <div className="flex flex-wrap gap-2">
                  {PROFILE_SHELL.hobbies.map((h) => (
                    <span
                      key={h}
                      className="px-3 py-1.5 rounded-full text-xs font-mono-tech border border-slate-300 bg-white"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: INTERACTIVE RESUME & REYKJAVIK POSTER */}
        {activeTab === 'resume' && (
          <div className="space-y-8">
            {/* Reykjavik Research Poster Feature Box */}
            <div className="border-2 border-teal-800 bg-white p-6 lg:p-8 shadow-xs">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-6">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono-tech uppercase text-teal-800 font-semibold">
                    <Sparkles className="h-3.5 w-3.5" />
                    Featured Artifact • International Conference Poster
                  </span>
                  <h2 className="font-display-grotesk text-2xl font-bold mt-1">
                    {REYKJAVIK_POSTER_SHELL.title}
                  </h2>
                  <p className="text-xs font-mono-tech text-slate-500 mt-1">
                    {REYKJAVIK_POSTER_SHELL.conference} — {REYKJAVIK_POSTER_SHELL.authors}
                  </p>
                </div>
                <button
                  onClick={() => setDrawerItem({ type: 'poster', data: REYKJAVIK_POSTER_SHELL })}
                  className="inline-flex items-center gap-2 rounded bg-teal-800 px-4 py-2.5 text-xs font-mono-tech font-semibold text-white hover:bg-teal-900 cursor-pointer shrink-0"
                >
                  <ExternalLink className="h-4 w-4" />
                  Inspect Full Poster Lightbox
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                {REYKJAVIK_POSTER_SHELL.sections.map((sec) => (
                  <div
                    key={sec.label}
                    onClick={() => setDrawerItem({ type: 'poster', data: REYKJAVIK_POSTER_SHELL })}
                    className="p-4 rounded border border-slate-200 bg-slate-50 hover:border-teal-700 cursor-pointer transition-all"
                  >
                    <div className="font-mono-tech text-xs font-bold text-teal-900">{sec.label}</div>
                    <p className="text-xs text-slate-600 mt-1.5">{sec.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Resume Filter + PDF Download */}
            <div className="border border-slate-900/15 bg-white p-6 lg:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-display-grotesk text-xl font-bold">
                    Interactive Curriculum Vitae (Shell for Your Resume PDF)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Once you share your Resume PDF, we will populate all lab roles, GPAs, coursework, and fieldwork here.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {['All', 'Education', 'Research & Fieldwork', 'Global & Leadership'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setResumeFilter(cat)}
                      className={`px-3 py-1.5 rounded text-xs font-mono-tech cursor-pointer border ${
                        resumeFilter === cat
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                  <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono-tech border border-teal-800 text-teal-900 bg-teal-50 font-semibold">
                    <Download className="h-3.5 w-3.5" />
                    PDF Slot
                  </button>
                </div>
              </div>

              <div className="divide-y divide-slate-200">
                {RESUME_TIMELINE_SHELL.filter(
                  (r) => resumeFilter === 'All' || r.category === resumeFilter
                ).map((item) => (
                  <div key={item.id} className="py-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div>
                      <span className="text-[11px] font-mono-tech uppercase text-teal-800 font-semibold">
                        {item.category}
                      </span>
                      <h4 className="font-display-grotesk text-lg font-bold">{item.role}</h4>
                      <p className="text-sm text-slate-600">{item.org}</p>
                      <ul className="mt-2 space-y-1 text-xs text-slate-600 list-disc list-inside">
                        {item.highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="text-left sm:text-right font-mono-tech text-xs text-slate-500 shrink-0">
                      <div className="font-semibold text-slate-800">{item.period}</div>
                      <div>{item.location}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: NACE SKILLS (STAR METHOD) */}
        {activeTab === 'skills' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NACE_SKILLS_SHELL.map((skill) => (
              <div
                key={skill.id}
                onClick={() => setDrawerItem({ type: 'skill', data: skill })}
                className="group border border-slate-900/15 bg-white p-6 hover:border-teal-800 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono-tech text-slate-400">
                    <span className="text-teal-800 font-semibold">{skill.badgeCode}</span>
                    <span>STAR METHOD VERIFIED</span>
                  </div>
                  <h3 className="font-display-grotesk text-xl font-bold mt-2 group-hover:text-teal-800">
                    {skill.competency}
                  </h3>
                  <p className="text-xs font-mono-tech text-slate-500 mt-1">{skill.contextTitle}</p>

                  <div className="mt-5 grid grid-cols-2 gap-2.5 text-xs">
                    <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                      <strong className="font-mono-tech text-teal-800 block">S — Situation</strong>
                      <span className="text-slate-600 line-clamp-2 mt-0.5">{skill.star.situation}</span>
                    </div>
                    <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                      <strong className="font-mono-tech text-teal-800 block">T — Task</strong>
                      <span className="text-slate-600 line-clamp-2 mt-0.5">{skill.star.task}</span>
                    </div>
                    <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                      <strong className="font-mono-tech text-teal-800 block">A — Action</strong>
                      <span className="text-slate-600 line-clamp-2 mt-0.5">{skill.star.action}</span>
                    </div>
                    <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                      <strong className="font-mono-tech text-teal-800 block">R — Resolution</strong>
                      <span className="text-slate-600 line-clamp-2 mt-0.5">{skill.star.resolution}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono-tech text-teal-800">
                  <span>Open Full STAR Reflection in Drawer</span>
                  <span>→</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 5: GLOBAL EXPERIENCES */}
        {activeTab === 'experiences' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {GLOBAL_EXPERIENCES_SHELL.map((exp) => (
                <article
                  key={exp.id}
                  onClick={() => setDrawerItem({ type: 'experience', data: exp })}
                  className="group border border-slate-900/15 bg-white p-6 hover:border-teal-800 transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono-tech text-slate-500 mb-3">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-medium">
                        {exp.category}
                      </span>
                      <span>{exp.date}</span>
                    </div>

                    <ExperienceVisualHeader item={exp} variant="swiss" />

                    <h3 className="font-display-grotesk text-xl font-bold mt-4 group-hover:text-teal-800">
                      {exp.title}
                    </h3>
                    <p className="text-xs font-mono-tech text-slate-500 mt-1">
                      {exp.location} ({exp.coordinates})
                    </p>
                    <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                      {exp.summaryPlaceholder}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono-tech text-teal-800">
                    <span>Inspect 300+ Word Reflection & Evidence</span>
                    <span>OPEN DRAWER →</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: FINAL REFLECTION */}
        {activeTab === 'reflection' && (
          <div className="border border-slate-900/15 bg-white p-8 lg:p-12 max-w-4xl mx-auto">
            <div className="flex items-center justify-between text-xs font-mono-tech text-teal-800 mb-3">
              <span>CAPSTONE SYNTHESIS • SO WHAT? NOW WHAT?</span>
              <span>{FINAL_REFLECTION_SHELL.wordCountTarget}</span>
            </div>
            <h2 className="font-display-grotesk text-3xl sm:text-4xl font-bold">
              {FINAL_REFLECTION_SHELL.title}
            </h2>
            <blockquote className="my-6 border-l-4 border-teal-800 bg-teal-50/50 p-5 font-serif-editorial italic text-xl text-slate-800">
              “{FINAL_REFLECTION_SHELL.leadPullQuote}”
            </blockquote>
            <div className="space-y-6 mt-8">
              {FINAL_REFLECTION_SHELL.pillars.map((pil) => (
                <div key={pil.heading} className="p-5 rounded border border-slate-200 bg-[#FAF9F6]">
                  <h3 className="font-display-grotesk font-bold text-lg text-slate-900">
                    {pil.heading}
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">{pil.summary}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Slide-Over Inspector Drawer (Style A Highlight) */}
      {drawerItem && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/40 backdrop-blur-xs">
          <div className="relative h-full w-full max-w-xl bg-white border-l border-slate-300 p-6 sm:p-8 overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <span className="font-mono-tech text-xs uppercase text-teal-800 font-semibold">
                SPECIMEN / RUBRIC INSPECTOR DRAWER
              </span>
              <button
                onClick={() => setDrawerItem(null)}
                className="rounded p-1.5 hover:bg-slate-100 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {drawerItem.type === 'experience' && (
              <div className="mt-6 space-y-4">
                <ExperienceVisualHeader item={drawerItem.data as ExperienceShellItem} variant="swiss" />
                <h3 className="font-display-grotesk text-2xl font-bold">
                  {(drawerItem.data as ExperienceShellItem).title}
                </h3>
                <p className="text-xs font-mono-tech text-slate-500">
                  {(drawerItem.data as ExperienceShellItem).subtitle}
                </p>
                <div className="p-4 rounded bg-slate-50 border border-slate-200 text-sm leading-relaxed text-slate-700">
                  {(drawerItem.data as ExperienceShellItem).summaryPlaceholder}
                  <p className="mt-3 text-xs font-mono-tech text-teal-800">
                    [In Phase 3, your full written paragraphs from ISP - Google Docs.pdf will render here.]
                  </p>
                </div>
              </div>
            )}

            {drawerItem.type === 'skill' && (
              <div className="mt-6 space-y-4">
                <span className="font-mono-tech text-xs px-2 py-1 rounded bg-teal-50 text-teal-800">
                  {(drawerItem.data as NaceSkillShell).badgeCode}
                </span>
                <h3 className="font-display-grotesk text-2xl font-bold">
                  {(drawerItem.data as NaceSkillShell).competency}
                </h3>
                <p className="text-sm text-slate-500">
                  {(drawerItem.data as NaceSkillShell).contextTitle}
                </p>
                <div className="space-y-3 pt-2">
                  {Object.entries((drawerItem.data as NaceSkillShell).star).map(([k, v]) => (
                    <div key={k} className="p-4 rounded border border-slate-200 bg-slate-50">
                      <div className="font-mono-tech text-xs uppercase font-bold text-teal-800">
                        {k}
                      </div>
                      <p className="text-sm text-slate-700 mt-1">{v}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {drawerItem.type === 'poster' && (
              <div className="mt-6 space-y-4">
                <h3 className="font-display-grotesk text-2xl font-bold">
                  {REYKJAVIK_POSTER_SHELL.title}
                </h3>
                <p className="text-xs font-mono-tech text-slate-500">
                  {REYKJAVIK_POSTER_SHELL.conference}
                </p>
                <div className="aspect-[16/10] rounded border-2 border-dashed border-teal-700 bg-teal-50/40 flex flex-col items-center justify-center p-6 text-center">
                  <Microscope className="h-8 w-8 text-teal-800 mb-2" />
                  <p className="font-mono-tech text-xs font-bold text-teal-900">
                    HIGH-RESOLUTION REYKJAVIK POSTER CANVAS SLOT
                  </p>
                  <p className="text-xs text-slate-600 mt-1 max-w-md">
                    {REYKJAVIK_POSTER_SHELL.abstractPlaceholder}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
