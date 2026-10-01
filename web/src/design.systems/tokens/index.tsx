import { button } from './button';
import { color } from './color';
import { radius } from './radius';
import { typography } from './typography';

export const theme = {
  color,
  radius,
  typography,
  button,
} as const;

export * from './button';
export * from './color';
export * from './radius';
export * from './typography';
