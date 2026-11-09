import React, { useEffect, useRef, useState } from 'react';
import {
  Award,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Download,
  Edit3,
  ExternalLink,
  Eye,
  Feather,
  FileText,
  ImagePlus,
  Maximize2,
  Plus,
  RotateCcw,
  Save,
  Stamp,
  Trash2,
  Wrench,
  X,
} from 'lucide-react';
import initialPortfolioData from '../data/portfolioContent.json';
import { RUBRIC_SECTIONS } from '../data/shellData';
import { ExperienceVisualHeader } from '../components/CuratedVisuals';
import { EditableText } from '../components/EditableText';
import { Component as ImageAutoSlider } from '@/components/ui/image-auto-slider';

export type PortfolioContent = typeof initialPortfolioData;

const STORAGE_KEY = 'uf_isp_folio_content_v11';

// Set to true in code to re-enable the live editor toolbar & keyboard shortcut
const ENABLE_LIVE_EDITOR = false;

const RESUME_CATEGORIES = [
  'All',
  'Education',
  'Research Experience',
  'Work Experience',
  'Other Educational Experiences',
] as const;

export const Concept4MuseumFolio: React.FC = () => {
  const [content, setContent] = useState<PortfolioContent>(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        return { ...initialPortfolioData, ...JSON.parse(cached) };
      }
    } catch {
      // ignore parse errors
    }
    return initialPortfolioData;
  });

  const [editMode, setEditMode] = useState<boolean>(ENABLE_LIVE_EDITOR);
  const [activePage, setActivePage] = useState<'home' | 'portfolio'>('home');
  const [activeSectionId, setActiveSectionId] = useState<string>('home');
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved' | 'error'>('saved');
  const [lastSavedTime, setLastSavedTime] = useState<string>('Synced with repo');
  const [lightboxMedia, setLightboxMedia] = useState<
    'poster' | 'impress' | { title: string; subtitle: string; imageUrl: string; caption: string } | null
  >(null);
  const [activeResumeCategory, setActiveResumeCategory] = useState<string>('All');
  const [collapsedResumeIds, setCollapsedResumeIds] = useState<Record<string, boolean>>({});
  const [expandedExhibits, setExpandedExhibits] = useState<Record<string, boolean>>({
    'iceland-reykjavik': true,
    'colombia-bogota': true,
    'uf-harn-one-world': true,
    'uf-cross-cultural-talks': true,
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
        setLastSavedTime(
          new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })
        );
      } else {
        setSaveStatus('error');
      }
    } catch {
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

  // Keyboard shortcut Cmd/Ctrl + E to toggle Edit Mode (when ENABLE_LIVE_EDITOR is true)
  useEffect(() => {
    if (!ENABLE_LIVE_EDITOR) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        setEditMode((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Track active section while scrolling on the main portfolio page
  useEffect(() => {
    if (activePage !== 'portfolio') {
      setActiveSectionId('home');
      return;
    }

    const sectionIds = ['about', 'resume', 'skills', 'experiences', 'reflection'];

    const updateActiveOnScroll = () => {
      // If scrolled near the very bottom of the page, highlight Final Reflection
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 80
      ) {
        setActiveSectionId('reflection');
        return;
      }

      const triggerLine = 180;
      let current = 'about';
      for (const id of sectionIds) {
        const el = document.getElementById(`c4-${id}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerLine) {
            current = id;
          }
        }
      }
      setActiveSectionId(current);
    };

    window.addEventListener('scroll', updateActiveOnScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateActiveOnScroll);
  }, [activePage]);

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

  const toggleResumeCard = (id: string) => {
    setCollapsedResumeIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const enterPortfolio = (targetSectionId?: string) => {
    const target = targetSectionId && targetSectionId !== 'home' ? targetSectionId : 'about';
    setActivePage('portfolio');
    setActiveSectionId(target);
    window.setTimeout(() => {
      if (target !== 'about') {
        const el = document.getElementById(`c4-${target}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 40);
  };

  const jumpTo = (id: string) => {
    if (id === 'home') {
      setActivePage('home');
      setActiveSectionId('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (activePage !== 'portfolio') {
      enterPortfolio(id);
      return;
    }
    setActiveSectionId(id);
    const el = document.getElementById(`c4-${id}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToHomeSummary = () => {
    const el = document.getElementById('home-summary-section');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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

  const impressPaper = content.impressPaper || initialPortfolioData.impressPaper;
  const resumeMeta = content.resumeMeta || initialPortfolioData.resumeMeta;
  const heroSlides = content.heroSliderImages || initialPortfolioData.heroSliderImages;
  const homeButtonLabel = content.homeButtonLabel || initialPortfolioData.homeButtonLabel;
  const homeGuideTitle = content.homeGuideTitle || initialPortfolioData.homeGuideTitle;
  const homeGuideSubtitle = content.homeGuideSubtitle || initialPortfolioData.homeGuideSubtitle;
  const homeReviewerTips = content.homeReviewerTips || initialPortfolioData.homeReviewerTips;
  const homeDirectoryCards = content.homeDirectoryCards || initialPortfolioData.homeDirectoryCards;

  const updateReviewerTip = (idx: number, val: string) => {
    updateContent((p) => {
      const nextTips = [...(p.homeReviewerTips || initialPortfolioData.homeReviewerTips)];
      nextTips[idx] = val;
      return { ...p, homeReviewerTips: nextTips };
    });
  };

  const updateDirectoryCard = (
    idx: number,
    field: 'title' | 'tag' | 'description',
    val: string
  ) => {
    updateContent((p) => {
      const nextCards = [...(p.homeDirectoryCards || initialPortfolioData.homeDirectoryCards)];
      nextCards[idx] = { ...nextCards[idx], [field]: val };
      return { ...p, homeDirectoryCards: nextCards };
    });
  };

  const renderFullBleedHeroSlider = (
    overlayContent: React.ReactNode,
    heightClassName = 'h-[78vh] sm:h-[84vh] min-h-[520px] max-h-[860px]'
  ) => (
    <ImageAutoSlider
      images={heroSlides}
      editMode={editMode}
      speedSeconds={52}
      variant="hero-fullbleed"
      heightClassName={heightClassName}
      overlayContent={overlayContent}
      onReplaceImage={(idx) =>
        handleImageFileUpload((dataUrl) => {
          const captionPrompt = window.prompt(
            'Optional slide caption:',
            heroSlides[idx]?.caption || ''
          );
          updateContent((p) => {
            const currentList = [...(p.heroSliderImages || initialPortfolioData.heroSliderImages)];
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
            window.prompt('Caption for this new slide:', 'Field Photo') || 'Field Photo';
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
  );

  const filteredResume = content.resume.filter(
    (item) => activeResumeCategory === 'All' || item.category === activeResumeCategory
  );

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
          <div
            onClick={() => {
              if (!editMode) jumpTo('home');
            }}
            className="flex items-center gap-3 cursor-pointer"
          >
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
            {RUBRIC_SECTIONS.map((sec) => {
              const isActive =
                (activePage === 'home' && sec.id === 'home') ||
                (activePage === 'portfolio' && activeSectionId === sec.id);
              return (
                <button
                  key={sec.id}
                  onClick={() => jumpTo(sec.id)}
                  className={`px-3 py-1.5 rounded border text-xs font-mono-tech transition-colors cursor-pointer ${
                    isActive
                      ? 'border-amber-900 bg-amber-900 text-white shadow-2xs'
                      : 'border-stone-800/20 bg-[#FAF8F5] text-stone-800 hover:border-amber-900 hover:bg-amber-900 hover:text-white'
                  }`}
                >
                  {sec.label}
                </button>
              );
            })}
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
                <code className="bg-amber-950/70 px-1.5 py-0.5 rounded">
                  src/data/portfolioContent.json
                </code>
                .
              </span>
            </div>
            <span className="text-amber-200">
              Toggle Reader Preview anytime in the bottom toolbar (or press Cmd/Ctrl + E)
            </span>
          </div>
        </div>
      )}

      {/* ==================== STANDALONE HOME PAGE VIEW (activePage === 'home') ==================== */}
      {activePage === 'home' && (
        <div id="c4-home" className="w-full">
          {/* 1. Full-Webpage Horizontal Scroller with Cinematic Lower-Third Editorial Overlay */}
          {renderFullBleedHeroSlider(
            <div className="relative h-full w-full flex flex-col justify-end bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-950/10 p-6 sm:p-12 md:p-16">
              <div className="mx-auto w-full max-w-6xl flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="pointer-events-auto space-y-3 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2 font-mono-tech text-xs">
                    <span className="rounded border border-amber-700/60 bg-amber-900 px-3 py-1 font-bold text-amber-50 uppercase tracking-wider shadow-sm">
                      <EditableText
                        value={content.graduation}
                        editMode={editMode}
                        onChange={(v) => updateContent((p) => ({ ...p, graduation: v }))}
                        className="font-mono-tech text-xs font-bold text-amber-50"
                      />
                    </span>
                    <span className="rounded border border-white/25 bg-stone-900/85 px-3 py-1 text-stone-100 backdrop-blur-xs">
                      <EditableText
                        value={content.majors}
                        editMode={editMode}
                        onChange={(v) => updateContent((p) => ({ ...p, majors: v }))}
                        className="font-mono-tech text-xs text-stone-100"
                      />
                    </span>
                    <span className="rounded border border-white/20 bg-stone-900/80 px-3 py-1 text-stone-200 backdrop-blur-xs">
                      <EditableText
                        value={content.minor}
                        editMode={editMode}
                        onChange={(v) => updateContent((p) => ({ ...p, minor: v }))}
                        className="font-mono-tech text-xs text-stone-200"
                      />
                    </span>
                  </div>

                  <EditableText
                    as="h1"
                    value={content.name}
                    editMode={editMode}
                    onChange={(v) => updateContent((p) => ({ ...p, name: v }))}
                    className="font-serif-editorial text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]"
                  />

                  <EditableText
                    as="p"
                    multiline
                    value={content.tagline}
                    editMode={editMode}
                    onChange={(v) => updateContent((p) => ({ ...p, tagline: v }))}
                    className="font-serif-editorial text-xl sm:text-3xl text-stone-200 max-w-2xl leading-snug drop-shadow"
                  />
                </div>

                <button
                  type="button"
                  onClick={scrollToHomeSummary}
                  className="pointer-events-auto self-start md:self-end inline-flex items-center gap-2 rounded-xl border border-amber-700/70 bg-amber-900/95 px-5 py-3 font-mono-tech text-xs uppercase tracking-widest text-amber-50 hover:bg-amber-800 transition-colors cursor-pointer shadow-lg backdrop-blur-md"
                >
                  <span>Read Summary Below</span>
                  <ChevronDown className="h-4 w-4 animate-bounce" />
                </button>
              </div>
            </div>,
            'h-[80vh] sm:h-[86vh] min-h-[540px] max-h-[880px]'
          )}

          {/* 2. Summary Text + Enter Website Button Section Below Scroller */}
          <div id="home-summary-section" className="bg-[#1C1917] text-stone-100 border-b border-stone-800">
            <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24 space-y-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-4 space-y-3 border-l-2 border-amber-800 pl-5">
                  <div className="font-mono-tech text-xs uppercase tracking-widest text-[#D97757] font-semibold">
                    UF INTERNATIONAL SCHOLARS PROGRAM
                  </div>
                  <EditableText
                    as="h2"
                    multiline
                    value={content.tagline}
                    editMode={editMode}
                    onChange={(v) => updateContent((p) => ({ ...p, tagline: v }))}
                    className="font-serif-editorial text-3xl sm:text-4xl font-semibold text-white leading-tight"
                  />
                </div>

                <div className="lg:col-span-8 space-y-8">
                  <EditableText
                    as="div"
                    multiline
                    value={content.homeIntro}
                    editMode={editMode}
                    onChange={(v) => updateContent((p) => ({ ...p, homeIntro: v }))}
                    className="leading-relaxed text-stone-200 font-serif-editorial text-xl sm:text-2xl"
                  />

                  {/* 3. Prominent Button Under the Summary Text */}
                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() => enterPortfolio('about')}
                      className="inline-flex items-center justify-center gap-3 rounded-xl border border-amber-700/60 bg-amber-900 px-8 py-4 text-sm sm:text-base font-mono-tech uppercase tracking-wider font-bold text-amber-50 shadow-xl hover:bg-amber-800 transition-all cursor-pointer"
                    >
                      <EditableText
                        as="span"
                        value={homeButtonLabel}
                        editMode={editMode}
                        onChange={(v) => updateContent((p) => ({ ...p, homeButtonLabel: v }))}
                        className="font-mono-tech text-sm sm:text-base font-bold text-amber-50"
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Direct Chapter Cards */}
              <div className="pt-8 border-t border-stone-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {homeDirectoryCards.map((card, idx) => (
                  <div
                    key={card.id}
                    onClick={() => {
                      if (!editMode) enterPortfolio(card.id);
                    }}
                    className="text-left rounded-lg border border-stone-800 bg-stone-900/90 p-4 hover:border-amber-800 transition-colors cursor-pointer flex flex-col justify-between gap-2"
                  >
                    <div>
                      <div className="font-mono-tech text-xs font-bold text-[#D97757]">
                        {card.sectionNumber}.{' '}
                        <EditableText
                          as="span"
                          value={card.title}
                          editMode={editMode}
                          onChange={(v) => updateDirectoryCard(idx, 'title', v)}
                          className="font-mono-tech text-xs font-bold text-[#D97757]"
                        />
                      </div>
                      <EditableText
                        as="p"
                        multiline
                        value={card.description}
                        editMode={editMode}
                        onChange={(v) => updateDirectoryCard(idx, 'description', v)}
                        className="text-xs text-stone-400 mt-1 leading-relaxed"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        enterPortfolio(card.id);
                      }}
                      className="text-left font-mono-tech text-[10px] uppercase text-[#E29578] pt-2 border-t border-stone-800 hover:underline cursor-pointer"
                    >
                      Open Section →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== MAIN SCROLLING PORTFOLIO VIEW (activePage === 'portfolio') ==================== */}
      {activePage === 'portfolio' && (
      <main className="mx-auto max-w-6xl px-6 py-10 space-y-20">
        {/* Return to Standalone Home Page Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-800/15 pb-4">
          <button
            type="button"
            onClick={() => jumpTo('home')}
            className="inline-flex items-center gap-2 rounded-lg border border-stone-800/25 bg-[#FAF8F5] px-4 py-2 font-mono-tech text-xs text-stone-800 hover:border-amber-900 hover:bg-amber-900 hover:text-white transition-colors cursor-pointer"
          >
            ← Back to 01. Home Page
          </button>
          <span className="font-mono-tech text-xs text-stone-500">
            Main Portfolio View • Scroll continuously through Sections 02–06
          </span>
        </div>

        {/* FOLIO I-B: 02. ABOUT ME (Dedicated Standalone Section) */}
        <section id="c4-about" className="scroll-mt-24 border-b-2 border-stone-900/20 pb-14 space-y-6">
          <div className="space-y-1">
            <span className="font-mono-tech text-xs uppercase tracking-widest text-amber-900">
              FOLIO I-B • 02. ABOUT ME
            </span>
            <EditableText
              as="h2"
              value={content.aboutTitle}
              editMode={editMode}
              onChange={(v) => updateContent((p) => ({ ...p, aboutTitle: v }))}
              className="font-serif-editorial text-4xl font-semibold text-stone-900"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 rounded-lg border border-stone-800/20 bg-[#FAF8F5] p-6 sm:p-8 shadow-2xs">
              <EditableText
                as="div"
                multiline
                value={content.aboutBio}
                editMode={editMode}
                onChange={(v) => updateContent((p) => ({ ...p, aboutBio: v }))}
                className="text-base sm:text-lg text-stone-800 leading-relaxed font-serif-editorial"
              />
            </div>

            <div className="lg:col-span-5 grid grid-cols-1 gap-4">
              <div className="p-5 rounded-lg border border-stone-800/20 bg-[#FAF8F5] shadow-2xs">
                <div className="font-mono-tech text-xs uppercase font-bold text-amber-900 mb-2">
                  Earth & Microbial Science Lens
                </div>
                <EditableText
                  as="p"
                  multiline
                  value={content.scientificLens}
                  editMode={editMode}
                  onChange={(v) => updateContent((p) => ({ ...p, scientificLens: v }))}
                  className="text-sm text-stone-700 leading-relaxed"
                />
              </div>
              <div className="p-5 rounded-lg border border-stone-800/20 bg-[#FAF8F5] shadow-2xs">
                <div className="font-mono-tech text-xs uppercase font-bold text-amber-900 mb-2">
                  Historical & Global Service Lens
                </div>
                <EditableText
                  as="p"
                  multiline
                  value={content.humanitiesLens}
                  editMode={editMode}
                  onChange={(v) => updateContent((p) => ({ ...p, humanitiesLens: v }))}
                  className="text-sm text-stone-700 leading-relaxed"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FOLIO II: ACADEMIC RESEARCH & CURRICULUM VITAE */}
        <section id="c4-resume" className="scroll-mt-24 border-b-2 border-stone-900/20 pb-14 space-y-12">
          <div className="space-y-2">
            <span className="font-mono-tech text-xs uppercase tracking-widest text-amber-900">
              FOLIO II • 03. FEATURED ASTROBIOLOGY RESEARCH & VERBATIM CURRICULUM VITAE
            </span>
            <h2 className="font-serif-editorial text-4xl font-semibold text-stone-900">
              International Research Presentations, Publications & Full CV
            </h2>
          </div>

          {/* TWO-COLUMN ACADEMIC RESEARCH SECTION (Reykjavik Poster + IMPRESS Paper) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* COLUMN 1: REYKJAVIK POSTER PRESENTATION */}
            <div className="rounded-lg border-2 border-stone-800/25 bg-[#FAF8F5] p-6 sm:p-7 flex flex-col justify-between space-y-5 shadow-2xs">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2 border-b border-stone-300 pb-3">
                  <EditableText
                    value={content.poster.plateNumber}
                    editMode={editMode}
                    onChange={(v) =>
                      updateContent((p) => ({ ...p, poster: { ...p.poster, plateNumber: v } }))
                    }
                    className="text-[11px] font-mono-tech uppercase text-amber-900 font-semibold"
                  />
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
                      className="inline-flex items-center gap-1 rounded border border-amber-900/40 bg-amber-50 px-2.5 py-1 text-[10px] font-mono-tech text-amber-900 hover:bg-amber-100 cursor-pointer shrink-0"
                    >
                      <ImagePlus className="h-3 w-3" /> Swap Poster
                    </button>
                  )}
                </div>

                {/* High-Resolution Poster Image at Top of Column 1 (Vertical 3:4 aspect ratio, zoomed in) */}
                <div
                  onClick={() => setLightboxMedia('poster')}
                  className="group relative aspect-[3/4] w-full overflow-hidden rounded-lg border border-stone-300 bg-white cursor-pointer shadow-xs"
                  title="Click to inspect full-resolution poster in Lightbox"
                >
                  <img
                    src={content.poster.imageUrl || '/images/research/poster.jpg'}
                    alt={content.poster.title}
                    className="h-full w-full object-cover object-top scale-[1.04] transition-transform duration-300 group-hover:scale-[1.07]"
                  />
                  <div className="inset-x-0 bottom-0 absolute bg-gradient-to-t from-stone-950/85 via-stone-950/35 to-transparent p-3 flex items-center justify-between text-xs font-mono-tech text-white">
                    <span>Click to Expand High-Resolution Poster</span>
                    <Maximize2 className="h-4 w-4 shrink-0" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <EditableText
                    as="h3"
                    value={content.poster.title}
                    editMode={editMode}
                    onChange={(v) =>
                      updateContent((p) => ({ ...p, poster: { ...p.poster, title: v } }))
                    }
                    className="font-serif-editorial text-2xl sm:text-3xl font-semibold text-stone-900 leading-tight"
                  />
                  <EditableText
                    value={content.poster.subtitle}
                    editMode={editMode}
                    onChange={(v) =>
                      updateContent((p) => ({ ...p, poster: { ...p.poster, subtitle: v } }))
                    }
                    className="text-xs font-mono-tech text-amber-900 font-medium block"
                  />
                  <EditableText
                    value={content.poster.authors}
                    editMode={editMode}
                    onChange={(v) =>
                      updateContent((p) => ({ ...p, poster: { ...p.poster, authors: v } }))
                    }
                    className="text-[11px] font-mono-tech text-stone-500 block"
                  />
                </div>

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

                {/* 4 Key Technical Sub-Boxes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {content.poster.sections.map((sec, idx) => (
                    <div
                      key={sec.id}
                      className="rounded border border-stone-300/90 bg-[#F4F0EA]/70 p-3 space-y-1"
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
                        className="font-mono-tech text-[11px] font-bold text-amber-900"
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

              {/* Bottom Actions for Column 1 */}
              <div className="pt-4 border-t border-stone-300 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => setLightboxMedia('poster')}
                  className="inline-flex items-center gap-2 rounded bg-stone-900 px-4 py-2.5 text-xs font-mono-tech font-semibold text-stone-100 hover:bg-amber-900 transition-colors cursor-pointer"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                  Open Poster Lightbox
                </button>
                <a
                  href="/images/research/Poster.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded border border-stone-800/30 bg-white px-3.5 py-2 text-xs font-mono-tech text-stone-800 hover:border-amber-900 transition-colors"
                >
                  <FileText className="h-3.5 w-3.5 text-amber-900" />
                  Open Original Poster PDF ↗
                </a>
              </div>
            </div>

            {/* COLUMN 2: IMPRESS ASTROBIOLOGY COVER PAPER */}
            <div className="rounded-lg border-2 border-stone-800/25 bg-[#FAF8F5] p-6 sm:p-7 flex flex-col justify-between space-y-5 shadow-2xs">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2 border-b border-stone-300 pb-3">
                  <EditableText
                    value={impressPaper.plateNumber}
                    editMode={editMode}
                    onChange={(v) =>
                      updateContent((p) => ({
                        ...p,
                        impressPaper: { ...impressPaper, plateNumber: v },
                      }))
                    }
                    className="text-[11px] font-mono-tech uppercase text-amber-900 font-semibold"
                  />
                  {editMode && (
                    <button
                      onClick={() =>
                        handleImageFileUpload((dataUrl) =>
                          updateContent((p) => ({
                            ...p,
                            impressPaper: { ...impressPaper, imageUrl: dataUrl },
                          }))
                        )
                      }
                      className="inline-flex items-center gap-1 rounded border border-amber-900/40 bg-amber-50 px-2.5 py-1 text-[10px] font-mono-tech text-amber-900 hover:bg-amber-100 cursor-pointer shrink-0"
                    >
                      <ImagePlus className="h-3 w-3" /> Swap Artwork
                    </button>
                  )}
                </div>

                {/* IMPRESS Cover Artwork at Top of Column 2 (Matching vertical 3:4 aspect ratio, zoomed out to show full cover art) */}
                <div
                  onClick={() => setLightboxMedia('impress')}
                  className="group relative aspect-[3/4] w-full overflow-hidden rounded-lg border border-stone-300 bg-stone-950 cursor-pointer shadow-xs"
                  title="Click to inspect IMPRESS cover artwork in Lightbox"
                >
                  <img
                    src={impressPaper.imageUrl || '/images/research/impress-cover.jpg'}
                    alt={impressPaper.title}
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  <div className="inset-x-0 bottom-0 absolute bg-gradient-to-t from-black/85 via-black/35 to-transparent p-3 flex items-center justify-between text-xs font-mono-tech text-amber-100">
                    <span>Penetrator Landing Concept Art by Micah Dale Alpern</span>
                    <Maximize2 className="h-4 w-4 shrink-0" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <EditableText
                    as="h3"
                    value={impressPaper.title}
                    editMode={editMode}
                    onChange={(v) =>
                      updateContent((p) => ({
                        ...p,
                        impressPaper: { ...impressPaper, title: v },
                      }))
                    }
                    className="font-serif-editorial text-2xl sm:text-3xl font-semibold text-stone-900 leading-tight"
                  />
                  <EditableText
                    value={impressPaper.citation}
                    editMode={editMode}
                    onChange={(v) =>
                      updateContent((p) => ({
                        ...p,
                        impressPaper: { ...impressPaper, citation: v },
                      }))
                    }
                    className="text-xs font-mono-tech text-amber-900 font-medium block"
                  />
                </div>

                <EditableText
                  as="p"
                  multiline
                  value={impressPaper.summary}
                  editMode={editMode}
                  onChange={(v) =>
                    updateContent((p) => ({
                      ...p,
                      impressPaper: { ...impressPaper, summary: v },
                    }))
                  }
                  className="text-sm text-stone-700 leading-relaxed"
                />

                {/* Holden's Role Box (COO + Second Author) */}
                <div className="rounded-lg border border-amber-900/25 bg-amber-900/[0.04] p-4 space-y-1.5">
                  <div className="font-mono-tech text-[11px] uppercase font-bold text-amber-900">
                    Leadership & Authorship Role • IMPRESS Spaceworks Co.
                  </div>
                  <EditableText
                    as="p"
                    multiline
                    value={impressPaper.roleSummary}
                    editMode={editMode}
                    onChange={(v) =>
                      updateContent((p) => ({
                        ...p,
                        impressPaper: { ...impressPaper, roleSummary: v },
                      }))
                    }
                    className="text-xs text-stone-700 leading-relaxed"
                  />
                </div>
              </div>

              {/* Bottom Link to Astrobiology Paper */}
              <div className="pt-4 border-t border-stone-300 flex flex-wrap items-center justify-between gap-3">
                <a
                  href={impressPaper.doiUrl || 'https://doi.org/10.1177/15311074261471218'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded bg-amber-900 px-4 py-2.5 text-xs font-mono-tech font-semibold text-white hover:bg-amber-950 transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Read Paper in Astrobiology (Spacek et al. 2026)
                </a>
                <a
                  href="https://impressmars.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded border border-stone-800/30 bg-white px-3.5 py-2 text-xs font-mono-tech text-stone-800 hover:border-amber-900 transition-colors"
                >
                  impressmars.com ↗
                </a>
              </div>
            </div>
          </div>

          {/* VERBATIM INTERACTIVE CURRICULUM VITAE SECTION */}
          <div className="space-y-6 pt-6 border-t border-stone-800/15">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-[#EBE5DC]/70 p-6 rounded-lg border border-stone-800/20">
              <div className="space-y-1">
                <div className="text-xs font-mono-tech uppercase tracking-widest text-amber-900 font-semibold">
                  INTERACTIVE CURRICULUM VITAE • VERBATIM RECORD
                </div>
                <EditableText
                  as="h3"
                  value={resumeMeta.headerName}
                  editMode={editMode}
                  onChange={(v) =>
                    updateContent((p) => ({
                      ...p,
                      resumeMeta: { ...resumeMeta, headerName: v },
                    }))
                  }
                  className="font-serif-editorial text-3xl font-bold text-stone-900"
                />
                <EditableText
                  value={resumeMeta.contactLine}
                  editMode={editMode}
                  onChange={(v) =>
                    updateContent((p) => ({
                      ...p,
                      resumeMeta: { ...resumeMeta, contactLine: v },
                    }))
                  }
                  className="text-xs font-mono-tech text-stone-600"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {editMode && (
                  <button
                    onClick={() =>
                      updateContent((p) => ({
                        ...p,
                        resume: [
                          ...p.resume,
                          {
                            id: `res-${Date.now()}`,
                            category: 'Research Experience',
                            role: 'New Role / Position Title',
                            org: 'Organization / Lab Name',
                            period: '2026',
                            location: 'Gainesville, FL',
                            highlights: ['Click to describe key accomplishment or responsibility.'],
                          },
                        ],
                      }))
                    }
                    className="inline-flex items-center gap-1.5 rounded border border-amber-900 bg-amber-900/10 px-3 py-1.5 font-mono-tech text-xs text-amber-900 hover:bg-amber-900 hover:text-white transition-colors cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add CV Entry
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

            {/* Interactive Category Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {RESUME_CATEGORIES.map((cat) => {
                  const active = activeResumeCategory === cat;
                  const count =
                    cat === 'All'
                      ? content.resume.length
                      : content.resume.filter((r) => r.category === cat).length;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveResumeCategory(cat)}
                      className={`px-3 py-1.5 rounded text-xs font-mono-tech transition-colors cursor-pointer border ${
                        active
                          ? 'bg-amber-900 text-white border-amber-950 font-semibold'
                          : 'bg-[#FAF8F5] text-stone-700 border-stone-800/20 hover:border-amber-900'
                      }`}
                    >
                      {cat} ({count})
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 text-xs font-mono-tech">
                <button
                  onClick={() => setCollapsedResumeIds({})}
                  className="text-stone-600 hover:text-amber-900 underline cursor-pointer"
                >
                  Expand All
                </button>
                <span>•</span>
                <button
                  onClick={() => {
                    const next: Record<string, boolean> = {};
                    content.resume.forEach((r) => {
                      next[r.id] = true;
                    });
                    setCollapsedResumeIds(next);
                  }}
                  className="text-stone-600 hover:text-amber-900 underline cursor-pointer"
                >
                  Compact View
                </button>
              </div>
            </div>

            {/* Resume Entries Grouped by Section Heading */}
            <div className="space-y-8">
              {Array.from(new Set(filteredResume.map((r) => r.category))).map((categoryGroup) => {
                const groupItems = filteredResume.filter((r) => r.category === categoryGroup);
                return (
                  <div key={categoryGroup} className="space-y-4">
                    <div className="flex items-baseline justify-between border-b-2 border-stone-800/20 pb-2 pt-2">
                      <h4 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-stone-900">
                        {categoryGroup}
                      </h4>
                      <span className="font-mono-tech text-xs uppercase text-amber-900">
                        {groupItems.length} {groupItems.length === 1 ? 'Entry' : 'Entries'}
                      </span>
                    </div>

                    <div className="space-y-4">
                      {groupItems.map((item) => {
                        const idx = content.resume.findIndex((r) => r.id === item.id);
                        const isCollapsed = !!collapsedResumeIds[item.id];
                        return (
                          <div
                            key={item.id}
                            className="rounded-lg border border-stone-800/20 bg-[#FAF8F5] p-5 sm:p-6 transition-all shadow-2xs"
                          >
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                              <div className="space-y-1 flex-1">
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
                                    className="font-mono-tech text-[11px] uppercase text-amber-900 font-semibold"
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
                              </div>

                              <div className="flex md:flex-col items-center md:items-end justify-between gap-2 shrink-0">
                                <div className="md:text-right font-mono-tech text-xs text-stone-600">
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
                                </div>
                                <button
                                  onClick={() => toggleResumeCard(item.id)}
                                  className="inline-flex items-center gap-1 rounded border border-stone-300 bg-[#F4F0EA] px-2 py-1 text-[10px] font-mono-tech text-stone-600 hover:border-amber-900 cursor-pointer"
                                >
                                  <span>
                                    {isCollapsed
                                      ? `Show (${item.highlights.length})`
                                      : 'Hide Details'}
                                  </span>
                                  {isCollapsed ? (
                                    <ChevronDown className="h-3 w-3" />
                                  ) : (
                                    <ChevronUp className="h-3 w-3" />
                                  )}
                                </button>
                              </div>
                            </div>

                            {!isCollapsed && (
                              <div className="mt-3 pt-3 border-t border-stone-200/80">
                                <ul className="space-y-1.5">
                                  {item.highlights.map((hl, hIdx) => (
                                    <li
                                      key={hIdx}
                                      className="flex items-start gap-2.5 text-sm text-stone-700"
                                    >
                                      <span className="text-amber-900 mt-0.5 select-none">‒</span>
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
                                          className="text-sm text-stone-700 leading-relaxed"
                                        />
                                      </div>
                                      {editMode && item.highlights.length > 1 && (
                                        <button
                                          onClick={() =>
                                            updateContent((p) => {
                                              const next = [...p.resume];
                                              next[idx] = {
                                                ...next[idx],
                                                highlights: next[idx].highlights.filter(
                                                  (_, i) => i !== hIdx
                                                ),
                                              };
                                              return { ...p, resume: next };
                                            })
                                          }
                                          className="text-stone-400 hover:text-red-700 cursor-pointer mt-1"
                                          title="Remove bullet"
                                        >
                                          <X className="h-3.5 w-3.5" />
                                        </button>
                                      )}
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
                                          highlights: [
                                            ...next[idx].highlights,
                                            'New bullet point...',
                                          ],
                                        };
                                        return { ...p, resume: next };
                                      })
                                    }
                                    className="text-[11px] font-mono-tech text-amber-900 hover:underline cursor-pointer pt-2 inline-block"
                                  >
                                    + Add Bullet Point
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Section Heading for Awards, Skills, and Extracurriculars */}
            <div className="flex items-baseline justify-between border-b-2 border-stone-800/20 pb-2 pt-6">
              <h4 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-stone-900">
                Awards, Skills, and Extracurriculars
              </h4>
              <span className="font-mono-tech text-xs uppercase text-amber-900">
                Publications • Honors • Technical Competencies • Leadership
              </span>
            </div>

            {/* Verbatim Publications, Awards, Technical Skills & Extracurriculars Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
              {/* Publications & Awards */}
              <div className="lg:col-span-5 rounded-lg border border-stone-800/20 bg-[#FAF8F5] p-6 space-y-5">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 font-mono-tech text-xs uppercase text-amber-900 font-semibold">
                    <BookOpen className="h-3.5 w-3.5" />
                    Publications
                  </div>
                  {resumeMeta.publications.map((pub, idx) => (
                    <div
                      key={idx}
                      className="rounded border border-stone-300 bg-[#F4F0EA]/70 p-3 text-xs text-stone-800 leading-relaxed"
                    >
                      <EditableText
                        multiline
                        value={pub}
                        editMode={editMode}
                        onChange={(v) =>
                          updateContent((p) => {
                            const nextPubs = [...resumeMeta.publications];
                            nextPubs[idx] = v;
                            return {
                              ...p,
                              resumeMeta: { ...resumeMeta, publications: nextPubs },
                            };
                          })
                        }
                        className="text-xs text-stone-800 leading-relaxed"
                      />
                    </div>
                  ))}
                </div>

                <div className="space-y-2 pt-3 border-t border-stone-200">
                  <div className="inline-flex items-center gap-1.5 font-mono-tech text-xs uppercase text-amber-900 font-semibold">
                    <Award className="h-3.5 w-3.5" />
                    Awards and Certifications
                  </div>
                  <ul className="space-y-1.5">
                    {resumeMeta.awards.map((award, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-sm text-stone-800 font-medium"
                      >
                        <span className="text-amber-900">•</span>
                        <EditableText
                          value={award}
                          editMode={editMode}
                          onChange={(v) =>
                            updateContent((p) => {
                              const nextAwards = [...resumeMeta.awards];
                              nextAwards[idx] = v;
                              return {
                                ...p,
                                resumeMeta: { ...resumeMeta, awards: nextAwards },
                              };
                            })
                          }
                          className="text-sm text-stone-800"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Technical & Laboratory Skills + Hobbies, Interests, and Extracurriculars */}
              <div className="lg:col-span-7 rounded-lg border border-stone-800/20 bg-[#FAF8F5] p-6 space-y-5">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-1.5 font-mono-tech text-xs uppercase text-amber-900 font-semibold">
                      <Wrench className="h-3.5 w-3.5" />
                      Laboratory, Engineering & Field Skills
                    </div>
                    {editMode && (
                      <button
                        onClick={() =>
                          updateContent((p) => ({
                            ...p,
                            resumeMeta: {
                              ...resumeMeta,
                              skillsList: [...resumeMeta.skillsList, 'New Skill'],
                            },
                          }))
                        }
                        className="text-[11px] font-mono-tech text-amber-900 hover:underline cursor-pointer"
                      >
                        + Add Skill
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {resumeMeta.skillsList.map((sk, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 rounded border border-stone-300 bg-[#F4F0EA] px-2.5 py-1 text-xs font-mono-tech text-stone-800"
                      >
                        <EditableText
                          value={sk}
                          editMode={editMode}
                          onChange={(v) =>
                            updateContent((p) => {
                              const nextSkills = [...resumeMeta.skillsList];
                              nextSkills[idx] = v;
                              return {
                                ...p,
                                resumeMeta: { ...resumeMeta, skillsList: nextSkills },
                              };
                            })
                          }
                          className="text-xs font-mono-tech"
                        />
                        {editMode && (
                          <button
                            onClick={() =>
                              updateContent((p) => ({
                                ...p,
                                resumeMeta: {
                                  ...resumeMeta,
                                  skillsList: resumeMeta.skillsList.filter((_, i) => i !== idx),
                                },
                              }))
                            }
                            className="text-stone-400 hover:text-red-700 cursor-pointer"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-3 border-t border-stone-200">
                  <div className="font-mono-tech text-xs uppercase text-amber-900 font-semibold">
                    Hobbies, Interests, and Extracurriculars
                  </div>
                  <EditableText
                    as="p"
                    multiline
                    value={resumeMeta.extracurriculars}
                    editMode={editMode}
                    onChange={(v) =>
                      updateContent((p) => ({
                        ...p,
                        resumeMeta: { ...resumeMeta, extracurriculars: v },
                      }))
                    }
                    className="text-xs sm:text-sm text-stone-700 leading-relaxed"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOLIO III: NACE COMPETENCIES */}
        <section id="c4-skills" className="scroll-mt-24 border-b-2 border-stone-900/20 pb-14 space-y-6">
          <div>
            <span className="font-mono-tech text-xs uppercase tracking-widest text-amber-900">
              FOLIO III • 04. NACE COMPETENCIES
            </span>
            <h2 className="font-serif-editorial text-4xl font-semibold mt-1">
              Five Pillars of Career & Global Readiness
            </h2>
          </div>

          {(() => {
            const renderSkillCard = (
              skill: PortfolioContent['skills'][number],
              idx: number
            ) => (
              <div
                key={skill.id}
                className="h-fit rounded-lg border border-stone-800/20 bg-[#FAF8F5] p-6 space-y-3 shadow-2xs"
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
            );

            const leftColumn: { skill: PortfolioContent['skills'][number]; idx: number }[] = [];
            const rightColumn: { skill: PortfolioContent['skills'][number]; idx: number }[] = [];
            let leftWeight = 0;
            let rightWeight = 0;

            content.skills.forEach((skill, idx) => {
              const weight =
                220 +
                skill.competency.length +
                skill.contextTitle.length +
                skill.star.situation.length +
                skill.star.task.length +
                skill.star.action.length +
                skill.star.resolution.length;
              if (leftWeight <= rightWeight) {
                leftColumn.push({ skill, idx });
                leftWeight += weight;
              } else {
                rightColumn.push({ skill, idx });
                rightWeight += weight;
              }
            });

            return (
              <>
                {/* Mobile 1-Column Sequential Stack */}
                <div className="grid grid-cols-1 gap-6 md:hidden">
                  {content.skills.map((skill, idx) => renderSkillCard(skill, idx))}
                </div>

                {/* Desktop 2-Column Height-Balanced Masonry (no trailing white space inside or below cards) */}
                <div className="hidden md:grid md:grid-cols-2 md:gap-6 md:items-start">
                  <div className="space-y-6">
                    {leftColumn.map(({ skill, idx }) => renderSkillCard(skill, idx))}
                  </div>
                  <div className="space-y-6">
                    {rightColumn.map(({ skill, idx }) => renderSkillCard(skill, idx))}
                  </div>
                </div>
              </>
            );
          })()}
        </section>

        {/* FOLIO IV: GLOBAL EXPERIENCES (Expandable Museum Exhibit Plaques) */}
        <section id="c4-experiences" className="scroll-mt-24 border-b-2 border-stone-900/20 pb-14 space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="font-mono-tech text-xs uppercase tracking-widest text-amber-900">
                FOLIO IV • 05. GLOBAL EXPERIENCES
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
                          body: 'Write your reflection here...',
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
                            | 'iceland-glacier'
                            | 'cross-cultural-symposia',
                          mapX: 30,
                          mapY: 50,
                          summaryPlaceholder: '',
                        }}
                        variant="museum"
                      />

                      {/* Photo gallery for Iceland & Colombia (above the essay). One World gallery renders below the essay. */}
                      {exp.hasPersonalPhotos && exp.id !== 'uf-harn-one-world' && (
                        <div className="space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {(exp.photoSlotLabels || []).map((slotLabel, pIdx) => {
                              const existingUrl = exp.photoUrls?.[pIdx] || '';
                              return (
                                <div
                                  key={pIdx}
                                  className="rounded-lg border border-stone-300 bg-[#F4F0EA]/80 p-3 flex flex-col justify-between gap-2.5 shadow-2xs"
                                >
                                  <div className="space-y-2">
                                    <div className="flex items-center justify-between text-[10px] font-mono-tech uppercase text-amber-900">
                                      <span>PLATE 0{pIdx + 1}</span>
                                      {existingUrl && (
                                        <button
                                          type="button"
                                          onClick={() =>
                                            setLightboxMedia({
                                              title: exp.title,
                                              subtitle: `PLATE 0${pIdx + 1} • ${exp.location}`,
                                              imageUrl: existingUrl,
                                              caption: slotLabel,
                                            })
                                          }
                                          className="inline-flex items-center gap-1 text-stone-600 hover:text-amber-900 cursor-pointer"
                                        >
                                          <Maximize2 className="h-3 w-3" /> Enlarge
                                        </button>
                                      )}
                                    </div>

                                    {existingUrl ? (
                                      <div
                                        onClick={() =>
                                          setLightboxMedia({
                                            title: exp.title,
                                            subtitle: `PLATE 0${pIdx + 1} • ${exp.location}`,
                                            imageUrl: existingUrl,
                                            caption: slotLabel,
                                          })
                                        }
                                        className="overflow-hidden rounded border border-stone-300 bg-stone-900/5 cursor-pointer group"
                                      >
                                        <img
                                          src={existingUrl}
                                          alt={slotLabel}
                                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                                        />
                                      </div>
                                    ) : (
                                      <div className="h-44 rounded border border-dashed border-stone-400 bg-stone-200/50 flex flex-col items-center justify-center p-3 text-center text-xs text-stone-500 font-mono-tech">
                                        <span>Photo Plate 0{pIdx + 1}</span>
                                        <span className="text-[10px] opacity-75 mt-1">
                                          Click Upload below to attach photo
                                        </span>
                                      </div>
                                    )}
                                  </div>

                                  <div className="flex items-start justify-between gap-2 pt-1">
                                    <div className="flex-1">
                                      <EditableText
                                        as="p"
                                        multiline
                                        value={slotLabel}
                                        editMode={editMode}
                                        onChange={(v) =>
                                          updateContent((p) => {
                                            const next = [...p.experiences];
                                            const nextLabels = [
                                              ...(next[idx].photoSlotLabels || []),
                                            ];
                                            nextLabels[pIdx] = v;
                                            next[idx] = {
                                              ...next[idx],
                                              photoSlotLabels: nextLabels,
                                            };
                                            return { ...p, experiences: next };
                                          })
                                        }
                                        className="text-xs text-stone-700 leading-relaxed"
                                      />
                                    </div>
                                    {editMode && (
                                      <button
                                        onClick={() =>
                                          handleImageFileUpload((dataUrl) =>
                                            updateContent((p) => {
                                              const next = [...p.experiences];
                                              const nextUrls = [...(next[idx].photoUrls || [])];
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
                        </div>
                      )}

                      {/* Full Essay Reflection Body */}
                      <EditableText
                        as="div"
                        multiline
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

                      {/* One World Harn exhibition gallery — below the main reflection text */}
                      {exp.hasPersonalPhotos && exp.id === 'uf-harn-one-world' && (
                        <div className="space-y-3 pt-2 border-t border-stone-300">
                          <div className="font-mono-tech text-[11px] uppercase tracking-widest text-amber-900">
                            Exhibition Photo Gallery • Harn Museum of Art
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {(exp.photoSlotLabels || []).map((slotLabel, pIdx) => {
                              const existingUrl = exp.photoUrls?.[pIdx] || '';
                              return (
                                <div
                                  key={pIdx}
                                  className="rounded-lg border border-stone-300 bg-[#F4F0EA]/80 p-3 flex flex-col justify-between gap-2.5 shadow-2xs"
                                >
                                  <div className="space-y-2">
                                    <div className="flex items-center justify-between text-[10px] font-mono-tech uppercase text-amber-900">
                                      <span>PLATE 0{pIdx + 1}</span>
                                      {existingUrl && (
                                        <button
                                          type="button"
                                          onClick={() =>
                                            setLightboxMedia({
                                              title: exp.title,
                                              subtitle: `PLATE 0${pIdx + 1} • ${exp.location}`,
                                              imageUrl: existingUrl,
                                              caption: slotLabel,
                                            })
                                          }
                                          className="inline-flex items-center gap-1 text-stone-600 hover:text-amber-900 cursor-pointer"
                                        >
                                          <Maximize2 className="h-3 w-3" /> Enlarge
                                        </button>
                                      )}
                                    </div>

                                    {existingUrl ? (
                                      <div
                                        onClick={() =>
                                          setLightboxMedia({
                                            title: exp.title,
                                            subtitle: `PLATE 0${pIdx + 1} • ${exp.location}`,
                                            imageUrl: existingUrl,
                                            caption: slotLabel,
                                          })
                                        }
                                        className="overflow-hidden rounded border border-stone-300 bg-stone-900/5 cursor-pointer group"
                                      >
                                        <img
                                          src={existingUrl}
                                          alt={slotLabel}
                                          className="w-full h-56 object-contain bg-stone-950/90 p-1 transition-transform duration-300 group-hover:scale-[1.03]"
                                        />
                                      </div>
                                    ) : (
                                      <div className="h-44 rounded border border-dashed border-stone-400 bg-stone-200/50 flex flex-col items-center justify-center p-3 text-center text-xs text-stone-500 font-mono-tech">
                                        <span>Photo Plate 0{pIdx + 1}</span>
                                        <span className="text-[10px] opacity-75 mt-1">
                                          Click Upload below to attach photo
                                        </span>
                                      </div>
                                    )}
                                  </div>

                                  <div className="flex items-start justify-between gap-2 pt-1">
                                    <div className="flex-1">
                                      <EditableText
                                        as="p"
                                        multiline
                                        value={slotLabel}
                                        editMode={editMode}
                                        onChange={(v) =>
                                          updateContent((p) => {
                                            const next = [...p.experiences];
                                            const nextLabels = [
                                              ...(next[idx].photoSlotLabels || []),
                                            ];
                                            nextLabels[pIdx] = v;
                                            next[idx] = {
                                              ...next[idx],
                                              photoSlotLabels: nextLabels,
                                            };
                                            return { ...p, experiences: next };
                                          })
                                        }
                                        className="text-xs text-stone-700 leading-relaxed"
                                      />
                                    </div>
                                    {editMode && (
                                      <button
                                        onClick={() =>
                                          handleImageFileUpload((dataUrl) =>
                                            updateContent((p) => {
                                              const next = [...p.experiences];
                                              const nextUrls = [...(next[idx].photoUrls || [])];
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
                        </div>
                      )}
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
                FOLIO V • 06. FINAL REFLECTION
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

            <div className="mt-6">
              <EditableText
                as="div"
                multiline
                value={content.reflection.body}
                editMode={editMode}
                onChange={(v) =>
                  updateContent((p) => ({
                    ...p,
                    reflection: { ...p.reflection, body: v },
                  }))
                }
                className="text-stone-800 leading-relaxed font-serif-editorial text-[19px]"
              />
            </div>
          </div>
        </section>
      </main>
      )}

      {/* Fullscreen Lightbox Modal for Reykjavik Poster, IMPRESS Cover Artwork, or Gallery Plates */}
      {lightboxMedia && (
        <div
          onClick={() => setLightboxMedia(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/85 p-4 sm:p-6 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-xl border border-stone-700 bg-[#FAF8F5] p-6 sm:p-8 text-stone-900 shadow-2xl"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-300 pb-4">
              <div>
                <span className="font-mono-tech text-xs text-amber-900 font-semibold">
                  {lightboxMedia === 'poster'
                    ? content.poster.plateNumber
                    : lightboxMedia === 'impress'
                    ? impressPaper.plateNumber
                    : lightboxMedia.subtitle}
                </span>
                <h3 className="font-serif-editorial text-2xl sm:text-3xl font-bold mt-0.5">
                  {lightboxMedia === 'poster'
                    ? content.poster.title
                    : lightboxMedia === 'impress'
                    ? impressPaper.title
                    : lightboxMedia.title}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                {lightboxMedia === 'poster' && (
                  <a
                    href="/images/research/Poster.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded bg-amber-900 px-3 py-1.5 text-xs font-mono-tech text-white hover:bg-amber-950"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    Open Vector PDF in New Tab ↗
                  </a>
                )}
                {lightboxMedia === 'impress' && (
                  <a
                    href={impressPaper.doiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded bg-amber-900 px-3 py-1.5 text-xs font-mono-tech text-white hover:bg-amber-950"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Read Paper in Astrobiology ↗
                  </a>
                )}
                <button
                  onClick={() => setLightboxMedia(null)}
                  className="rounded-lg border border-stone-300 p-2 hover:bg-stone-200 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="mt-6 space-y-6">
              <img
                src={
                  lightboxMedia === 'poster'
                    ? content.poster.imageUrl || '/images/research/poster.jpg'
                    : lightboxMedia === 'impress'
                    ? impressPaper.imageUrl || '/images/research/impress-cover.jpg'
                    : lightboxMedia.imageUrl
                }
                alt={
                  lightboxMedia === 'poster'
                    ? content.poster.title
                    : lightboxMedia === 'impress'
                    ? impressPaper.title
                    : lightboxMedia.caption
                }
                className="max-h-[72vh] w-full object-contain rounded border border-stone-300 bg-white mx-auto"
              />
              <p className="text-sm text-stone-700 leading-relaxed whitespace-pre-line">
                {lightboxMedia === 'poster'
                  ? content.poster.abstract
                  : lightboxMedia === 'impress'
                  ? impressPaper.summary
                  : lightboxMedia.caption}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Floating Interactive Editor & Auto-Save Control Bar (hidden unless ENABLE_LIVE_EDITOR is true) */}
      {ENABLE_LIVE_EDITOR && (
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
      )}
    </div>
  );
};
