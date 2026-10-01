'use client';

import * as React from 'react';
import { typography, type TypographyType } from '@/design.systems/tokens';
import { devUseWarning } from '@/utils/warning';

export interface CopyConfig {
  text?: string;
  onCopy?: () => void;
  icon?: [React.ReactNode, React.ReactNode]; // [defaultIcon, copiedIcon]
  tooltips?: [string, string]; // [copyText, copiedText]
}

export interface EditConfig {
  editing?: boolean;
  icon?: React.ReactNode;
  tooltip?: string;
  onStart?: () => void;
  onChange?: (value: string) => void;
  onCancel?: () => void;
  onEnd?: () => void;
  maxLength?: number;
  autoSize?: boolean;
}

export interface EllipsisConfig {
  rows?: number;
  expandable?: boolean;
  suffix?: string;
  symbol?: React.ReactNode;
  onExpand?: () => void;
  tooltip?: string;
}

export interface BaseTypographyProps {
  type?: TypographyType;
  disabled?: boolean;
  code?: boolean;
  mark?: boolean;
  delete?: boolean;
  underline?: boolean;
  strong?: boolean;
  italic?: boolean;
  keyboard?: boolean;
  copyable?: boolean | CopyConfig;
  editable?: boolean | EditConfig;
  ellipsis?: boolean | EllipsisConfig;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

//
// Copy & Edit helper icons (Pure SVG, zero extra dependencies)
//
function CopyIcon({ copied }: { copied: boolean }) {
  if (copied) {
    return (
      <svg className="w-3.5 h-3.5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    );
  }

  return (
    <svg
      className="w-3.5 h-3.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
      />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg
      className="w-3.5 h-3.5 text-zinc-400 hover:text-blue-600 transition-colors"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
      />
    </svg>
  );
}

//
// Base Content Wrapper for semantic tags & copy/edit actions
//
function TypographyContent({
  code,
  mark,
  delete: del,
  underline,
  strong,
  italic,
  keyboard,
  disabled,
  type,
  copyable,
  editable,
  ellipsis,
  className = '',
  style,
  children,
  onClick,
  as: Tag = 'span',
  ...rest
}: BaseTypographyProps & { as?: React.ElementType; [key: string]: unknown }) {
  const [copied, setCopied] = React.useState(false);
  const isControlledEditing = typeof editable === 'object' && editable?.editing !== undefined;
  const [internalEditing, setInternalEditing] = React.useState(false);
  const isEditing = isControlledEditing ? Boolean(editable.editing) : internalEditing;

  const defaultText = typeof children === 'string' ? children : '';
  const [inputText, setInputText] = React.useState(defaultText);
  const [expanded, setExpanded] = React.useState(false);

  // Handle Copy
  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const copyConfig = typeof copyable === 'object' ? copyable : {};
    const textToCopy = copyConfig.text || defaultText || String(children || '');

    if (navigator?.clipboard) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        setCopied(true);
        copyConfig.onCopy?.();
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  // Handle Edit Save
  const handleEditEnd = () => {
    setInternalEditing(false);
    if (typeof editable === 'object') {
      editable.onChange?.(inputText);
      editable.onEnd?.();
    }
  };

  // Build modifier classes
  const classes = [
    type ? typography.type[type] : '',
    disabled ? typography.modifiers.disabled : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Inline editing state
  if (isEditing) {
    return (
      <span className="inline-flex items-center gap-1.5">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleEditEnd();
            if (e.key === 'Escape') {
              setInternalEditing(false);
              if (typeof editable === 'object') editable.onCancel?.();
            }
          }}
          onBlur={handleEditEnd}
          autoFocus
          className="px-2 py-0.5 text-inherit bg-white dark:bg-zinc-800 border border-blue-500 rounded outline-none shadow-xs"
        />
        <button
          type="button"
          onClick={handleEditEnd}
          className="text-xs text-blue-600 hover:underline cursor-pointer"
        >
          Save
        </button>
      </span>
    );
  }

  // Wrap with nested semantic tags
  let node: React.ReactNode = children;

  if (code) {
    node = <code className={typography.modifiers.code}>{node}</code>;
  }
  if (keyboard) {
    node = <kbd className={typography.modifiers.keyboard}>{node}</kbd>;
  }
  if (mark) {
    node = <mark className={typography.modifiers.mark}>{node}</mark>;
  }
  if (del) {
    node = <del className={typography.modifiers.delete}>{node}</del>;
  }
  if (underline) {
    node = <u className={typography.modifiers.underline}>{node}</u>;
  }
  if (strong) {
    node = <strong className={typography.modifiers.strong}>{node}</strong>;
  }
  if (italic) {
    node = <em className={typography.modifiers.italic}>{node}</em>;
  }

  // Ellipsis styling
  let ellipsisClasses = '';
  let ellipsisStyles: React.CSSProperties = {};

  if (ellipsis && !expanded) {
    if (typeof ellipsis === 'object' && ellipsis.rows && ellipsis.rows > 1) {
      ellipsisClasses = 'line-clamp-' + ellipsis.rows;
      ellipsisStyles = {
        display: '-webkit-box',
        WebkitLineClamp: ellipsis.rows,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      };
    } else {
      ellipsisClasses = 'truncate inline-block max-w-full align-bottom';
    }
  }

  const isExpandable = typeof ellipsis === 'object' && ellipsis.expandable && !expanded;

  return (
    <Tag
      className={[classes, ellipsisClasses].filter(Boolean).join(' ')}
      style={{ ...ellipsisStyles, ...style }}
      onClick={onClick}
      {...rest}
    >
      {node}

      {isExpandable && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(true);
            (ellipsis as EllipsisConfig).onExpand?.();
          }}
          className="ml-1 text-blue-600 hover:underline cursor-pointer font-normal text-[0.9em]"
        >
          {(ellipsis as EllipsisConfig).symbol || 'Expand'}
        </button>
      )}

      {/* Copy Button */}
      {copyable && (
        <button
          type="button"
          onClick={handleCopy}
          title={copied ? 'Copied!' : 'Copy'}
          aria-label={copied ? 'Copied' : 'Copy'}
          className="inline-flex items-center justify-center p-0.5 ml-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer align-middle"
        >
          <CopyIcon copied={copied} />
        </button>
      )}

      {/* Edit Button */}
      {editable && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setInternalEditing(true);
            if (typeof editable === 'object') editable.onStart?.();
          }}
          title="Edit"
          aria-label="Edit"
          className="inline-flex items-center justify-center p-0.5 ml-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer align-middle"
        >
          <EditIcon />
        </button>
      )}
    </Tag>
  );
}

//
// Typography.Text
//
export interface TextProps extends BaseTypographyProps, React.HTMLAttributes<HTMLSpanElement> {}

export const Text = React.forwardRef<HTMLSpanElement, TextProps>((props, ref) => {
  const devWarning = devUseWarning('Typography.Text');

  devWarning(
    props.children !== undefined,
    'usage',
    'Text component was rendered without any children.',
  );

  return <TypographyContent as="span" ref={ref} {...props} />;
});
Text.displayName = 'Typography.Text';

//
// Typography.Title
//
export type TitleLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface TitleProps extends BaseTypographyProps, React.HTMLAttributes<HTMLHeadingElement> {
  level?: TitleLevel;
}

export const Title = React.forwardRef<HTMLHeadingElement, TitleProps>(
  ({ level = 1, className = '', ...props }, ref) => {
    const devWarning = devUseWarning('Typography.Title');

    devWarning(
      [1, 2, 3, 4, 5, 6].includes(level),
      'usage',
      `Title level must be between 1 and 6, received ${level}.`,
    );

    const validLevel = ([1, 2, 3, 4, 5, 6].includes(level) ? level : 1) as TitleLevel;
    const Tag = `h${validLevel}` as React.ElementType;
    const headingStyle = typography.heading[validLevel];

    return (
      <TypographyContent
        as={Tag}
        ref={ref}
        className={[headingStyle, className].filter(Boolean).join(' ')}
        {...props}
      />
    );
  },
);
Title.displayName = 'Typography.Title';

//
// Typography.Paragraph
//
export interface ParagraphProps
  extends BaseTypographyProps, React.HTMLAttributes<HTMLParagraphElement> {}

export const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <TypographyContent
        as="p"
        ref={ref}
        className={['mb-4 leading-relaxed text-zinc-800 dark:text-zinc-200', className]
          .filter(Boolean)
          .join(' ')}
        {...props}
      />
    );
  },
);
Paragraph.displayName = 'Typography.Paragraph';

//
// Typography.Link
//
export interface LinkProps
  extends BaseTypographyProps, Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'type'> {}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <TypographyContent
        as="a"
        ref={ref}
        className={[
          'text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline underline-offset-2 transition-colors cursor-pointer',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      />
    );
  },
);
Link.displayName = 'Typography.Link';

//
// Master Typography Namespace Object
//
export const Typography = {
  Text,
  Title,
  Paragraph,
  Link,
};

export default Typography;
