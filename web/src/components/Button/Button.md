# Button Component

An accessible, customizable button component built with **Radix UI (`Slot`)** and styled using our central **design tokens**.

---

## What is this for?

- **Actions & Forms**: Primary, secondary, outline, ghost, destructive, and link buttons.
- **Polymorphic Rendering (`asChild`)**: Render the button as an anchor (`<a>`) or Next.js `<Link>` with full button styling and accessibility.
- **Loading State**: Displays an accessible animated spinner and disables clicks while performing async actions.
- **Built-in Dev Warnings**: Warns in development if accessible content is missing or if deprecated props are used.

---

## How to use

### 1. Basic Usage

```tsx
import { Button } from '@/components/Button';

export function Example() {
  return (
    <div className="flex gap-3">
      <Button variant="primary">Create Event</Button>
      <Button variant="secondary">Cancel</Button>
      <Button variant="outline">Settings</Button>
      <Button variant="destructive">Delete</Button>
    </div>
  );
}
```

---

### 2. Sizes

```tsx
<Button size="sm">Small</Button>
<Button size="md">Medium (Default)</Button>
<Button size="lg">Large</Button>
<Button size="icon" aria-label="Add Event">➕</Button>
```

---

### 3. Loading State

Disables clicks, sets `aria-busy="true"`, and shows an animated spinner:

```tsx
<Button loading>Saving...</Button>
```

---

### 4. With Icons

```tsx
<Button icon={<CalendarIcon />} iconPosition="start">
  Select Date
</Button>

<Button icon={<ArrowRightIcon />} iconPosition="end">
  Next
</Button>
```

---

### 5. Render as a Link (`asChild`)

Powered by **Radix UI Slot**, this allows Next.js `<Link>` or `<a>` to look and behave like a button without nesting `<button>` inside `<a>`:

```tsx
import Link from 'next/link';
import { Button } from '@/components/Button';

<Button asChild variant="primary">
  <Link href="/calendar/new">New Event</Link>
</Button>;
```

---

## Props Reference

| Prop           | Type                                                                          | Default     | Description                                        |
| :------------- | :---------------------------------------------------------------------------- | :---------- | :------------------------------------------------- |
| `variant`      | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'destructive' \| 'link'` | `'primary'` | Visual style of the button                         |
| `size`         | `'sm' \| 'md' \| 'lg' \| 'icon'`                                              | `'md'`      | Button height and padding                          |
| `asChild`      | `boolean`                                                                     | `false`     | Merges props onto its immediate child (Radix Slot) |
| `loading`      | `boolean`                                                                     | `false`     | Shows loading spinner and disables button          |
| `disabled`     | `boolean`                                                                     | `false`     | Disables user interaction                          |
| `icon`         | `React.ReactNode`                                                             | -           | Icon element to render                             |
| `iconPosition` | `'start' \| 'end'`                                                            | `'start'`   | Icon position relative to label                    |
| `block`        | `boolean`                                                                     | `false`     | Full-width button                                  |
| `ghost`        | `boolean`                                                                     | -           | _(Deprecated)_ Use `variant="ghost"`               |
| `danger`       | `boolean`                                                                     | -           | _(Deprecated)_ Use `variant="destructive"`         |

---

## Design Tokens

Styles are controlled in [web/src/design.systems/tokens/button.tsx](file:///home/fondness/Projects/sample/calender/web/src/design.systems/tokens/button.tsx). Updating the tokens updates buttons across the entire application.
