'use client';

import { useEffect } from 'react';
import { fontFamilies } from '@/constants/fonts';

export const FontLoader = () => {
  useEffect(() => {
    const loadCustomFonts = async () => {
      const customFonts = fontFamilies.filter(
        (font) => font.category === 'custom' && font.file
      );

      for (const font of customFonts) {
        if (font.file && font.name) {
          try {
            // Check if font is already loaded
            if (document.fonts.check(`12px "${font.name}"`)) {
              continue;
            }

            // Load the font using FontFace API
            const fontFace = new FontFace(font.name, `url(${font.file})`);
            const loadedFont = await fontFace.load();
            document.fonts.add(loadedFont);

            console.log(`Loaded font: ${font.name}`);
          } catch (error) {
            console.warn(`Failed to load font ${font.name}:`, error);
          }
        }
      }
    };

    loadCustomFonts();
  }, []);

  return null; // This component doesn't render anything
};
