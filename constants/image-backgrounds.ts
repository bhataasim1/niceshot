import { gradientColors, GradientKey } from './gradient-colors';
import { SolidColorKey, solidColors } from './solid-colors';

export const defaultBackgrounds = {
  gradients: Object.keys(gradientColors) as GradientKey[],
  solids: Object.keys(solidColors) as SolidColorKey[],
  images: [
    '/demo/demo1.png',
    '/demo/demo2.png',
    '/demo/demo3.png',
    '/demo/demo4.png',
    '/demo/demo5.png',
    '/demo/demo6.png',
    '/demo/demo7.png',
    '/demo/demo8.png',
    '/demo/demo9.png',
    '/demo/demo10.jpg',
  ],
} as const;
