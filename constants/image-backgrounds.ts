import { gradientColors, GradientKey } from './gradient-colors';
import { SolidColorKey, solidColors } from './solid-colors';

export interface ImageCategory {
  id: string;
  name: string;
  description: string;
  previewImages: string[];
  allImages: string[];
}

export const imageCategories: ImageCategory[] = [
  {
    id: 'mesh',
    name: 'Mesh',
    description: 'Geometric mesh patterns',
    previewImages: [],
    allImages: [
      '/mesh/mesh1.webp',
      '/mesh/mesh2.webp',
      '/mesh/mesh3.webp',
      '/mesh/mesh4.webp',
      '/mesh/mesh5.webp',
      '/mesh/mesh6.webp',
      '/mesh/mesh7.webp',
      '/mesh/mesh8.webp',
    ],
  },
  {
    id: 'mac',
    name: 'Mac Wallpapers',
    description: 'Apple macOS wallpapers',
    previewImages: [],
    allImages: [
      '/mac/mac1.webp',
      '/mac/mac2.webp',
      '/mac/mac3.webp',
      '/mac/mac4.webp',
      '/mac/mac5.webp',
      '/mac/mac6.jpeg',
      '/mac/mac7.jpg',
    ],
  },
  {
    id: 'abstract',
    name: 'Abstract',
    description: 'Modern abstract designs',
    previewImages: [],
    allImages: [
      '/abstract/abstract1.avif',
      '/abstract/abstract2.avif',
      '/abstract/abstract3.avif',
      '/abstract/abstract4.avif',
    ],
  },
  {
    id: 'nature',
    name: 'Nature',
    description: 'Natural landscapes and scenes',
    previewImages: [],
    allImages: [
      '/nature/nature1.avif',
      '/nature/nature2.avif',
      '/nature/nature3.avif',
      '/nature/nature4.avif',
      '/nature/nature5.avif',
    ],
  },
  {
    id: 'radiant-gradient',
    name: 'Radiant Gradient',
    description: 'Radiant gradient backgrounds',
    previewImages: [],
    allImages: [
      '/radiant/radiant1.jpg',
      '/radiant/radiant2.jpg',
      '/radiant/radiant3.jpg',
      '/radiant/radiant4.jpg',
      '/radiant/radiant5.jpg',
      '/radiant/radiant6.jpg',
      '/radiant/radiant7.avif',
      '/radiant/radiant8.jpg',
      '/radiant/radiant9.jpg',
      '/radiant/radiant10.jpg',
    ],
  },
];

export const defaultBackgrounds = {
  gradients: Object.keys(gradientColors) as GradientKey[],
  solids: Object.keys(solidColors) as SolidColorKey[],
  images: imageCategories.flatMap((category) => category.allImages),
} as const;
