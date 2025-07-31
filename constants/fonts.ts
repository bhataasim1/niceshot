export interface FontFamily {
  id: string;
  name: string;
  category: 'system' | 'custom';
  file?: string; // TTF file path for custom fonts
  fallback?: string; // Fallback font stack
}

export const fontFamilies: FontFamily[] = [
  // System fonts
  {
    id: 'system',
    name: 'System Default',
    category: 'system',
    fallback:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  {
    id: 'arial',
    name: 'Arial',
    category: 'system',
    fallback: 'Arial, Helvetica, sans-serif',
  },
  {
    id: 'helvetica',
    name: 'Helvetica',
    category: 'system',
    fallback: 'Helvetica, Arial, sans-serif',
  },
  {
    id: 'times',
    name: 'Times New Roman',
    category: 'system',
    fallback: 'Times New Roman, Times, serif',
  },
  {
    id: 'georgia',
    name: 'Georgia',
    category: 'system',
    fallback: 'Georgia, Times, serif',
  },
  {
    id: 'verdana',
    name: 'Verdana',
    category: 'system',
    fallback: 'Verdana, Geneva, sans-serif',
  },
  {
    id: 'courier',
    name: 'Courier New',
    category: 'system',
    fallback: 'Courier New, Courier, monospace',
  },
  {
    id: 'impact',
    name: 'Impact',
    category: 'system',
    fallback: 'Impact, Charcoal, sans-serif',
  },
  {
    id: 'tahoma',
    name: 'Tahoma',
    category: 'system',
    fallback: 'Tahoma, Geneva, sans-serif',
  },
  {
    id: 'trebuchet',
    name: 'Trebuchet MS',
    category: 'system',
    fallback: 'Trebuchet MS, Geneva, sans-serif',
  },

  // Custom fonts (TTF files)
  {
    id: 'inter',
    name: 'Inter',
    category: 'custom',
    file: '/fonts/Inter-Regular.ttf',
    fallback: 'Inter, system-ui, sans-serif',
  },
  {
    id: 'poppins',
    name: 'Poppins',
    category: 'custom',
    file: '/fonts/Poppins-Regular.ttf',
    fallback: 'Poppins, system-ui, sans-serif',
  },
  {
    id: 'roboto',
    name: 'Roboto',
    category: 'custom',
    file: '/fonts/Roboto-Regular.ttf',
    fallback: 'Roboto, system-ui, sans-serif',
  },
  {
    id: 'opensans',
    name: 'Open Sans',
    category: 'custom',
    file: '/fonts/OpenSans-Regular.ttf',
    fallback: 'Open Sans, system-ui, sans-serif',
  },
  {
    id: 'montserrat',
    name: 'Montserrat',
    category: 'custom',
    file: '/fonts/Montserrat-Regular.ttf',
    fallback: 'Montserrat, system-ui, sans-serif',
  },
  {
    id: 'raleway',
    name: 'Raleway',
    category: 'custom',
    file: '/fonts/Raleway-Regular.ttf',
    fallback: 'Raleway, system-ui, sans-serif',
  },
  {
    id: 'lato',
    name: 'Lato',
    category: 'custom',
    file: '/fonts/Lato-Regular.ttf',
    fallback: 'Lato, system-ui, sans-serif',
  },
  {
    id: 'nunito',
    name: 'Nunito',
    category: 'custom',
    file: '/fonts/Nunito-Regular.ttf',
    fallback: 'Nunito, system-ui, sans-serif',
  },
  {
    id: 'quicksand',
    name: 'Quicksand',
    category: 'custom',
    file: '/fonts/Quicksand-Regular.ttf',
    fallback: 'Quicksand, system-ui, sans-serif',
  },
  {
    id: 'ubuntu',
    name: 'Ubuntu',
    category: 'custom',
    file: '/fonts/Ubuntu-Regular.ttf',
    fallback: 'Ubuntu, system-ui, sans-serif',
  },
];

export const getFontFamily = (id: string): FontFamily | undefined => {
  return fontFamilies.find((font) => font.id === id);
};

export const getFontCSS = (fontId: string): string => {
  const font = getFontFamily(fontId);
  if (!font) return fontFamilies[0].fallback || 'system-ui, sans-serif';

  if (font.category === 'custom' && font.file) {
    return `"${font.name}", ${font.fallback}`;
  }

  return font.fallback || 'system-ui, sans-serif';
};
