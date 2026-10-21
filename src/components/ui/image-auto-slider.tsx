import React from 'react';
import { ImagePlus, Plus, Trash2 } from 'lucide-react';

export interface SliderImageItem {
  url: string;
  caption?: string;
}

export interface ImageAutoSliderProps {
  images?: (string | SliderImageItem)[];
  editMode?: boolean;
  onReplaceImage?: (index: number) => void;
  onAddImage?: () => void;
  onRemoveImage?: (index: number) => void;
  speedSeconds?: number;
}

export const DEFAULT_SLIDER_IMAGES: SliderImageItem[] = [
  {
    url: '/images/slideshow/IMG_0180.jpg',
    caption: 'Reykjavík, Iceland • Presenting the Agnostic Life Finder (ALF) Poster',
  },
  {
    url: '/images/slideshow/IcelandWaterfall.jpg',
    caption: 'Iceland • Field Excursion Outside Reykjavík',
  },
  {
    url: '/images/slideshow/IMG_9818.jpg',
    caption: 'Suesca, Colombia • Sandstone Crags & Andean Valley',
  },
  {
    url: '/images/slideshow/IMG_0412.jpg',
    caption: 'Suesca, Colombia • Dusk Walk Through the Valley',
  },
  {
    url: '/images/slideshow/IMG_0720.jpg',
    caption: 'Near Taos, New Mexico • UF Geology Capstone Field Mapping',
  },
  {
    url: '/images/slideshow/IMG_1819.jpg',
    caption: 'Death Valley, California • Overlooking the Salt Flats',
  },
  {
    url: '/images/slideshow/e2dc265e.jpg',
    caption: 'FfAME Lab, Alachua • Assembling the Agnostic Life Finder (ALF)',
  },
];

export const Component: React.FC<ImageAutoSliderProps> = ({
  images,
  editMode = false,
  onReplaceImage,
  onAddImage,
  onRemoveImage,
  speedSeconds = 52,
}) => {
  const normalizedImages: SliderImageItem[] = (
    images && images.length > 0 ? images : DEFAULT_SLIDER_IMAGES
  ).map((item, idx) =>
    typeof item === 'string' ? { url: item, caption: `Field Plate 0${idx + 1}` } : item
  );

  // Duplicate images for seamless infinite scroll loop
  const duplicatedImages = [...normalizedImages, ...normalizedImages];

  return (
    <>
      <style>{`
        @keyframes scroll-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .infinite-scroll {
          animation: scroll-right ${speedSeconds}s linear infinite;
        }

        .infinite-scroll:hover {
          animation-play-state: paused;
        }

        .scroll-container {
          mask: linear-gradient(
            90deg,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
          -webkit-mask: linear-gradient(
            90deg,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
        }

        .image-item {
          transition: transform 0.3s ease, filter 0.3s ease;
        }

        .image-item:hover {
          transform: scale(1.04);
          filter: brightness(1.06);
        }
      `}</style>

      <div className="w-full relative overflow-hidden rounded-xl border border-stone-800/20 bg-[#EAE3D5]/75 py-6 px-3 shadow-inner">
        {/* Scrolling images container */}
        <div className="relative z-10 w-full flex items-center justify-center">
          <div className="scroll-container w-full overflow-hidden">
            <div className="infinite-scroll flex gap-6 w-max py-2">
              {duplicatedImages.map((image, index) => {
                const originalIndex = index % normalizedImages.length;
                return (
                  <div
                    key={index}
                    className="image-item group relative flex-shrink-0 w-72 h-72 sm:w-88 sm:h-88 md:w-[26rem] md:h-[26rem] rounded-xl overflow-hidden border border-stone-800/25 bg-stone-900 shadow-lg"
                  >
                    <img
                      src={image.url}
                      alt={image.caption || `Gallery image ${originalIndex + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {image.caption && (
                      <div className="inset-x-0 bottom-0 absolute bg-gradient-to-t from-black/85 via-black/45 to-transparent px-3 py-2 text-xs font-mono-tech text-stone-100 leading-snug">
                        {image.caption}
                      </div>
                    )}

                    {editMode && onReplaceImage && (
                      <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={() => onReplaceImage(originalIndex)}
                          className="inline-flex items-center gap-1 rounded bg-amber-900/90 px-2 py-1 text-[10px] font-mono-tech text-white shadow cursor-pointer hover:bg-amber-800"
                          title="Replace slide photo or edit caption"
                        >
                          <ImagePlus className="h-3 w-3" />
                          Swap
                        </button>
                        {onRemoveImage && normalizedImages.length > 2 && (
                          <button
                            type="button"
                            onClick={() => onRemoveImage(originalIndex)}
                            className="inline-flex items-center justify-center rounded bg-stone-900/90 p-1 text-red-300 hover:text-red-200 cursor-pointer"
                            title="Remove slide"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Optional Edit Mode Slide Controls */}
        {editMode && onAddImage && (
          <div className="mt-2.5 flex items-center justify-between border-t border-stone-800/15 px-3 pt-2 text-[10px] font-mono-tech text-stone-600">
            <span>Hover any slide to pause & swap photo ({normalizedImages.length} slides • 52s cycle)</span>
            <button
              type="button"
              onClick={onAddImage}
              className="inline-flex items-center gap-1 rounded border border-amber-900/40 bg-amber-50 px-2 py-0.5 text-amber-900 hover:bg-amber-900 hover:text-white transition-colors cursor-pointer"
            >
              <Plus className="h-3 w-3" /> Add Slide Photo
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Component;
