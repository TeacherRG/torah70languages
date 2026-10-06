import type { ComponentProps } from 'react';
import { cn } from '@/lib/cn';

export function Eyebrow({ className, ...props }: ComponentProps<'p'>) {
  return <p className={cn('label text-gold', className)} {...props} />;
}
