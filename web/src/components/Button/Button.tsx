import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { button, type ButtonSize, type ButtonVariant } from '@/design.systems/tokens';
import { devUseWarning } from '@/utils/warning';

export type { ButtonSize, ButtonVariant };

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Change the component to the HTML tag or component specified by the single child.
   * Powered by Radix UI Slot.
   */
  asChild?: boolean;
  /**
   * Visual style variant of the button.
   * @default 'primary'
   */
  variant?: ButtonVariant;
  /**
   * Size of the button.
   * @default 'md'
   */
  size?: ButtonSize;
  /**
   * Shows a loading spinner and disables user interaction.
   */
  loading?: boolean;
  /**
   * Icon element to display alongside the button text.
   */
  icon?: React.ReactNode;
  /**
   * Position of the icon relative to the children text.
   * @default 'start'
   */
  iconPosition?: 'start' | 'end';
  /**
   * Full width button.
   */
  block?: boolean;
  /**
   * @deprecated Use `variant="ghost"` instead.
   */
  ghost?: boolean;
  /**
   * @deprecated Use `variant="destructive"` instead.
   */
  danger?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      asChild = false,
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      icon,
      iconPosition = 'start',
      block = false,
      ghost,
      danger,
      className = '',
      children,
      ...restProps
    },
    ref,
  ) => {
    const devWarning = devUseWarning('Button');

    // 1. Accessibility warning: button with no label, no icon, and no aria-label
    devWarning(
      Boolean(children || icon || restProps['aria-label']),
      'usage',
      'Button should have accessible content (pass `children`, `icon`, or `aria-label`).',
    );

    // 2. Deprecation warnings for legacy props
    devWarning.deprecated(ghost === undefined, 'ghost', 'variant="ghost"');

    devWarning.deprecated(danger === undefined, 'danger', 'variant="destructive"');

    // 3. Incompatible prop combination warning
    devWarning(
      !(asChild && loading),
      'usage',
      '`loading` cannot be rendered inside a Radix UI `asChild` composition.',
    );

    // Resolve effective variant with fallback for deprecated props
    let resolvedVariant: ButtonVariant = variant;
    if (danger) {
      resolvedVariant = 'destructive';
    } else if (ghost) {
      resolvedVariant = 'ghost';
    }

    const widthStyle = block ? 'w-full' : '';
    const combinedClassName = [
      button.base,
      button.variant[resolvedVariant] || button.variant.primary,
      button.size[size] || button.size.md,
      widthStyle,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const Comp = asChild ? Slot : 'button';

    if (asChild) {
      return (
        <Comp ref={ref} className={combinedClassName} {...restProps}>
          {children}
        </Comp>
      );
    }

    return (
      <Comp
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading}
        className={combinedClassName}
        {...restProps}
      >
        {loading && (
          <svg
            className="animate-spin -ml-0.5 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}

        {!loading && icon && iconPosition === 'start' && <span className="shrink-0">{icon}</span>}

        {children && <span>{children}</span>}

        {!loading && icon && iconPosition === 'end' && <span className="shrink-0">{icon}</span>}
      </Comp>
    );
  },
);

Button.displayName = 'Button';

export default Button;
