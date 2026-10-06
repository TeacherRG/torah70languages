import { cn } from '@/lib/cn';

/** A thin arrow that points "forward" in both LTR and RTL layouts. */
export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 12"
      className={cn('inline-block h-3 w-6 shrink-0 rtl:-scale-x-100', className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M0 6h22M17 1l5 5-5 5" />
    </svg>
  );
}
