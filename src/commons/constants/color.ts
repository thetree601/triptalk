/**
 * Color Token System
 * 
 * This file contains the tokenized color system extracted from Figma foundation.
 * All colors are organized for both light and dark mode usage.
 */

// Base color values from Figma
const baseColors = {
  // Gray scale
  white: '#ffffff',
  gray50: '#f2f2f2',
  gray100: '#e4e4e4',
  gray200: '#d4d3d3',
  gray300: '#c7c7c7',
  gray400: '#ababab',
  gray500: '#919191',
  gray600: '#777777',
  gray700: '#5f5f5f',
  gray800: '#333333',
  gray900: '#1c1c1c',
  black: '#000000',
  
  // Brand colors
  primary: '#2974e5',
  red: '#f66a6a',
} as const;

// Light mode color tokens
export const lightColors = {
  // Background colors
  background: baseColors.white,
  backgroundSecondary: baseColors.gray50,
  backgroundTertiary: baseColors.gray100,
  
  // Text colors
  textPrimary: baseColors.black,
  textSecondary: baseColors.gray800,
  textTertiary: baseColors.gray600,
  textDisabled: baseColors.gray400,
  textInverse: baseColors.white,
  
  // Border colors
  borderPrimary: baseColors.gray200,
  borderSecondary: baseColors.gray300,
  borderFocus: baseColors.primary,
  
  // Interactive colors
  primary: baseColors.primary,
  primaryHover: '#1e5bb8',
  primaryActive: '#1a4fa0',
  
  // Status colors
  success: '#10b981',
  warning: '#f59e0b',
  error: baseColors.red,
  info: baseColors.primary,
  
  // Neutral colors
  neutral: baseColors.gray500,
  neutralLight: baseColors.gray300,
  neutralDark: baseColors.gray700,
} as const;

// Dark mode color tokens
export const darkColors = {
  // Background colors
  background: baseColors.black,
  backgroundSecondary: baseColors.gray900,
  backgroundTertiary: baseColors.gray800,
  
  // Text colors
  textPrimary: baseColors.white,
  textSecondary: baseColors.gray200,
  textTertiary: baseColors.gray400,
  textDisabled: baseColors.gray600,
  textInverse: baseColors.black,
  
  // Border colors
  borderPrimary: baseColors.gray700,
  borderSecondary: baseColors.gray600,
  borderFocus: baseColors.primary,
  
  // Interactive colors
  primary: baseColors.primary,
  primaryHover: '#3d85e8',
  primaryActive: '#4a8ceb',
  
  // Status colors
  success: '#10b981',
  warning: '#f59e0b',
  error: baseColors.red,
  info: baseColors.primary,
  
  // Neutral colors
  neutral: baseColors.gray500,
  neutralLight: baseColors.gray600,
  neutralDark: baseColors.gray300,
} as const;

// Combined color system
export const colors = {
  light: lightColors,
  dark: darkColors,
} as const;

// CSS variable names for globals.css
export const cssVariables = {
  // Background variables
  '--color-background': 'var(--color-background-light)',
  '--color-background-secondary': 'var(--color-background-secondary-light)',
  '--color-background-tertiary': 'var(--color-background-tertiary-light)',
  
  // Text variables
  '--color-text-primary': 'var(--color-text-primary-light)',
  '--color-text-secondary': 'var(--color-text-secondary-light)',
  '--color-text-tertiary': 'var(--color-text-tertiary-light)',
  '--color-text-disabled': 'var(--color-text-disabled-light)',
  '--color-text-inverse': 'var(--color-text-inverse-light)',
  
  // Border variables
  '--color-border-primary': 'var(--color-border-primary-light)',
  '--color-border-secondary': 'var(--color-border-secondary-light)',
  '--color-border-focus': 'var(--color-border-focus-light)',
  
  // Interactive variables
  '--color-primary': 'var(--color-primary-light)',
  '--color-primary-hover': 'var(--color-primary-hover-light)',
  '--color-primary-active': 'var(--color-primary-active-light)',
  
  // Status variables
  '--color-success': 'var(--color-success-light)',
  '--color-warning': 'var(--color-warning-light)',
  '--color-error': 'var(--color-error-light)',
  '--color-info': 'var(--color-info-light)',
  
  // Neutral variables
  '--color-neutral': 'var(--color-neutral-light)',
  '--color-neutral-light': 'var(--color-neutral-light-light)',
  '--color-neutral-dark': 'var(--color-neutral-dark-light)',
} as const;

// Type definitions
export type ColorMode = 'light' | 'dark';
export type LightColors = typeof lightColors;
export type DarkColors = typeof darkColors;
export type Colors = typeof colors;
