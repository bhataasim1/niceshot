import { gradientColors, GradientKey } from './gradient-colors';
import { SolidColorKey, solidColors } from './solid-colors';

export const defaultBackgrounds = {
  gradients: Object.keys(gradientColors) as GradientKey[],
  solids: Object.keys(solidColors) as SolidColorKey[],
  images: [
    '/mesh/mesh1.webp',
    '/mesh/mesh2.webp',
    '/mesh/mesh3.webp',
    '/mesh/mesh4.webp',
    '/mesh/mesh5.webp',
    '/mesh/mesh6.webp',
    '/mesh/mesh7.webp',
    '/mesh/mesh8.webp',
  ],
} as const;
