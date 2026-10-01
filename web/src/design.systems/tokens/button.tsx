export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export const button = {
  base: 'inline-flex items-center justify-center font-medium transition-colors cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  variant: {
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-sm focus-visible:ring-blue-500',
    secondary:
      'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 active:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 focus-visible:ring-zinc-400',
    outline:
      'border border-zinc-300 bg-transparent text-zinc-900 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800 focus-visible:ring-zinc-400',
    ghost:
      'bg-transparent text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 focus-visible:ring-zinc-400',
    destructive:
      'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-sm focus-visible:ring-red-500',
    link: 'bg-transparent text-blue-600 hover:underline p-0 h-auto shadow-none focus-visible:ring-blue-500',
  },
  size: {
    sm: 'h-8 px-3 text-xs gap-1.5 rounded-md',
    md: 'h-10 px-4 text-sm gap-2 rounded-lg',
    lg: 'h-12 px-6 text-base gap-2.5 rounded-lg',
    icon: 'h-10 w-10 p-0 rounded-lg justify-center',
  },
} as const;
