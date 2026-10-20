import React, { useEffect, useRef, useState } from 'react';

interface EditableTextProps {
  value: string;
  onChange: (newValue: string) => void;
  editMode: boolean;
  multiline?: boolean;
  className?: string;
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'div' | 'blockquote';
  placeholder?: string;
  showWordCount?: boolean;
  wordCountTarget?: { min?: number; max?: number; label: string };
}

export function countWords(text: string): number {
  const cleaned = text.trim();
  if (!cleaned) return 0;
  return cleaned.split(/\s+/).length;
}

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  onChange,
  editMode,
  multiline = false,
  className = '',
  as: Component = 'span',
  placeholder = 'Click to edit...',
  showWordCount = false,
  wordCountTarget,
}) => {
  const [draft, setDraft] = useState(value);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  useEffect(() => {
    if (editMode && multiline && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [draft, editMode, multiline]);

  const words = countWords(draft);

  if (!editMode) {
    return (
      <Component className={`${className} whitespace-pre-line`}>
        {value || placeholder}
      </Component>
    );
  }

  const getBadgeColor = () => {
    if (!wordCountTarget) return 'bg-stone-200 text-stone-700';
    if (wordCountTarget.min && words < wordCountTarget.min) {
      return 'bg-amber-100 text-amber-900 border-amber-400';
    }
    if (wordCountTarget.max && words > wordCountTarget.max) {
      return 'bg-red-100 text-red-900 border-red-400';
    }
    return 'bg-emerald-100 text-emerald-900 border-emerald-400';
  };

  return (
    <div className="relative group/edit w-full">
      {multiline ? (
        <textarea
          ref={textareaRef}
          value={draft}
          placeholder={placeholder}
          onChange={(e) => {
            setDraft(e.target.value);
            onChange(e.target.value);
          }}
          rows={2}
          className={`w-full resize-none rounded border border-dashed border-amber-800/40 bg-amber-50/40 px-2.5 py-1.5 focus:border-amber-900 focus:bg-white focus:outline-none transition-colors ${className}`}
        />
      ) : (
        <input
          type="text"
          value={draft}
          placeholder={placeholder}
          onChange={(e) => {
            setDraft(e.target.value);
            onChange(e.target.value);
          }}
          className={`w-full rounded border border-dashed border-amber-800/40 bg-amber-50/40 px-2 py-0.5 focus:border-amber-900 focus:bg-white focus:outline-none transition-colors ${className}`}
        />
      )}

      {showWordCount && (
        <div className="mt-1 flex items-center justify-end">
          <span
            className={`inline-flex items-center gap-1.5 rounded border px-2 py-0.5 font-mono-tech text-[10px] ${getBadgeColor()}`}
          >
            <span>{words} words</span>
            {wordCountTarget && <span>• Target: {wordCountTarget.label}</span>}
          </span>
        </div>
      )}
    </div>
  );
};
