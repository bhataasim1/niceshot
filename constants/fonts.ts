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

  // we will add custom fonts here
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
