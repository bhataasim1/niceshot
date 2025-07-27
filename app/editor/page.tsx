'use client';

import { ImageRenderCard } from '@/components/image-render-card';
import { ImageUpload } from '@/components/image-upload';
import { useImageStore } from '@/lib/store';

export default function Page() {
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
}
