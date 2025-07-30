import { create } from 'zustand';
import { exportImageWithGradient } from './export-utils';
import { GradientKey } from '@/constants/gradient-colors';
import { AspectRatioKey } from '@/constants/aspect-ratios';
import { BackgroundConfig, BackgroundType } from '@/constants/background-types';

interface ImageState {
  uploadedImageUrl: string | null;
  imageName: string | null;
  selectedGradient: GradientKey;
  borderRadius: number;
  selectedAspectRatio: AspectRatioKey;
  backgroundConfig: BackgroundConfig;
  setImage: (file: File) => void;
  clearImage: () => void;
  setGradient: (gradient: GradientKey) => void;
  setBorderRadius: (radius: number) => void;
  setAspectRatio: (aspectRatio: AspectRatioKey) => void;
  setBackgroundConfig: (config: BackgroundConfig) => void;
  setBackgroundType: (type: BackgroundType) => void;
  setBackgroundValue: (value: string) => void;
  setBackgroundOpacity: (opacity: number) => void;
  exportImage: () => Promise<void>;
  imageOpacity: number;
  setImageOpacity: (opacity: number) => void;
}

export const useImageStore = create<ImageState>((set, get) => ({
  uploadedImageUrl: null,
  imageName: null,
  selectedGradient: 'primary_gradient',
  borderRadius: 24,
  selectedAspectRatio: '16_9',
  backgroundConfig: {
    type: 'gradient',
    value: 'primary_gradient',
    opacity: 1,
  },

  imageOpacity: 1,
  setImageOpacity: (opacity: number) => {
    set({ imageOpacity: opacity });
  },

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

  setBackgroundConfig: (config: BackgroundConfig) => {
    set({ backgroundConfig: config });
  },

  setBackgroundType: (type: BackgroundType) => {
    const { backgroundConfig } = get();
    set({
      backgroundConfig: {
        ...backgroundConfig,
        type,
      },
    });
  },

  setBackgroundValue: (value: string) => {
    const { backgroundConfig } = get();
    set({
      backgroundConfig: {
        ...backgroundConfig,
        value,
      },
    });
  },

  setBackgroundOpacity: (opacity: number) => {
    const { backgroundConfig } = get();
    set({
      backgroundConfig: {
        ...backgroundConfig,
        opacity,
      },
    });
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
