// eslint-disable-next-line import/no-named-as-default
import clsx, { type ClassValue } from "clsx";

/**
 * Combine class names (for compatibility; Tailwind removed).
 * Use StyleSheet and style arrays for React Native styling.
 */
export const cn = (...inputs: ClassValue[]): string => {
  return clsx(inputs) as string;
};
