import { create } from 'zustand';
import { exportImageWithGradient } from './export-utils';
import { GradientKey } from '@/constants/gradient-colors';
import { AspectRatioKey } from '@/constants/aspect-ratios';
import { BackgroundConfig, BackgroundType } from '@/constants/background-types';

interface TextOverlay {
  id: string;
  text: string;
  position: { x: number; y: number };
  fontSize: number;
  fontWeight: string;
  fontFamily: string;
  color: string;
  opacity: number;
  isVisible: boolean;
}

interface ImageState {
  uploadedImageUrl: string | null;
  imageName: string | null;
  selectedGradient: GradientKey;
  borderRadius: number;
  selectedAspectRatio: AspectRatioKey;
  backgroundConfig: BackgroundConfig;
  textOverlays: TextOverlay[];
  imageOpacity: number;
  setImage: (file: File) => void;
  clearImage: () => void;
  setGradient: (gradient: GradientKey) => void;
  setBorderRadius: (radius: number) => void;
  setAspectRatio: (aspectRatio: AspectRatioKey) => void;
  setBackgroundConfig: (config: BackgroundConfig) => void;
  setBackgroundType: (type: BackgroundType) => void;
  setBackgroundValue: (value: string) => void;
  setBackgroundOpacity: (opacity: number) => void;
  addTextOverlay: (overlay: Omit<TextOverlay, 'id'>) => void;
  updateTextOverlay: (id: string, updates: Partial<TextOverlay>) => void;
  removeTextOverlay: (id: string) => void;
  clearTextOverlays: () => void;
  setImageOpacity: (opacity: number) => void;
  exportImage: () => Promise<void>;
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
  textOverlays: [],
  imageOpacity: 1,

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

  addTextOverlay: (overlay) => {
    const id = `text-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    set((state) => ({
      textOverlays: [...state.textOverlays, { ...overlay, id }],
    }));
  },

  updateTextOverlay: (id, updates) => {
    set((state) => ({
      textOverlays: state.textOverlays.map((overlay) =>
        overlay.id === id ? { ...overlay, ...updates } : overlay
      ),
    }));
  },

  removeTextOverlay: (id) => {
    set((state) => ({
      textOverlays: state.textOverlays.filter((overlay) => overlay.id !== id),
    }));
  },

  clearTextOverlays: () => {
    set({ textOverlays: [] });
  },

  setImageOpacity: (opacity: number) => {
    set({ imageOpacity: opacity });
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
