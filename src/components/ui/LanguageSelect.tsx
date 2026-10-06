import { useId } from 'react';
import { getLanguage } from '@/content/languages';
import { useLanguageName } from '@/hooks/useLanguageName';
import { cn } from '@/lib/cn';

/** Native <select> (accessible, mobile-friendly) styled as a hairline field. */
export function LanguageSelect({
  value,
  options,
  onChange,
  label,
  hideLabel = false,
  className,
}: {
  value: string;
  options: readonly string[];
  onChange: (code: string) => void;
  label: string;
  hideLabel?: boolean;
  className?: string;
}) {
  const id = useId();
  const name = useLanguageName();
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className={cn('label text-navy/50', hideLabel && 'sr-only')}>
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full cursor-pointer appearance-none border-b border-navy/20 bg-transparent py-2 pe-8 text-base text-navy transition-colors hover:border-gold focus:border-gold focus:outline-none"
        >
          {options.map((code) => {
            const native = getLanguage(code)?.nativeName;
            const local = name(code);
            return (
              <option key={code} value={code}>
                {native && native !== local ? `${native} — ${local}` : local}
              </option>
            );
          })}
        </select>
        <svg
          aria-hidden="true"
          viewBox="0 0 12 8"
          className="pointer-events-none absolute end-1 top-1/2 h-2 w-3 -translate-y-1/2 text-gold"
          fill="none"
          stroke="currentColor"
        >
          <path d="M1 1.5l5 5 5-5" />
        </svg>
      </div>
    </div>
  );
}
