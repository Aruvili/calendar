# Warning Utility

## What is this for?

This utility prints helpful warning messages in the browser console while developing components:

1. **Wrong prop usage**: Warns developers if they pass invalid props or forget required values.
2. **Deprecated props**: Warns developers when using an old prop that will be removed, showing what new prop to use instead.
3. **No console spam**: Only prints each warning once per unique message, so component re-renders won't flood your console.
4. **Development only**: Does nothing in production builds.

---

## How to use

### 1. Simple Warning (outside or inside components)

Use `warning(condition, componentName, message)`:

- If `condition` is `false`, it logs a warning.

```tsx
import warning from '@/utils/warning';

export function Button({ icon, children }: ButtonProps) {
  // Warn if someone creates a button with no label and no icon
  warning(Boolean(icon || children), 'Button', 'Button must have either text or an icon.');

  return (
    <button>
      {icon} {children}
    </button>
  );
}
```

---

### 2. In Components (Hook: `devUseWarning`)

Use `devUseWarning(componentName)` inside React components:

```tsx
import { devUseWarning } from '@/utils/warning';

interface CalendarProps {
  viewMode?: 'day' | 'week' | 'month';
  /** @deprecated Use `viewMode` instead */
  mode?: 'day' | 'week' | 'month';
}

export function Calendar({ viewMode, mode }: CalendarProps) {
  const devWarning = devUseWarning('Calendar');

  // 1. Warn if an old prop is used
  devWarning.deprecated(!mode, 'mode', 'viewMode');

  // 2. Warn if usage is incorrect
  devWarning(
    !viewMode || ['day', 'week', 'month'].includes(viewMode),
    'usage',
    '`viewMode` must be "day", "week", or "month".',
  );

  return <div>...</div>;
}
```

---

### 3. Warning Types

| Type         | When to use                             | Example                                                  |
| :----------- | :-------------------------------------- | :------------------------------------------------------- |
| `usage`      | Wrong prop value or missing combination | `devWarning(hasDate, 'usage', 'Event must have a date')` |
| `deprecated` | Old prop being replaced                 | `devWarning.deprecated(!oldProp, 'oldProp', 'newProp')`  |
| `breaking`   | Removed feature or critical change      | `devWarning(false, 'breaking', 'Feature X was removed')` |
