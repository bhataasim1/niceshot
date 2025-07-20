import { create } from 'zustand';
import { exportImageWithGradient } from './export-utils';
import { GradientKey } from '@/constants/gradient-colors';
import { AspectRatioKey } from '@/constants/aspect-ratios';

interface ImageState {
  uploadedImageUrl: string | null;
  imageName: string | null;
  selectedGradient: GradientKey;
  borderRadius: number;
  selectedAspectRatio: AspectRatioKey;
  setImage: (file: File) => void;
  clearImage: () => void;
  setGradient: (gradient: GradientKey) => void;
  setBorderRadius: (radius: number) => void;
  setAspectRatio: (aspectRatio: AspectRatioKey) => void;
  exportImage: () => Promise<void>;
}

export const useImageStore = create<ImageState>((set, get) => ({
  uploadedImageUrl: null,
  imageName: null,
  selectedGradient: 'primary_gradient',
  borderRadius: 24,
  selectedAspectRatio: '16_9',

  setImage: (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    set({
      uploadedImageUrl: imageUrl,
      imageName: file.name,
    });
  },

  clearImage: () => {
    const { uploadedImageUrl } = get();
    if (uploadedImageUrl) {
      URL.revokeObjectURL(uploadedImageUrl);
    }
    set({
      uploadedImageUrl: null,
      imageName: null,
    });
  },

  setGradient: (gradient: GradientKey) => {
    set({ selectedGradient: gradient });
  },

  setBorderRadius: (radius: number) => {
    set({ borderRadius: radius });
  },

  setAspectRatio: (aspectRatio: AspectRatioKey) => {
    set({ selectedAspectRatio: aspectRatio });
  },

  exportImage: async () => {
    try {
      // Target the image render card element
      await exportImageWithGradient('image-render-card');
    } catch (error) {
      console.error('Export failed:', error);
      throw error;
    }
  },
}));
