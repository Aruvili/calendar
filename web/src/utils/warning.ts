import * as React from 'react';

export function noop() {}

// Set to deduplicate logged warning messages so the console is not spammed
const warnedMessages = new Set<string>();
let deprecatedWarnList: Record<string, string[]> | null = null;

export function resetWarned() {
  warnedMessages.clear();
  deprecatedWarnList = null;
}

export type Warning = (valid: boolean, component: string, message?: string) => void;

let _warning: Warning = noop;

if (process.env.NODE_ENV !== 'production') {
  _warning = (valid, component, message = '') => {
    if (!valid && typeof console !== 'undefined') {
      const fullMessage = `[calendar: ${component}] ${message}`;

      if (!warnedMessages.has(fullMessage)) {
        warnedMessages.add(fullMessage);
        console.warn(`Warning: ${fullMessage}`);
      }
    }

    // Reset warnings in test environment so tests can assert them independently
    if (process.env.NODE_ENV === 'test') {
      resetWarned();
    }
  };
}

export const warning: Warning = _warning;

export type WarningType = 'deprecated' | 'usage' | 'breaking';

export type BaseTypeWarning = (
  valid: boolean,
  /**
   * - deprecated: Some API will be removed in future but still supported now.
   * - usage: Some API usage is incorrect.
   * - breaking: Breaking change like an API being removed.
   */
  type: WarningType,
  message?: string,
) => void;

export type TypeWarning = BaseTypeWarning & {
  deprecated: (valid: boolean, oldProp: string, newProp: string, message?: string) => void;
};

export interface WarningContextProps {
  /**
   * Set warning level. When false, deprecated warnings are aggregated into a single message.
   */
  strict?: boolean;
}

export const WarningContext = React.createContext<WarningContextProps>({});

/**
 * Hook for development warnings (tree-shakes to a zero-overhead no-op in production)
 */
export const useDevWarning: (component: string) => TypeWarning =
  process.env.NODE_ENV !== 'production'
    ? (component: string) => {
        const { strict } = React.useContext(WarningContext);

        const typeWarning: TypeWarning = (valid, type, message = '') => {
          if (!valid) {
            if (strict === false && type === 'deprecated') {
              const isFirstTime = !deprecatedWarnList;

              if (!deprecatedWarnList) {
                deprecatedWarnList = {};
              }

              deprecatedWarnList[component] = deprecatedWarnList[component] || [];
              if (!deprecatedWarnList[component].includes(message)) {
                deprecatedWarnList[component].push(message);
              }

              // Warning for the first time
              if (isFirstTime) {
                console.warn(
                  '[calendar] There exists deprecated usage in your code:',
                  deprecatedWarnList,
                );
              }
            } else {
              warning(valid, component, `[${type}] ${message}`);
            }
          }
        };

        typeWarning.deprecated = (valid, oldProp, newProp, message = '') => {
          typeWarning(
            valid,
            'deprecated',
            `\`${oldProp}\` is deprecated. Please use \`${newProp}\` instead.${message ? ` ${message}` : ''}`,
          );
        };

        return typeWarning;
      }
    : () => {
        const noopWarning: TypeWarning = () => {};
        noopWarning.deprecated = noop;
        return noopWarning;
      };

export const devUseWarning = useDevWarning;

export default warning;
