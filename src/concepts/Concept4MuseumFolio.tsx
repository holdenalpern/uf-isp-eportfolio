import React, { useEffect, useRef, useState } from 'react';
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Download,
  Edit3,
  Eye,
  Feather,
  ImagePlus,
  Maximize2,
  Plus,
  RotateCcw,
  Save,
  Stamp,
  Trash2,
  X,
} from 'lucide-react';
import initialPortfolioData from '../data/portfolioContent.json';
import { RUBRIC_SECTIONS } from '../data/shellData';
import { ExperienceVisualHeader } from '../components/CuratedVisuals';
import { countWords, EditableText } from '../components/EditableText';
import { Component as ImageAutoSlider } from '@/components/ui/image-auto-slider';

export type PortfolioContent = typeof initialPortfolioData;

const STORAGE_KEY = 'uf_isp_folio_content_v1';

export const Concept4MuseumFolio: React.FC = () => {
  const [content, setContent] = useState<PortfolioContent>(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch {
      // ignore parse errors
    }
    return initialPortfolioData;
  });

  const [editMode, setEditMode] = useState<boolean>(true);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved' | 'error'>('saved');
  const [lastSavedTime, setLastSavedTime] = useState<string>('Synced with repo');
  const [posterLightboxOpen, setPosterLightboxOpen] = useState<boolean>(false);
  const [expandedExhibits, setExpandedExhibits] = useState<Record<string, boolean>>({
    'colombia-bogota': true,
    'iceland-reykjavik': true,
    'uf-south-africa-hydrology': true,
    'uf-harn-one-world': true,
    'uf-brazil-quilombos': false,
    'uf-brazil-populism': false,
  });

  const saveTimerRef = useRef<number | null>(null);

  // Persist to localStorage + auto-save to src/data/portfolioContent.json on disk
  const persistContent = async (nextContent: PortfolioContent) => {
    setSaveStatus('saving');
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextContent));
    } catch {
      // ignore storage quota errors
    }

    try {
      const res = await fetch('/__save-portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nextContent),
      });
      if (res.ok) {
        setSaveStatus('saved');
        setLastSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      } else {
        setSaveStatus('error');
      }
    } catch {
      // If static production build without dev server middleware
      setSaveStatus('saved');
    }
  };

  const updateContent = (updater: (prev: PortfolioContent) => PortfolioContent) => {
    setContent((prev) => {
      const next = updater(prev);
      setSaveStatus('unsaved');
      if (saveTimerRef.current) {
        window.clearTimeout(saveTimerRef.current);
      }
      saveTimerRef.current = window.setTimeout(() => {
        persistContent(next);
      }, 650);
      return next;
    });
  };

  // Keyboard shortcut Cmd/Ctrl + E to toggle Edit Mode
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        setEditMode((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const toggleExhibit = (id: string) => {
    setExpandedExhibits((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const setAllExhibits = (open: boolean) => {
    const next: Record<string, boolean> = {};
    content.experiences.forEach((exp) => {
      next[exp.id] = open;
    });
    setExpandedExhibits(next);
  };

  const jumpTo = (id: string) => {
    const el = document.getElementById(`c4-${id}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const totalReflectionWords =
    countWords(content.reflection.leadPullQuote) +
    content.reflection.pillars.reduce((acc, p) => acc + countWords(p.body), 0);

  const handleImageFileUpload = (callback: (dataUrl: string) => void) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          callback(reader.result);
        }
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  const exportJsonBackup = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolioContent.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#F4F0EA] text-[#1C1917] pb-32 selection:bg-amber-900/15">
      {/* Archival Masthead */}
      <div className="border-b border-stone-900/15 px-6 py-2.5 text-center font-mono-tech text-[11px] uppercase tracking-widest text-stone-600 bg-[#EBE5DC]">
        <EditableText
          value={content.masthead}
          editMode={editMode}
          onChange={(v) => updateContent((p) => ({ ...p, masthead: v }))}
          className="text-center font-mono-tech text-[11px] uppercase tracking-widest text-stone-600"
        />
      </div>

      {/* Sticky Editorial Chapter Index */}
      <header className="sticky top-0 z-30 border-b border-stone-900/20 bg-[#F4F0EA]/95 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Feather className="h-5 w-5 text-amber-900 shrink-0" />
            <EditableText
              as="span"
              value={content.folioTitle}
              editMode={editMode}
              onChange={(v) => updateContent((p) => ({ ...p, folioTitle: v }))}
              className="font-serif-editorial text-2xl font-bold tracking-tight"
            />
          </div>
          <nav className="flex flex-wrap gap-1.5" aria-label="ISP Rubric Sections">
            {RUBRIC_SECTIONS.map((sec) => (
              <button
                key={sec.id}
                onClick={() => jumpTo(sec.id)}
                className="px-3 py-1.5 rounded border border-stone-800/20 bg-[#FAF8F5] text-xs font-mono-tech text-stone-800 hover:border-amber-900 hover:bg-amber-900 hover:text-white transition-colors cursor-pointer"
              >
                {sec.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Helpful Edit Mode Banner */}
      {editMode && (
        <div className="bg-amber-900 text-amber-50 px-6 py-2.5 text-xs font-mono-tech border-b border-amber-950">
          <div className="mx-auto max-w-6xl flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Edit3 className="h-3.5 w-3.5 text-amber-300 shrink-0" />
              <span>
                <strong>LIVE EDIT MODE ACTIVE:</strong> Click any dashed text box to edit directly. All changes auto-save to{' '}
                <code className="bg-amber-950/70 px-1.5 py-0.5 rounded">src/data/portfolioContent.json</code>.
              </span>
            </div>
            <span className="text-amber-200">
              Toggle Reader Preview anytime in the bottom toolbar (or press Cmd/Ctrl + E)
            </span>
          </div>
        </div>
      )}

      <main className="mx-auto max-w-5xl px-6 py-12 space-y-20">
        {/* FOLIO I: HOME & ABOUT ME (Editorial Double-Column Spread) */}
        <section id="c4-home" className="scroll-mt-24 border-b-2 border-stone-900/20 pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: 01. Home */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-widest text-amber-900">
                <Stamp className="h-3.5 w-3.5" />
                <span>FOLIO I • 01. HOME & INTRODUCTION (RUBRIC: &lt; 400 WORDS)</span>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tech text-stone-600">
                <EditableText
                  value={content.majors}
                  editMode={editMode}
                  onChange={(v) => updateContent((p) => ({ ...p, majors: v }))}
                  className="font-mono-tech text-xs font-semibold text-stone-800"
                />
                <span>•</span>
                <EditableText
                  value={content.minor}
                  editMode={editMode}
                  onChange={(v) => updateContent((p) => ({ ...p, minor: v }))}
                  className="font-mono-tech text-xs text-amber-900"
                />
              </div>

              {/* 21st.dev Infinite Auto-Slider placed directly between Degree and Main Title */}
              <ImageAutoSlider
                images={content.heroSliderImages || initialPortfolioData.heroSliderImages}
                editMode={editMode}
                onReplaceImage={(idx) =>
                  handleImageFileUpload((dataUrl) => {
                    const captionPrompt = window.prompt(
                      'Optional slide caption:',
                      (content.heroSliderImages || initialPortfolioData.heroSliderImages)[idx]?.caption || ''
                    );
                    updateContent((p) => {
                      const currentList = [
                        ...(p.heroSliderImages || initialPortfolioData.heroSliderImages),
                      ];
                      currentList[idx] = {
                        url: dataUrl,
                        caption: captionPrompt ?? currentList[idx]?.caption ?? '',
                      };
                      return { ...p, heroSliderImages: currentList };
                    });
                  })
                }
                onAddImage={() =>
                  handleImageFileUpload((dataUrl) => {
                    const caption =
                      window.prompt('Caption for this new slide:', 'Colombia / Iceland Field Photo') ||
                      'Field Photo';
                    updateContent((p) => ({
                      ...p,
                      heroSliderImages: [
                        ...(p.heroSliderImages || initialPortfolioData.heroSliderImages),
                        { url: dataUrl, caption },
                      ],
                    }));
                  })
                }
                onRemoveImage={(idx) =>
                  updateContent((p) => ({
                    ...p,
                    heroSliderImages: (
                      p.heroSliderImages || initialPortfolioData.heroSliderImages
                    ).filter((_, i) => i !== idx),
                  }))
                }
              />

              <EditableText
                as="h1"
                multiline
                value={content.tagline}
                editMode={editMode}
                onChange={(v) => updateContent((p) => ({ ...p, tagline: v }))}
                className="font-serif-editorial text-4xl sm:text-6xl font-semibold leading-[1.06] text-stone-900"
              />

              <EditableText
                as="p"
                multiline
                showWordCount
                wordCountTarget={{ max: 400, label: 'Under 400w' }}
                value={content.homeIntro}
                editMode={editMode}
                onChange={(v) => updateContent((p) => ({ ...p, homeIntro: v }))}
                className="leading-relaxed text-stone-700 font-serif-editorial text-xl"
              />

              <blockquote className="border-l-2 border-amber-900 pl-4 italic font-serif-editorial text-xl text-stone-800 bg-[#FAF8F5] p-4 rounded-r border border-stone-800/10">
                <EditableText
                  as="span"
                  multiline
                  value={content.homeQuote}
                  editMode={editMode}
                  onChange={(v) => updateContent((p) => ({ ...p, homeQuote: v }))}
                  className="italic font-serif-editorial text-xl text-stone-800"
                />
              </blockquote>

              {/* Quick Rubric Directory for Advisor */}
              <div className="pt-4">
                <div className="text-[11px] font-mono-tech uppercase tracking-wider text-stone-500 mb-2.5">
                  Folio Index • Direct Advisor Navigation
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {RUBRIC_SECTIONS.filter((s) => s.id !== 'home').map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => jumpTo(sec.id)}
                      className="text-left p-2.5 rounded border border-stone-800/15 bg-[#FAF8F5] hover:border-amber-900 transition-colors cursor-pointer"
                    >
                      <div className="font-mono-tech text-xs font-semibold text-amber-900">
                        {sec.label} →
                      </div>
                      <div className="text-[10px] text-stone-500 truncate mt-0.5">
                        {sec.rubricRequirement}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: 02. About Me */}
            <div
              id="c4-about"
              className="scroll-mt-24 lg:col-span-5 rounded-lg border border-stone-800/20 bg-[#FAF8F5] p-6 space-y-4 shadow-2xs"
            >
              <div className="flex items-center justify-between text-xs font-mono-tech uppercase tracking-wider text-stone-500 border-b border-stone-300 pb-2">
                <span>CURATORIAL BIO • 02. ABOUT ME</span>
                <span className="text-amber-900">&lt; 400 WORDS</span>
              </div>

              <EditableText
                as="h2"
                value={content.aboutTitle}
                editMode={editMode}
                onChange={(v) => updateContent((p) => ({ ...p, aboutTitle: v }))}
                className="font-serif-editorial text-2xl font-bold text-stone-900"
              />

              <EditableText
                as="p"
                multiline
                showWordCount
                wordCountTarget={{ max: 400, label: 'Under 400w' }}
                value={content.aboutBio}
                editMode={editMode}
                onChange={(v) => updateContent((p) => ({ ...p, aboutBio: v }))}
                className="text-sm text-stone-700 leading-relaxed"
              />

              {/* Dual Lenses */}
              <div className="grid grid-cols-1 gap-3 pt-2">
                <div className="p-3.5 rounded border border-stone-300/80 bg-[#F4F0EA]/60">
                  <div className="font-mono-tech text-[10px] uppercase font-bold text-amber-900 mb-1">
                    Earth & Microbial Science Lens
                  </div>
                  <EditableText
                    as="p"
                    multiline
                    value={content.scientificLens}
                    editMode={editMode}
                    onChange={(v) => updateContent((p) => ({ ...p, scientificLens: v }))}
                    className="text-xs text-stone-700 leading-relaxed"
                  />
                </div>
                <div className="p-3.5 rounded border border-stone-300/80 bg-[#F4F0EA]/60">
                  <div className="font-mono-tech text-[10px] uppercase font-bold text-amber-900 mb-1">
                    Historical & Global Service Lens
                  </div>
                  <EditableText
                    as="p"
                    multiline
                    value={content.humanitiesLens}
                    editMode={editMode}
                    onChange={(v) => updateContent((p) => ({ ...p, humanitiesLens: v }))}
                    className="text-xs text-stone-700 leading-relaxed"
                  />
                </div>
              </div>

              {/* Hobbies / Tags */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-[10px] font-mono-tech uppercase text-stone-500 mb-2">
                  <span>Field Pursuits & Interests</span>
                  {editMode && (
                    <button
                      onClick={() =>
                        updateContent((p) => ({
                          ...p,
                          hobbies: [...p.hobbies, 'New Interest'],
                        }))
                      }
                      className="inline-flex items-center gap-1 text-amber-900 hover:underline cursor-pointer"
                    >
                      <Plus className="h-3 w-3" /> Add Tag
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {content.hobbies.map((h, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono-tech bg-stone-200/80 text-stone-800 rounded"
                    >
                      <EditableText
                        value={h}
                        editMode={editMode}
                        onChange={(newVal) =>
                          updateContent((p) => {
                            const next = [...p.hobbies];
                            next[idx] = newVal;
                            return { ...p, hobbies: next };
                          })
                        }
                        className="text-[11px] font-mono-tech"
                      />
                      {editMode && (
                        <button
                          onClick={() =>
                            updateContent((p) => ({
                              ...p,
                              hobbies: p.hobbies.filter((_, i) => i !== idx),
                            }))
                          }
                          className="text-stone-500 hover:text-red-700 cursor-pointer"
                          title="Remove tag"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOLIO II: RESUME & REYKJAVIK POSTER */}
        <section id="c4-resume" className="scroll-mt-24 border-b-2 border-stone-900/20 pb-14 space-y-8">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <span className="font-mono-tech text-xs uppercase tracking-widest text-amber-900">
                FOLIO II • 03. CURRICULUM VITAE & REYKJAVIK RESEARCH PLATE
              </span>
              <h2 className="font-serif-editorial text-4xl font-semibold mt-1">
                Academic Record & Reykjavik Conference Poster
              </h2>
            </div>
            <div className="flex items-center gap-3">
              {editMode && (
                <button
                  onClick={() =>
                    updateContent((p) => ({
                      ...p,
                      resume: [
                        ...p.resume,
                        {
                          id: `res-${Date.now()}`,
                          category: 'Experience / Lab',
                          role: 'New Role / Position Title',
                          org: 'Organization / Lab Name',
                          period: '2025 – 2026',
                          location: 'Gainesville, FL',
                          highlights: ['Click to describe key accomplishment or responsibility.'],
                        },
                      ],
                    }))
                  }
                  className="inline-flex items-center gap-1.5 rounded border border-amber-900 bg-amber-900/10 px-3 py-1.5 font-mono-tech text-xs text-amber-900 hover:bg-amber-900 hover:text-white transition-colors cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Resume Entry
                </button>
              )}
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 rounded border border-stone-800/30 bg-[#FAF8F5] px-3 py-1.5 font-mono-tech text-xs text-stone-800 hover:border-amber-900 cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                Print / Save CV View
              </button>
            </div>
          </div>

          {/* Reykjavik Poster Archival Plate */}
          <div className="rounded-lg border-2 border-stone-800/25 bg-[#FAF8F5] p-6 sm:p-8 space-y-5">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-stone-300 pb-4">
              <div className="space-y-1 flex-1">
                <EditableText
                  value={content.poster.plateNumber}
                  editMode={editMode}
                  onChange={(v) =>
                    updateContent((p) => ({ ...p, poster: { ...p.poster, plateNumber: v } }))
                  }
                  className="text-xs font-mono-tech uppercase text-amber-900 font-semibold"
                />
                <EditableText
                  as="h3"
                  value={content.poster.title}
                  editMode={editMode}
                  onChange={(v) =>
                    updateContent((p) => ({ ...p, poster: { ...p.poster, title: v } }))
                  }
                  className="font-serif-editorial text-3xl font-semibold text-stone-900"
                />
                <EditableText
                  value={content.poster.authors}
                  editMode={editMode}
                  onChange={(v) =>
                    updateContent((p) => ({ ...p, poster: { ...p.poster, authors: v } }))
                  }
                  className="text-xs font-mono-tech text-stone-500"
                />
              </div>

              <div className="flex items-center gap-2">
                {editMode && (
                  <button
                    onClick={() =>
                      handleImageFileUpload((dataUrl) =>
                        updateContent((p) => ({
                          ...p,
                          poster: { ...p.poster, imageUrl: dataUrl },
                        }))
                      )
                    }
                    className="inline-flex items-center gap-1.5 rounded border border-amber-900/40 bg-amber-50 px-3 py-2 text-xs font-mono-tech text-amber-900 hover:bg-amber-100 cursor-pointer"
                  >
                    <ImagePlus className="h-3.5 w-3.5" />
                    Upload Poster Image
                  </button>
                )}
                <button
                  onClick={() => setPosterLightboxOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded bg-stone-900 px-3.5 py-2 text-xs font-mono-tech text-stone-100 hover:bg-amber-900 transition-colors cursor-pointer"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                  Open Poster Lightbox
                </button>
              </div>
            </div>

            {content.poster.imageUrl && (
              <div className="overflow-hidden rounded border border-stone-300 bg-white p-2">
                <img
                  src={content.poster.imageUrl}
                  alt={content.poster.title}
                  className="max-h-96 w-full object-contain mx-auto"
                />
              </div>
            )}

            <EditableText
              as="p"
              multiline
              value={content.poster.abstract}
              editMode={editMode}
              onChange={(v) =>
                updateContent((p) => ({ ...p, poster: { ...p.poster, abstract: v } }))
              }
              className="text-sm text-stone-700 leading-relaxed"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              {content.poster.sections.map((sec, idx) => (
                <div
                  key={sec.id}
                  className="rounded border border-stone-300/90 bg-[#F4F0EA]/70 p-4 space-y-1.5"
                >
                  <EditableText
                    value={sec.label}
                    editMode={editMode}
                    onChange={(v) =>
                      updateContent((p) => {
                        const nextSecs = [...p.poster.sections];
                        nextSecs[idx] = { ...nextSecs[idx], label: v };
                        return { ...p, poster: { ...p.poster, sections: nextSecs } };
                      })
                    }
                    className="font-mono-tech text-xs font-bold text-amber-900"
                  />
                  <EditableText
                    as="p"
                    multiline
                    value={sec.detail}
                    editMode={editMode}
                    onChange={(v) =>
                      updateContent((p) => {
                        const nextSecs = [...p.poster.sections];
                        nextSecs[idx] = { ...nextSecs[idx], detail: v };
                        return { ...p, poster: { ...p.poster, sections: nextSecs } };
                      })
                    }
                    className="text-xs text-stone-700 leading-relaxed"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Curriculum Vitae Timeline */}
          <div className="space-y-4">
            {content.resume.map((item, idx) => (
              <div
                key={item.id}
                className="rounded-lg border border-stone-800/20 bg-[#FAF8F5] p-6 flex flex-col md:flex-row md:items-start justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <EditableText
                      value={item.category}
                      editMode={editMode}
                      onChange={(v) =>
                        updateContent((p) => {
                          const next = [...p.resume];
                          next[idx] = { ...next[idx], category: v };
                          return { ...p, resume: next };
                        })
                      }
                      className="font-mono-tech text-xs uppercase text-amber-900 font-semibold"
                    />
                    {editMode && (
                      <button
                        onClick={() =>
                          updateContent((p) => ({
                            ...p,
                            resume: p.resume.filter((_, i) => i !== idx),
                          }))
                        }
                        className="text-stone-400 hover:text-red-700 cursor-pointer"
                        title="Delete resume entry"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>

                  <EditableText
                    as="h4"
                    value={item.role}
                    editMode={editMode}
                    onChange={(v) =>
                      updateContent((p) => {
                        const next = [...p.resume];
                        next[idx] = { ...next[idx], role: v };
                        return { ...p, resume: next };
                      })
                    }
                    className="font-serif-editorial text-2xl font-semibold text-stone-900"
                  />

                  <EditableText
                    value={item.org}
                    editMode={editMode}
                    onChange={(v) =>
                      updateContent((p) => {
                        const next = [...p.resume];
                        next[idx] = { ...next[idx], org: v };
                        return { ...p, resume: next };
                      })
                    }
                    className="text-xs font-mono-tech text-stone-600"
                  />

                  <ul className="space-y-1.5 pt-2">
                    {item.highlights.map((hl, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2 text-sm text-stone-700">
                        <span className="text-amber-900 mt-1">•</span>
                        <div className="flex-1">
                          <EditableText
                            multiline
                            value={hl}
                            editMode={editMode}
                            onChange={(v) =>
                              updateContent((p) => {
                                const next = [...p.resume];
                                const nextHl = [...next[idx].highlights];
                                nextHl[hIdx] = v;
                                next[idx] = { ...next[idx], highlights: nextHl };
                                return { ...p, resume: next };
                              })
                            }
                            className="text-sm text-stone-700"
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                  {editMode && (
                    <button
                      onClick={() =>
                        updateContent((p) => {
                          const next = [...p.resume];
                          next[idx] = {
                            ...next[idx],
                            highlights: [...next[idx].highlights, 'New bullet point...'],
                          };
                          return { ...p, resume: next };
                        })
                      }
                      className="text-[11px] font-mono-tech text-amber-900 hover:underline cursor-pointer pt-1"
                    >
                      + Add Bullet Point
                    </button>
                  )}
                </div>

                <div className="md:text-right font-mono-tech text-xs text-stone-600 shrink-0 md:w-44 space-y-1">
                  <EditableText
                    value={item.period}
                    editMode={editMode}
                    onChange={(v) =>
                      updateContent((p) => {
                        const next = [...p.resume];
                        next[idx] = { ...next[idx], period: v };
                        return { ...p, resume: next };
                      })
                    }
                    className="font-mono-tech text-xs font-bold text-stone-900 md:text-right"
                  />
                  <EditableText
                    value={item.location}
                    editMode={editMode}
                    onChange={(v) =>
                      updateContent((p) => {
                        const next = [...p.resume];
                        next[idx] = { ...next[idx], location: v };
                        return { ...p, resume: next };
                      })
                    }
                    className="font-mono-tech text-xs text-stone-500 md:text-right"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FOLIO III: NACE COMPETENCIES (STAR METHOD) */}
        <section id="c4-skills" className="scroll-mt-24 border-b-2 border-stone-900/20 pb-14 space-y-6">
          <div>
            <span className="font-mono-tech text-xs uppercase tracking-widest text-amber-900">
              FOLIO III • 04. NACE COMPETENCIES (MINIMUM 4 VIA STAR METHOD)
            </span>
            <h2 className="font-serif-editorial text-4xl font-semibold mt-1">
              Four Pillars of Career & Global Readiness
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.skills.map((skill, idx) => (
              <div
                key={skill.id}
                className="rounded-lg border border-stone-800/20 bg-[#FAF8F5] p-6 space-y-3 shadow-2xs"
              >
                <div className="flex items-center justify-between text-xs font-mono-tech text-amber-900">
                  <EditableText
                    value={skill.badgeCode}
                    editMode={editMode}
                    onChange={(v) =>
                      updateContent((p) => {
                        const next = [...p.skills];
                        next[idx] = { ...next[idx], badgeCode: v };
                        return { ...p, skills: next };
                      })
                    }
                    className="font-mono-tech text-xs text-amber-900 font-semibold"
                  />
                  <span>STAR METHOD</span>
                </div>

                <EditableText
                  as="h3"
                  value={skill.competency}
                  editMode={editMode}
                  onChange={(v) =>
                    updateContent((p) => {
                      const next = [...p.skills];
                      next[idx] = { ...next[idx], competency: v };
                      return { ...p, skills: next };
                    })
                  }
                  className="font-serif-editorial text-2xl font-semibold text-stone-900"
                />

                <EditableText
                  value={skill.contextTitle}
                  editMode={editMode}
                  onChange={(v) =>
                    updateContent((p) => {
                      const next = [...p.skills];
                      next[idx] = { ...next[idx], contextTitle: v };
                      return { ...p, skills: next };
                    })
                  }
                  className="text-xs font-mono-tech text-stone-500"
                />

                <div className="space-y-2.5 text-xs text-stone-700 pt-3 border-t border-stone-200">
                  {(['situation', 'task', 'action', 'resolution'] as const).map((starKey) => (
                    <div key={starKey} className="rounded bg-[#F4F0EA]/70 p-2.5 border border-stone-200">
                      <span className="font-mono-tech text-[10px] uppercase font-bold text-amber-900 block mb-1">
                        {starKey.toUpperCase()}
                      </span>
                      <EditableText
                        as="p"
                        multiline
                        value={skill.star[starKey]}
                        editMode={editMode}
                        onChange={(v) =>
                          updateContent((p) => {
                            const next = [...p.skills];
                            next[idx] = {
                              ...next[idx],
                              star: { ...next[idx].star, [starKey]: v },
                            };
                            return { ...p, skills: next };
                          })
                        }
                        className="text-xs text-stone-700 leading-relaxed"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FOLIO IV: GLOBAL EXPERIENCES (Expandable Museum Exhibit Plaques) */}
        <section id="c4-experiences" className="scroll-mt-24 border-b-2 border-stone-900/20 pb-14 space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="font-mono-tech text-xs uppercase tracking-widest text-amber-900">
                FOLIO IV • 05. GLOBAL EXPERIENCES (3+ REQUIRED • 300+ WORDS EACH)
              </span>
              <h2 className="font-serif-editorial text-4xl font-semibold mt-1">
                Curated Exhibit Catalog ({content.experiences.length} Field & Campus Exhibits)
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setAllExhibits(true)}
                className="px-3 py-1.5 rounded border border-stone-800/20 bg-[#FAF8F5] text-xs font-mono-tech text-stone-700 hover:border-amber-900 cursor-pointer"
              >
                Expand All Exhibits
              </button>
              <button
                onClick={() => setAllExhibits(false)}
                className="px-3 py-1.5 rounded border border-stone-800/20 bg-[#FAF8F5] text-xs font-mono-tech text-stone-700 hover:border-amber-900 cursor-pointer"
              >
                Collapse All
              </button>
              {editMode && (
                <button
                  onClick={() => {
                    const newId = `exp-${Date.now()}`;
                    updateContent((p) => ({
                      ...p,
                      experiences: [
                        ...p.experiences,
                        {
                          id: newId,
                          title: 'New Global Experience or Coursework Reflection',
                          subtitle: 'Subtitle / Location / Speaker',
                          category: 'Global Campus Activity',
                          location: 'Gainesville, FL',
                          coordinates: '29.6516° N, 82.3248° W',
                          date: 'Fall 2026',
                          hasPersonalPhotos: false,
                          photoSlotLabels: [],
                          photoUrls: [],
                          curatedVisualTheme: 'afro-brazil-archive',
                          tags: ['Global Learning'],
                          body: 'Write your 300+ word reflection here...',
                        },
                      ],
                    }));
                    setExpandedExhibits((prev) => ({ ...prev, [newId]: true }));
                  }}
                  className="inline-flex items-center gap-1 rounded border border-amber-900 bg-amber-900 text-white px-3 py-1.5 text-xs font-mono-tech cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" /> New Exhibit
                </button>
              )}
            </div>
          </div>

          <div className="space-y-5">
            {content.experiences.map((exp, idx) => {
              const isOpen = !!expandedExhibits[exp.id];
              const wordCount = countWords(exp.body);
              return (
                <div
                  key={exp.id}
                  className="rounded-lg border border-stone-800/25 bg-[#FAF8F5] overflow-hidden shadow-2xs"
                >
                  <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FAF8F5] border-b border-stone-200/80">
                    <div className="space-y-1 flex-1">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tech text-amber-900">
                        <span>EXHIBIT 0{idx + 1}</span>
                        <span>•</span>
                        <EditableText
                          value={exp.category}
                          editMode={editMode}
                          onChange={(v) =>
                            updateContent((p) => {
                              const next = [...p.experiences];
                              next[idx] = { ...next[idx], category: v };
                              return { ...p, experiences: next };
                            })
                          }
                          className="font-mono-tech text-xs text-amber-900 font-semibold"
                        />
                        <span>•</span>
                        <EditableText
                          value={exp.date}
                          editMode={editMode}
                          onChange={(v) =>
                            updateContent((p) => {
                              const next = [...p.experiences];
                              next[idx] = { ...next[idx], date: v };
                              return { ...p, experiences: next };
                            })
                          }
                          className="font-mono-tech text-xs text-stone-600"
                        />
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] ${
                            wordCount >= 300
                              ? 'bg-emerald-100 text-emerald-900'
                              : 'bg-amber-100 text-amber-900'
                          }`}
                        >
                          {wordCount} words
                        </span>
                      </div>

                      <EditableText
                        as="h3"
                        value={exp.title}
                        editMode={editMode}
                        onChange={(v) =>
                          updateContent((p) => {
                            const next = [...p.experiences];
                            next[idx] = { ...next[idx], title: v };
                            return { ...p, experiences: next };
                          })
                        }
                        className="font-serif-editorial text-2xl sm:text-3xl font-semibold text-stone-900"
                      />

                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tech text-stone-500">
                        <EditableText
                          value={exp.subtitle}
                          editMode={editMode}
                          onChange={(v) =>
                            updateContent((p) => {
                              const next = [...p.experiences];
                              next[idx] = { ...next[idx], subtitle: v };
                              return { ...p, experiences: next };
                            })
                          }
                          className="font-mono-tech text-xs text-stone-600"
                        />
                        <span>—</span>
                        <EditableText
                          value={exp.location}
                          editMode={editMode}
                          onChange={(v) =>
                            updateContent((p) => {
                              const next = [...p.experiences];
                              next[idx] = { ...next[idx], location: v };
                              return { ...p, experiences: next };
                            })
                          }
                          className="font-mono-tech text-xs text-stone-500"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {editMode && content.experiences.length > 1 && (
                        <button
                          onClick={() =>
                            updateContent((p) => ({
                              ...p,
                              experiences: p.experiences.filter((_, i) => i !== idx),
                            }))
                          }
                          className="p-2 text-stone-400 hover:text-red-700 cursor-pointer"
                          title="Delete Exhibit"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={() => toggleExhibit(exp.id)}
                        className="inline-flex items-center gap-1.5 rounded border border-stone-800/20 bg-[#F4F0EA] px-3 py-1.5 font-mono-tech text-xs text-stone-700 hover:border-amber-900 cursor-pointer"
                      >
                        <span>{isOpen ? 'Collapse Plaque' : 'Read Exhibit'}</span>
                        {isOpen ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {isOpen && (
                    <div className="p-6 space-y-5">
                      {/* Visual Header (Curated Diagram or Personal Photo Gallery) */}
                      <ExperienceVisualHeader
                        item={{
                          ...exp,
                          category: exp.category as
                            | 'International Travel & Immersion'
                            | 'Global Campus Activity'
                            | 'International Research & Coursework',
                          curatedVisualTheme: exp.curatedVisualTheme as
                            | 'hydrology-pine'
                            | 'afro-brazil-archive'
                            | 'harn-aperture'
                            | 'populism-kaleidoscope'
                            | 'andes-climbing'
                            | 'iceland-glacier',
                          mapX: 30,
                          mapY: 50,
                          summaryPlaceholder: '',
                        }}
                        variant="museum"
                      />

                      {/* Uploaded Personal Photos Preview/Uploader for Colombia & Iceland */}
                      {exp.hasPersonalPhotos && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {(exp.photoSlotLabels || []).map((slotLabel, pIdx) => {
                            const existingUrl = exp.photoUrls?.[pIdx] || '';
                            return (
                              <div
                                key={pIdx}
                                className="rounded border border-stone-300 bg-[#F4F0EA]/60 p-3 flex flex-col justify-between gap-2"
                              >
                                {existingUrl ? (
                                  <img
                                    src={existingUrl}
                                    alt={slotLabel}
                                    className="h-40 w-full object-cover rounded border border-stone-300"
                                  />
                                ) : (
                                  <div className="h-32 rounded border border-dashed border-stone-400 bg-stone-200/50 flex flex-col items-center justify-center p-3 text-center text-xs text-stone-500 font-mono-tech">
                                    <span>Photo Plate 0{pIdx + 1}</span>
                                  </div>
                                )}
                                <div className="flex items-center justify-between gap-2">
                                  <EditableText
                                    value={slotLabel}
                                    editMode={editMode}
                                    onChange={(v) =>
                                      updateContent((p) => {
                                        const next = [...p.experiences];
                                        const nextLabels = [...(next[idx].photoSlotLabels || [])];
                                        nextLabels[pIdx] = v;
                                        next[idx] = { ...next[idx], photoSlotLabels: nextLabels };
                                        return { ...p, experiences: next };
                                      })
                                    }
                                    className="text-xs font-mono-tech text-stone-700"
                                  />
                                  {editMode && (
                                    <button
                                      onClick={() =>
                                        handleImageFileUpload((dataUrl) =>
                                          updateContent((p) => {
                                            const next = [...p.experiences];
                                            const nextUrls = [...(next[idx].photoUrls || ['', '', ''])];
                                            nextUrls[pIdx] = dataUrl;
                                            next[idx] = { ...next[idx], photoUrls: nextUrls };
                                            return { ...p, experiences: next };
                                          })
                                        )
                                      }
                                      className="inline-flex items-center gap-1 rounded bg-amber-900/10 px-2 py-1 text-[10px] font-mono-tech text-amber-900 hover:bg-amber-900 hover:text-white cursor-pointer shrink-0"
                                    >
                                      <ImagePlus className="h-3 w-3" /> Upload
                                    </button>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Full Essay Reflection Body */}
                      <EditableText
                        as="div"
                        multiline
                        showWordCount
                        wordCountTarget={{ min: 300, label: '300+ words recommended' }}
                        value={exp.body}
                        editMode={editMode}
                        onChange={(v) =>
                          updateContent((p) => {
                            const next = [...p.experiences];
                            next[idx] = { ...next[idx], body: v };
                            return { ...p, experiences: next };
                          })
                        }
                        className="text-base text-stone-800 leading-relaxed font-serif-editorial text-[19px]"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* FOLIO V: FINAL REFLECTION (Essayist Longform Layout) */}
        <section id="c4-reflection" className="scroll-mt-24">
          <div className="rounded-lg border-2 border-stone-800/30 bg-[#FAF8F5] p-8 sm:p-12 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono-tech text-xs uppercase tracking-widest text-amber-900">
                FOLIO V • 06. FINAL REFLECTION ("SO WHAT? NOW WHAT?")
              </span>
              <span
                className={`rounded border px-2.5 py-0.5 font-mono-tech text-xs ${
                  totalReflectionWords >= 700
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                    : 'border-amber-500 bg-amber-50 text-amber-900'
                }`}
              >
                Total Reflection Length: {totalReflectionWords} / 700+ words
              </span>
            </div>

            <EditableText
              as="h2"
              value={content.reflection.title}
              editMode={editMode}
              onChange={(v) =>
                updateContent((p) => ({
                  ...p,
                  reflection: { ...p.reflection, title: v },
                }))
              }
              className="font-serif-editorial text-4xl sm:text-5xl font-semibold mt-2 text-stone-900"
            />

            <blockquote className="my-8 border-y border-stone-300 py-6 font-serif-editorial italic text-2xl text-stone-800 text-center">
              <EditableText
                as="span"
                multiline
                value={content.reflection.leadPullQuote}
                editMode={editMode}
                onChange={(v) =>
                  updateContent((p) => ({
                    ...p,
                    reflection: { ...p.reflection, leadPullQuote: v },
                  }))
                }
                className="font-serif-editorial italic text-2xl text-stone-800 text-center"
              />
            </blockquote>

            <div className="space-y-8">
              {content.reflection.pillars.map((pil, idx) => (
                <div key={pil.id} className="space-y-2 border-b border-stone-200 pb-6 last:border-b-0">
                  <div className="flex items-center justify-between">
                    <EditableText
                      as="h3"
                      value={pil.heading}
                      editMode={editMode}
                      onChange={(v) =>
                        updateContent((p) => {
                          const nextPillars = [...p.reflection.pillars];
                          nextPillars[idx] = { ...nextPillars[idx], heading: v };
                          return {
                            ...p,
                            reflection: { ...p.reflection, pillars: nextPillars },
                          };
                        })
                      }
                      className="font-serif-editorial text-2xl font-bold text-stone-900"
                    />
                    {editMode && content.reflection.pillars.length > 1 && (
                      <button
                        onClick={() =>
                          updateContent((p) => ({
                            ...p,
                            reflection: {
                              ...p.reflection,
                              pillars: p.reflection.pillars.filter((_, i) => i !== idx),
                            },
                          }))
                        }
                        className="text-stone-400 hover:text-red-700 cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <EditableText
                    as="p"
                    multiline
                    showWordCount
                    value={pil.body}
                    editMode={editMode}
                    onChange={(v) =>
                      updateContent((p) => {
                        const nextPillars = [...p.reflection.pillars];
                        nextPillars[idx] = { ...nextPillars[idx], body: v };
                        return {
                          ...p,
                          reflection: { ...p.reflection, pillars: nextPillars },
                        };
                      })
                    }
                    className="text-stone-800 leading-relaxed font-serif-editorial text-[19px]"
                  />
                </div>
              ))}
            </div>

            {editMode && (
              <div className="mt-6">
                <button
                  onClick={() =>
                    updateContent((p) => ({
                      ...p,
                      reflection: {
                        ...p.reflection,
                        pillars: [
                          ...p.reflection.pillars,
                          {
                            id: `pil-${Date.now()}`,
                            heading: 'IV. New Reflection Section',
                            body: 'Continue your reflection synthesis here...',
                          },
                        ],
                      },
                    }))
                  }
                  className="inline-flex items-center gap-1.5 rounded border border-amber-900 bg-amber-900/10 px-3.5 py-2 font-mono-tech text-xs text-amber-900 hover:bg-amber-900 hover:text-white cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Reflection Section
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Reykjavik Poster Fullscreen Lightbox Modal */}
      {posterLightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/80 p-6 backdrop-blur-xs">
          <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl border border-stone-700 bg-[#FAF8F5] p-8 text-stone-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-300 pb-4">
              <div>
                <span className="font-mono-tech text-xs text-amber-900 font-semibold">
                  {content.poster.plateNumber}
                </span>
                <h3 className="font-serif-editorial text-3xl font-bold mt-0.5">
                  {content.poster.title}
                </h3>
              </div>
              <button
                onClick={() => setPosterLightboxOpen(false)}
                className="rounded-lg border border-stone-300 p-2 hover:bg-stone-200 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 space-y-6">
              {content.poster.imageUrl ? (
                <img
                  src={content.poster.imageUrl}
                  alt={content.poster.title}
                  className="w-full rounded border border-stone-300"
                />
              ) : (
                <div className="aspect-[16/10] rounded-lg border-2 border-dashed border-amber-900/40 bg-[#F4F0EA] flex flex-col items-center justify-center p-8 text-center">
                  <p className="font-serif-editorial text-2xl font-semibold text-stone-800">
                    Reykjavik Research Poster High-Resolution Canvas
                  </p>
                  <p className="text-xs font-mono-tech text-stone-500 mt-2 max-w-md">
                    Click "Upload Poster Image" in Edit Mode to attach your Reykjavik conference poster PNG/JPG, or share the file in chat!
                  </p>
                </div>
              )}
              <p className="text-sm text-stone-700 leading-relaxed">{content.poster.abstract}</p>
            </div>
          </div>
        </div>
      )}

      {/* Floating Interactive Editor & Auto-Save Control Bar */}
      <div className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2 w-[95%] max-w-3xl rounded-2xl border border-stone-700/80 bg-[#1C1917]/95 px-4 py-3 text-stone-100 shadow-2xl backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setEditMode((prev) => !prev)}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-mono-tech font-semibold transition-all cursor-pointer ${
                editMode
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'bg-stone-800 text-stone-200 hover:bg-stone-700'
              }`}
            >
              {editMode ? (
                <>
                  <Edit3 className="h-3.5 w-3.5" />
                  Live Edit Mode: ON
                </>
              ) : (
                <>
                  <Eye className="h-3.5 w-3.5" />
                  Reader Preview Mode
                </>
              )}
            </button>

            <div className="text-xs font-mono-tech text-stone-300 flex items-center gap-1.5">
              <CheckCircle2
                className={`h-4 w-4 ${
                  saveStatus === 'saved'
                    ? 'text-emerald-400'
                    : saveStatus === 'saving'
                    ? 'text-amber-400 animate-spin'
                    : 'text-amber-300'
                }`}
              />
              <span>
                {saveStatus === 'saved' && `Saved to codebase (${lastSavedTime})`}
                {saveStatus === 'saving' && 'Saving to portfolioContent.json...'}
                {saveStatus === 'unsaved' && 'Typing...'}
                {saveStatus === 'error' && 'Saved in browser cache'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => persistContent(content)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-stone-700 bg-stone-800/90 px-3 py-1.5 text-xs font-mono-tech text-stone-200 hover:bg-stone-700 cursor-pointer"
              title="Force save to src/data/portfolioContent.json"
            >
              <Save className="h-3.5 w-3.5 text-amber-400" />
              Save Now
            </button>

            <button
              onClick={exportJsonBackup}
              className="inline-flex items-center gap-1.5 rounded-lg border border-stone-700 bg-stone-800/90 px-3 py-1.5 text-xs font-mono-tech text-stone-200 hover:bg-stone-700 cursor-pointer"
              title="Download JSON backup"
            >
              <Download className="h-3.5 w-3.5" />
              Export JSON
            </button>

            <button
              onClick={() => {
                if (window.confirm('Reset all edits back to the default repository content?')) {
                  localStorage.removeItem(STORAGE_KEY);
                  setContent(initialPortfolioData);
                  persistContent(initialPortfolioData);
                }
              }}
              className="inline-flex items-center gap-1 rounded-lg border border-stone-700 bg-stone-800/90 px-2.5 py-1.5 text-xs font-mono-tech text-stone-400 hover:text-red-300 cursor-pointer"
              title="Reset to default"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
