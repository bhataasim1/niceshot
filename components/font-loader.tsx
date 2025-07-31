'use client';

import { useEffect } from 'react';
import { fontFamilies } from '@/constants/fonts';

export const FontLoader = () => {
  useEffect(() => {
    const loadCustomFonts = async () => {
      const customFonts = fontFamilies.filter(
        (font) => font.category === 'custom'
      );

      for (const font of customFonts) {
        if (font.file) {
          // Load local font files
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
        } else {
          // Load Google Fonts
          try {
            // Check if font is already loaded
            if (document.fonts.check(`12px "${font.name}"`)) {
              continue;
            }

            // Load Google Fonts using the Google Fonts API
            const weights = font.availableWeights || ['normal', 'bold'];
            const googleFontsUrl = `https://fonts.googleapis.com/css2?family=${font.name.replace(' ', '+')}:wght@${weights.join(';')}&display=swap`;

            const link = document.createElement('link');
            link.href = googleFontsUrl;
            link.rel = 'stylesheet';
            document.head.appendChild(link);

            console.log(`Loaded Google Font: ${font.name}`);
          } catch (error) {
            console.warn(`Failed to load Google Font ${font.name}:`, error);
          }
        }
      }
    };

    loadCustomFonts();
  }, []);

  return null; // This component doesn't render anything
};
