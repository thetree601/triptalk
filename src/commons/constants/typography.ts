/**
 * Typography System
 * Based on Figma Typography Foundation (Node ID: 10043:11769)
 * 
 * This file contains all typography tokens for the project.
 * Supports Korean (Pretendard) and English typography with mobile/desktop breakpoints.
 */

// Font Families
export const FONT_FAMILIES = {
  // Korean typography (default)
  korean: {
    primary: 'Pretendard Variable, -apple-system, BlinkMacSystemFont, system-ui, Roboto, Helvetica Neue, Segoe UI, Apple SD Gothic Neo, Noto Sans KR, Malgun Gothic, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, sans-serif',
    heading: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, Helvetica Neue, Segoe UI, Apple SD Gothic Neo, Noto Sans KR, Malgun Gothic, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, sans-serif',
  },
  // English typography (for future use)
  english: {
    primary: 'Inter, -apple-system, BlinkMacSystemFont, system-ui, Roboto, Helvetica Neue, Segoe UI, sans-serif',
    heading: 'Inter, -apple-system, BlinkMacSystemFont, system-ui, Roboto, Helvetica Neue, Segoe UI, sans-serif',
  },
} as const;

// Font Weights
export const FONT_WEIGHTS = {
  light: 300,
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
} as const;

// Font Sizes (in pixels)
export const FONT_SIZES = {
  // Headings
  h1: {
    mobile: 24,
    desktop: 28,
  },
  h2: {
    mobile: 16,
    desktop: 18,
  },
  // Body Text
  large: {
    mobile: 16,
    desktop: 18,
  },
  regular: {
    mobile: 14,
    desktop: 16,
  },
  small: {
    mobile: 12,
    desktop: 14,
  },
  caption: {
    mobile: 10,
    desktop: 12,
  },
} as const;

// Line Heights (calculated as 1.5x font size)
export const LINE_HEIGHTS = {
  h1: {
    mobile: 36, // 24 * 1.5
    desktop: 42, // 28 * 1.5
  },
  h2: {
    mobile: 24, // 16 * 1.5
    desktop: 27, // 18 * 1.5
  },
  large: {
    mobile: 24, // 16 * 1.5
    desktop: 27, // 18 * 1.5
  },
  regular: {
    mobile: 21, // 14 * 1.5
    desktop: 24, // 16 * 1.5
  },
  small: {
    mobile: 18, // 12 * 1.5
    desktop: 21, // 14 * 1.5
  },
  caption: {
    mobile: 15, // 10 * 1.5
    desktop: 18, // 12 * 1.5
  },
} as const;

// Typography Tokens
export const TYPOGRAPHY = {
  // Headings
  h1: {
    fontFamily: FONT_FAMILIES.korean.heading,
    fontSize: FONT_SIZES.h1,
    fontWeight: FONT_WEIGHTS.bold,
    lineHeight: LINE_HEIGHTS.h1,
  },
  h2: {
    fontFamily: FONT_FAMILIES.korean.primary,
    fontSize: FONT_SIZES.h2,
    fontWeight: FONT_WEIGHTS.semiBold,
    lineHeight: LINE_HEIGHTS.h2,
  },
  // Body Text
  large: {
    fontFamily: FONT_FAMILIES.korean.primary,
    fontSize: FONT_SIZES.large,
    fontWeight: FONT_WEIGHTS.semiBold,
    lineHeight: LINE_HEIGHTS.large,
  },
  regular: {
    fontFamily: FONT_FAMILIES.korean.primary,
    fontSize: FONT_SIZES.regular,
    fontWeight: FONT_WEIGHTS.medium,
    lineHeight: LINE_HEIGHTS.regular,
  },
  small: {
    fontFamily: FONT_FAMILIES.korean.primary,
    fontSize: FONT_SIZES.small,
    fontWeight: FONT_WEIGHTS.medium,
    lineHeight: LINE_HEIGHTS.small,
  },
  caption: {
    fontFamily: FONT_FAMILIES.korean.primary,
    fontSize: FONT_SIZES.caption,
    fontWeight: FONT_WEIGHTS.regular,
    lineHeight: LINE_HEIGHTS.caption,
  },
} as const;

// Typography Usage Guidelines
export const TYPOGRAPHY_USAGE = {
  h1: 'Page titles, main headings',
  h2: 'Section titles, subsection headings',
  large: 'Button labels, important text',
  regular: 'Navigation, form labels, body text',
  small: 'Card titles, table content',
  caption: 'Form labels, helper text, metadata',
} as const;

// Responsive Typography Helper
export const getResponsiveTypography = (
  typography: keyof typeof TYPOGRAPHY,
  breakpoint: 'mobile' | 'desktop' = 'desktop'
) => {
  const typo = TYPOGRAPHY[typography];
  return {
    fontFamily: typo.fontFamily,
    fontSize: typo.fontSize[breakpoint],
    fontWeight: typo.fontWeight,
    lineHeight: typo.lineHeight[breakpoint],
  };
};

// CSS Custom Properties Helper
export const getTypographyCSSProperties = (
  typography: keyof typeof TYPOGRAPHY,
  breakpoint: 'mobile' | 'desktop' = 'desktop'
) => {
  const typo = TYPOGRAPHY[typography];
  return {
    '--font-family': typo.fontFamily,
    '--font-size': `${typo.fontSize[breakpoint]}px`,
    '--font-weight': typo.fontWeight,
    '--line-height': `${typo.lineHeight[breakpoint]}px`,
  };
};

// English Typography Override (for future use)
export const ENGLISH_TYPOGRAPHY = {
  h1: {
    ...TYPOGRAPHY.h1,
    fontFamily: FONT_FAMILIES.english.heading,
  },
  h2: {
    ...TYPOGRAPHY.h2,
    fontFamily: FONT_FAMILIES.english.primary,
  },
  large: {
    ...TYPOGRAPHY.large,
    fontFamily: FONT_FAMILIES.english.primary,
  },
  regular: {
    ...TYPOGRAPHY.regular,
    fontFamily: FONT_FAMILIES.english.primary,
  },
  small: {
    ...TYPOGRAPHY.small,
    fontFamily: FONT_FAMILIES.english.primary,
  },
  caption: {
    ...TYPOGRAPHY.caption,
    fontFamily: FONT_FAMILIES.english.primary,
  },
} as const;
