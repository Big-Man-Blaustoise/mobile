import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

// Theme colors
const colors = {
  // Brand colors
  carnegieRed: '#C41230',
  carnegieRedLight: '#FF4C5B',
  
  // Light theme colors
  lightBackground: '#F5F6F7',
  lightText: '#121212',
  lightCardBackground: '#FFFFFF',
  
  // Dark theme colors
  darkBackground: '#121212',
  darkCardBackground: '#1E1E1E',
  darkText: '#E0E0E0',
  darkSecondaryText: '#B0B0B0',
  
  // Shared colors
  ironGray: '#6D6E71',
  steelGray: '#E0E0E0',
};

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    // Primary & accent colors
    primary: colors.carnegieRed,
    secondary: colors.ironGray,
    
    // Background colors
    background: colors.lightBackground,
    surface: colors.lightCardBackground,
    surfaceVariant: colors.lightCardBackground,
    
    // Text colors
    text: colors.lightText,
    onSurface: colors.lightText,
    onSurfaceVariant: colors.ironGray,
    onBackground: colors.lightText,
    
    // UI elements
    outline: colors.steelGray,
    inverseSurface: colors.carnegieRed,
    onInverseSurface: colors.lightCardBackground,
    
    // Navigation
    headerBackground: colors.carnegieRed,
    headerText: colors.lightCardBackground,
    
    // Elevation (shadows and layers)
    elevation: {
      level0: 'transparent',
      level1: colors.lightCardBackground,
      level2: colors.lightCardBackground,
      level3: colors.lightCardBackground,
      level4: colors.lightCardBackground,
      level5: colors.lightCardBackground,
    },
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    // Primary & accent colors
    primary: colors.carnegieRedLight,
    secondary: colors.darkSecondaryText,
    
    // Background colors
    background: colors.darkBackground,
    surface: colors.darkCardBackground,
    surfaceVariant: colors.darkCardBackground,
    
    // Text colors
    text: colors.darkText,
    onSurface: colors.darkText,
    onSurfaceVariant: colors.darkSecondaryText,
    onBackground: colors.darkText,
    
    // UI elements
    outline: colors.ironGray,
    inverseSurface: colors.carnegieRed,
    onInverseSurface: colors.darkText,
    
    // Navigation
    headerBackground: colors.carnegieRed,
    headerText: colors.darkText,
    
    // Elevation (shadows and layers)
    elevation: {
      level0: 'transparent',
      level1: colors.darkCardBackground,
      level2: colors.darkCardBackground,
      level3: colors.darkCardBackground,
      level4: colors.darkCardBackground,
      level5: colors.darkCardBackground,
    },
  },
};

export const getTheme = (themeName: 'light' | 'dark') => {
  return themeName === 'light' ? lightTheme : darkTheme;
}; 