# Development Warning Utility (`warning.ts`)

A lightweight, zero-dependency development warning and deprecation reporting utility for the Calendar design system and web components.

---

## Purpose

When building reusable UI components and design systems, developers need to communicate:

- Incorrect component prop usage (e.g. missing required configurations)
- Deprecated props being phased out in future releases
- Breaking architectural changes

This utility provides a standardized way to log these warnings during development **without including any external dependencies** (such as `@rc-component/util`) and **without impacting production bundle performance**.

---

## Features

- **Zero-Dependency**: Pure React and TypeScript.
- **Automatic Deduplication**: Warnings are logged only once per unique message, preventing console spam during re-renders.
- **Zero Production Overhead**: Tree-shakes to a no-op in production builds (`NODE_ENV === 'production'`).
- **Test-Friendly**: Exposes `resetWarned()` to reset the deduplication cache between test suites.
- **Deprecation Aggregation**: Supports `WarningContext` (`strict: false`) to group multiple deprecations into a single clean summary.

---

## API Reference

### 1. Direct Warning: `warning(valid, component, message)`

Logs a warning if `valid` is `false`.

```tsx
import warning from '@/utils/warning';

function CalendarGrid({ days }: CalendarGridProps) {
  warning(days.length > 0, 'CalendarGrid', '`days` array should not be empty');

  return <div>...</div>;
}
```

### 2. Component Hook: `useDevWarning(component)` (alias: `devUseWarning`)

Returns a type-aware warning function specifically for components.

#### Methods:

- `devWarning(valid, 'usage' | 'deprecated' | 'breaking', message)`
- `devWarning.deprecated(valid, oldProp, newProp, extraMessage?)`

```tsx
import { devUseWarning } from '@/utils/warning';

interface EventItemProps {
  date?: string;
  /** @deprecated use `date` instead */
  eventDate?: string;
}

export function EventItem({ date, eventDate }: EventItemProps) {
  const devWarning = devUseWarning('EventItem');

  // Deprecated prop notification
  devWarning.deprecated(!eventDate, 'eventDate', 'date');

  // Usage validation
  devWarning(Boolean(date || eventDate), 'usage', 'Must provide a valid date');

  return <div>...</div>;
}
```

### 3. Aggregation Context: `<WarningContext.Provider>`

Controls whether deprecation notices appear immediately or get batched:

```tsx
import { WarningContext } from '@/utils/warning';

// Aggregate deprecation warnings into a single console summary:
<WarningContext.Provider value={{ strict: false }}>
  <App />
</WarningContext.Provider>;
```

### 4. Testing Reset: `resetWarned()`

Clears the deduplication cache so warnings can be tested repeatedly across unit tests:

```tsx
import { resetWarned } from '@/utils/warning';

afterEach(() => {
  resetWarned();
});
```
