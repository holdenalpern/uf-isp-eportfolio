import React from 'react';
import { Camera, Compass, Droplets, Eye, Globe2, Mountain, Scale } from 'lucide-react';
import { ExperienceShellItem } from '../data/shellData';

/**
 * Renders bespoke typographic / cartographic / scientific visual headers
 * for UF Campus Events and structured multi-slot headers for travel/research exhibits.
 */
export const ExperienceVisualHeader: React.FC<{
  item: ExperienceShellItem;
  variant?: 'swiss' | 'cinema' | 'atlas' | 'museum';
}> = ({ item, variant = 'swiss' }) => {
  const isDark = variant === 'cinema' || variant === 'atlas';

  if (item.curatedVisualTheme === 'harn-aperture') {
    return (
      <div
        className={`relative overflow-hidden rounded-lg border p-4 ${
          isDark
            ? 'border-amber-400/25 bg-gradient-to-r from-stone-900 via-neutral-900 to-stone-950 text-stone-100'
            : 'border-stone-800/15 bg-gradient-to-r from-stone-100 via-amber-50/40 to-stone-100 text-stone-900'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono-tech uppercase tracking-widest opacity-75">
            <Eye className="h-3.5 w-3.5" />
            Curated Exhibition Plaque & Photo Gallery • Harn Museum of Art
          </div>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-current/30 font-mono-tech text-[10px]">
            35mm
          </div>
        </div>
        <div className="mt-2.5 flex flex-wrap gap-2 text-[10px] font-mono-tech uppercase opacity-75">
          <span>• Soldier Portrait</span>
          <span>• Afghanistan Community</span>
          <span>• Palestine Rubble (2006)</span>
          <span>• Migrant Train</span>
          <span>• UN Refugee Camp</span>
        </div>
      </div>
    );
  }

  if (item.curatedVisualTheme === 'cross-cultural-symposia') {
    return (
      <div
        className={`relative overflow-hidden rounded-lg border p-4 ${
          isDark
            ? 'border-teal-500/30 bg-gradient-to-r from-teal-950/40 via-stone-900 to-slate-950 text-teal-100'
            : 'border-amber-900/20 bg-gradient-to-r from-amber-50/70 via-stone-100 to-emerald-50/50 text-stone-900'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono-tech uppercase tracking-widest opacity-80">
            <Globe2 className="h-3.5 w-3.5 text-amber-900" />
            UF Center for Latin American Studies (Coloquios) × Center for African Studies (Baraza)
          </div>
          <span className="rounded border border-current/25 px-2 py-0.5 text-[10px] font-mono-tech">
            3 SYMPOSIA • SEPT 2026
          </span>
        </div>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2.5 border-t border-current/15 pt-3 font-mono-tech text-[11px]">
          <div className="rounded bg-white/60 p-2 border border-stone-300/80">
            <span className="block font-bold text-amber-900">01. Afro-Brazilian History</span>
            <span className="opacity-80 text-[10px]">
              Dr. Sant’Ana • 1871 Free Womb Law, Quilombos & 1888 Abolition
            </span>
          </div>
          <div className="rounded bg-white/60 p-2 border border-stone-300/80">
            <span className="block font-bold text-amber-900">02. Populist Discourse</span>
            <span className="opacity-80 text-[10px]">
              Dr. Luz • Bolsonarist Rhetoric, Digital Mobilization & U.S. Parallels
            </span>
          </div>
          <div className="rounded bg-white/60 p-2 border border-stone-300/80">
            <span className="block font-bold text-emerald-900">03. Day Zero Hydrology</span>
            <span className="opacity-80 text-[10px]">
              Dr. Dalu • Invasive Pines, Reservoir Drawdown & Fynbos Restoration
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (item.hasPersonalPhotos) {
    const isColombia = item.id === 'colombia-bogota';
    return (
      <div
        className={`relative overflow-hidden rounded-lg border p-4 ${
          isDark
            ? isColombia
              ? 'border-amber-500/30 bg-gradient-to-br from-amber-950/50 via-stone-900 to-slate-950 text-amber-100'
              : 'border-cyan-500/30 bg-gradient-to-br from-cyan-950/60 via-slate-900 to-slate-950 text-cyan-100'
            : isColombia
            ? 'border-amber-900/15 bg-gradient-to-br from-amber-50 via-orange-50/60 to-stone-100 text-stone-800'
            : 'border-teal-900/15 bg-gradient-to-br from-teal-50 via-cyan-50/50 to-slate-100 text-slate-800'
        }`}
      >
        {/* Topographic SVG background lines */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-15"
          viewBox="0 0 400 160"
          fill="none"
        >
          <path
            d="M-20 120 C 80 40, 160 140, 260 60 C 320 10, 380 90, 420 40"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M-20 145 C 90 65, 170 160, 270 85 C 330 35, 390 110, 420 65"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <path
            d="M-20 95 C 70 15, 150 115, 250 35 C 310 -15, 370 65, 420 15"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>

        <div className="relative z-10 flex items-center justify-between text-xs font-mono-tech uppercase tracking-wider opacity-80">
          <span className="inline-flex items-center gap-1.5">
            <Camera className="h-3.5 w-3.5" />
            Field Photography & Archival Plates ({item.photoSlotLabels?.length || 3} Frames)
          </span>
          <span>{item.coordinates}</span>
        </div>
      </div>
    );
  }

  // Curated Typographic / Cartographic / Diagrammatic Header for No-Photo UF Campus Events
  switch (item.curatedVisualTheme) {
    case 'hydrology-pine':
      return (
        <div
          className={`relative overflow-hidden rounded-lg border p-4 ${
            isDark
              ? 'border-emerald-500/30 bg-gradient-to-r from-emerald-950/50 via-slate-900 to-cyan-950/40 text-emerald-100'
              : 'border-emerald-800/15 bg-gradient-to-r from-emerald-50/90 via-teal-50/50 to-stone-50 text-emerald-950'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-mono-tech uppercase tracking-widest opacity-75">
                <Droplets className="h-3.5 w-3.5" />
                Hydrogeology × Invasion Biology Diagram
              </div>
              <div className="text-xs font-mono-tech opacity-85">
                CAPE TOWN BASIN • $400B+ GLOBAL COST • PINUS & EUCALYPTUS TRANSPIRATION
              </div>
            </div>
            <span className="rounded border border-current/25 px-2 py-0.5 text-[10px] font-mono-tech">
              FIG. ZA-02
            </span>
          </div>
          {/* Stylized water table + root drawdown SVG */}
          <svg className="mt-3 h-12 w-full" viewBox="0 0 360 48" fill="none">
            <path d="M0 16 Q 90 12, 180 24 T 360 18" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
            <path
              d="M0 32 Q 90 28, 180 40 T 360 34"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeDasharray="3 3"
              opacity="0.45"
            />
            <circle cx="85" cy="18" r="4" fill="currentColor" opacity="0.8" />
            <circle cx="180" cy="24" r="4" fill="currentColor" opacity="0.8" />
            <circle cx="275" cy="21" r="4" fill="currentColor" opacity="0.8" />
            <text x="8" y="44" fill="currentColor" fontSize="9" fontFamily="monospace" opacity="0.7">
              WATER TABLE DRAWDOWN vs. NATIVE FYNBOS RESTORATION
            </text>
          </svg>
        </div>
      );

    case 'afro-brazil-archive':
      return (
        <div
          className={`relative overflow-hidden rounded-lg border p-4 ${
            isDark
              ? 'border-orange-500/30 bg-gradient-to-r from-orange-950/40 via-stone-900 to-slate-950 text-orange-100'
              : 'border-orange-900/15 bg-gradient-to-r from-orange-50/80 via-amber-50/40 to-stone-50 text-stone-900'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono-tech uppercase tracking-widest opacity-75">
              <Scale className="h-3.5 w-3.5" />
              Historical Chronology • Afro-Brazilian Diaspora
            </div>
            <span className="rounded border border-current/25 px-2 py-0.5 text-[10px] font-mono-tech">
              HIST-BR-1888
            </span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 border-t border-current/15 pt-2.5 font-mono-tech text-[11px]">
            <div>
              <span className="block font-bold">1871</span>
              <span className="opacity-75 text-[10px]">Law of Free Womb</span>
            </div>
            <div>
              <span className="block font-bold">Quilombos</span>
              <span className="opacity-75 text-[10px]">Autonomous Settlements</span>
            </div>
            <div>
              <span className="block font-bold">1888 & Beyond</span>
              <span className="opacity-75 text-[10px]">4 Abolitionist Thinkers</span>
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div
          className={`relative overflow-hidden rounded-lg border p-4 ${
            isDark
              ? 'border-indigo-500/30 bg-gradient-to-r from-indigo-950/40 via-slate-900 to-slate-950 text-indigo-100'
              : 'border-indigo-900/15 bg-gradient-to-r from-indigo-50/70 via-slate-50 to-stone-50 text-slate-900'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono-tech uppercase tracking-widest opacity-75">
              <Compass className="h-3.5 w-3.5" />
              Comparative Political Sociology • Brazil & U.S.
            </div>
            <span className="rounded border border-current/25 px-2 py-0.5 text-[10px] font-mono-tech">
              POL-BR-2018
            </span>
          </div>
          <div className="mt-2.5 flex items-center justify-between text-xs font-mono-tech opacity-85">
            <span>Outsider Framing</span>
            <span>↔</span>
            <span>Digital Mobilization</span>
            <span>↔</span>
            <span>Epistemic Nuance</span>
          </div>
        </div>
      );
  }
};

export const TopographicPattern: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    className={`pointer-events-none ${className}`}
    viewBox="0 0 800 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M-50 320 C 120 210, 290 370, 460 220 C 600 95, 710 240, 850 140"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <path
      d="M-50 260 C 140 150, 310 310, 480 160 C 620 35, 730 180, 850 80"
      stroke="currentColor"
      strokeWidth="1"
      strokeDasharray="6 6"
    />
    <path
      d="M-50 370 C 100 260, 270 410, 440 270 C 580 145, 690 290, 850 190"
      stroke="currentColor"
      strokeWidth="0.8"
    />
    <circle cx="460" cy="220" r="4" fill="currentColor" />
    <circle cx="210" cy="275" r="3" fill="currentColor" />
  </svg>
);
