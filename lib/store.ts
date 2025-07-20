import { create } from 'zustand';
import { exportImageWithGradient } from './export-utils';
import { GradientKey } from '@/constants/gradient-colors';

interface ImageState {
  uploadedImageUrl: string | null;
  imageName: string | null;
  selectedGradient: GradientKey;
  setImage: (file: File) => void;
  clearImage: () => void;
  setGradient: (gradient: GradientKey) => void;
  exportImage: () => Promise<void>;
}

export const useImageStore = create<ImageState>((set, get) => ({
  uploadedImageUrl: null,
  imageName: null,
  selectedGradient: 'primary_gradient',

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
