export type TypographyType = 'secondary' | 'success' | 'warning' | 'danger';

export const typography = {
  h1: '24px',
  h2: '18px',
  h3: '16px',
  h4: '14px',
  h5: '12px',
  h6: '10px',

  // Heading styles (levels 1-6)
  heading: {
    1: 'text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50',
    2: 'text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50',
    3: 'text-lg sm:text-xl font-semibold text-zinc-900 dark:text-zinc-50',
    4: 'text-base sm:text-lg font-medium text-zinc-900 dark:text-zinc-50',
    5: 'text-sm font-medium text-zinc-900 dark:text-zinc-50',
    6: 'text-xs font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wider',
  },

  // Semantic color types
  type: {
    secondary: 'text-zinc-500 dark:text-zinc-400',
    success: 'text-emerald-600 dark:text-emerald-400',
    warning: 'text-amber-600 dark:text-amber-400',
    danger: 'text-red-600 dark:text-red-400',
  },

  // Semantic formatting modifiers
  modifiers: {
    code: 'font-mono text-[0.875em] bg-zinc-100 dark:bg-zinc-800 text-pink-600 dark:text-pink-400 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-700',
    keyboard:
      'font-mono text-[0.8em] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 px-1.5 py-0.5 rounded border border-zinc-300 dark:border-zinc-700 shadow-xs',
    mark: 'bg-amber-200 dark:bg-amber-900/60 text-zinc-900 dark:text-zinc-100 px-1 rounded',
    delete: 'line-through text-zinc-400 dark:text-zinc-500',
    underline: 'underline underline-offset-4',
    strong: 'font-semibold',
    italic: 'italic',
    disabled: 'opacity-50 cursor-not-allowed select-none pointer-events-none',
  },
} as const;
