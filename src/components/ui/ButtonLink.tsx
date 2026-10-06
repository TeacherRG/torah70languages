import { Link, type LinkProps } from 'react-router';
import { cn } from '@/lib/cn';
import { Arrow } from './Arrow';

type Variant = 'primary' | 'secondary' | 'text';

const styles: Record<Variant, string> = {
  primary:
    'bg-navy text-paper hover:bg-navy-soft px-7 py-4 border border-navy',
  secondary:
    'border border-navy/25 text-navy hover:border-gold hover:text-navy px-7 py-4',
  text: 'text-navy hover:text-gold py-2 border-b border-transparent hover:border-gold',
};

export function ButtonLink({
  variant = 'primary',
  arrow = variant !== 'secondary',
  className,
  children,
  ...props
}: LinkProps & { variant?: Variant; arrow?: boolean }) {
  return (
    <Link
      className={cn(
        'group inline-flex items-center gap-4 text-sm tracking-wide transition-colors duration-500 ease-museum',
        styles[variant],
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      {arrow && <Arrow className="transition-transform duration-500 ease-museum group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />}
    </Link>
  );
}
