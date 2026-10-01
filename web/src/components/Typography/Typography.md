# Typography Component

A flexible, accessible typography system supporting headings, paragraphs, formatted text, inline editing, clipboard copying, and text truncation.

---

## What is this for?

- **Semantic Headings (`Title`)**: Levels 1 through 6 (`h1`–`h6`) with consistent hierarchy.
- **Body & Text Formatting (`Text`, `Paragraph`)**: Quick semantic modifiers (`code`, `keyboard`, `mark`, `delete`, `underline`, `strong`, `italic`).
- **Semantic Colors (`type`)**: `secondary`, `success`, `warning`, `danger`.
- **Interactive Tools**:
  - `copyable`: One-click clipboard copy with instant visual checkmark feedback.
  - `editable`: Inline live-editing with Enter to save and Esc to cancel.
  - `ellipsis`: Single or multi-line truncation with optional "Expand" toggle.
- **Built-in Dev Warnings**: Warns if invalid heading levels are passed or children are missing.

---

## How to use

### 1. Headings (`Title`)

```tsx
import { Title } from '@/components/Typography';

export function HeadingExample() {
  return (
    <>
      <Title level={1}>H1 Calendar Dashboard</Title>
      <Title level={2}>H2 Upcoming Events</Title>
      <Title level={3}>H3 Event Details</Title>
      <Title level={4} type="secondary">
        H4 Subtitle
      </Title>
    </>
  );
}
```

---

### 2. Semantic Text Modifiers (`Text`)

```tsx
import { Text } from '@/components/Typography';

export function ModifiersExample() {
  return (
    <div className="flex flex-col gap-2">
      <Text>Default text</Text>
      <Text type="secondary">Secondary text</Text>
      <Text type="success">Sync succeeded</Text>
      <Text type="warning">Sync pending</Text>
      <Text type="danger">Sync failed</Text>
      <Text strong>Bold text</Text>
      <Text italic>Italic text</Text>
      <Text underline>Underlined text</Text>
      <Text delete>Deleted / Strikethrough</Text>
      <Text mark>Highlighted / Marked</Text>
      <Text code>npm run dev</Text>
      <Text keyboard>Ctrl + S</Text>
      <Text disabled>Disabled text</Text>
    </div>
  );
}
```

---

### 3. Copyable Text (`copyable`)

Clicking the copy icon writes to the clipboard with an animated checkmark:

```tsx
<Text copyable>cal_evt_9283749281</Text>

// Custom copy callback or text
<Text copyable={{ text: 'https://calendar.app/event/123', onCopy: () => console.log('Copied!') }}>
  Share Link
</Text>
```

---

### 4. Editable Text (`editable`)

Clicking the edit icon opens an inline input field:

```tsx
<Text editable={{ onChange: (newVal) => console.log('Updated:', newVal) }}>Team Weekly Sync</Text>
```

---

### 5. Ellipsis & Expandable (`ellipsis`)

```tsx
// Single line truncation
<Text ellipsis className="w-48">
  A very long calendar event title that overflows the container width.
</Text>

// Multi-line truncation with expand button
<Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'Read more' }}>
  This is a detailed event description with lots of information about the upcoming quarterly review meeting and agenda items that will be discussed.
</Paragraph>
```

---

## Props Reference

| Prop        | Type                                                | Default | Description                                     |
| :---------- | :-------------------------------------------------- | :------ | :---------------------------------------------- |
| `type`      | `'secondary' \| 'success' \| 'warning' \| 'danger'` | -       | Semantic color theme                            |
| `disabled`  | `boolean`                                           | `false` | Dimmed and non-interactive text                 |
| `strong`    | `boolean`                                           | `false` | Bold font weight (`<strong>`)                   |
| `italic`    | `boolean`                                           | `false` | Italic font style (`<em>`)                      |
| `underline` | `boolean`                                           | `false` | Underlined text (`<u>`)                         |
| `delete`    | `boolean`                                           | `false` | Strikethrough text (`<del>`)                    |
| `code`      | `boolean`                                           | `false` | Inline code block (`<code>`)                    |
| `mark`      | `boolean`                                           | `false` | Highlighted text (`<mark>`)                     |
| `keyboard`  | `boolean`                                           | `false` | Keyboard badge (`<kbd>`)                        |
| `copyable`  | `boolean \| CopyConfig`                             | `false` | Enables one-click clipboard copying             |
| `editable`  | `boolean \| EditConfig`                             | `false` | Enables inline text editing                     |
| `ellipsis`  | `boolean \| EllipsisConfig`                         | `false` | Truncates overflowing text with optional expand |
| `level`     | `1 \| 2 \| 3 \| 4 \| 5 \| 6`                        | `1`     | _(Title only)_ Heading level `h1` through `h6`  |

---

## Design Tokens

Headings, type colors, and modifiers are styled using [web/src/design.systems/tokens/typography.tsx](file:///home/fondness/Projects/sample/calender/web/src/design.systems/tokens/typography.tsx).
