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
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">NiceShot Editor</h1>
            <p>Upload and edit your beautiful images</p>
          </div>
          <ImageUpload onImageUpload={handleImageUpload} />
        </div>
      </div>
    );
  }

  return <ImageRenderCard imageUrl={uploadedImageUrl} />;
}
