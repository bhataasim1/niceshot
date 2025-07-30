'use client';

import { useImageStore } from '@/lib/store';
import { ImageUpload } from './image-upload';
import { ImageRenderCard } from './image-render-card';

export const EditorMain = () => {
  const { uploadedImageUrl, setImage } = useImageStore();

  const handleImageUpload = (file: File) => {
    setImage(file);
  };

  if (!uploadedImageUrl) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-4xl w-full">
          <ImageUpload onImageUpload={handleImageUpload} />
        </div>
      </div>
    );
  }

  return <ImageRenderCard imageUrl={uploadedImageUrl} />;
};
