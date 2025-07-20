import { create } from 'zustand';
import { exportImageWithGradient } from './export-utils';

interface ImageState {
  uploadedImageUrl: string | null;
  imageName: string | null;
  setImage: (file: File) => void;
  clearImage: () => void;
  exportImage: () => Promise<void>;
}

export const useImageStore = create<ImageState>((set, get) => ({
  uploadedImageUrl: null,
  imageName: null,
  
  setImage: (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    set({
      uploadedImageUrl: imageUrl,
      imageName: file.name
    });
  },
  
  clearImage: () => {
    const { uploadedImageUrl } = get();
    if (uploadedImageUrl) {
      URL.revokeObjectURL(uploadedImageUrl);
    }
    set({
      uploadedImageUrl: null,
      imageName: null
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
  }
})); 