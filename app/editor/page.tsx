'use client';

import { ImageRenderCard } from '@/components/image-render-card';
import { ImageUpload } from '@/components/image-upload';
import { useState } from 'react';

export default function Page() {
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setUploadedImageUrl(imageUrl);
  };

  if (!uploadedImageUrl) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">NiceShot Editor</h1>
            <p className="text-gray-600">Upload and edit your beautiful images</p>
          </div>
          <ImageUpload onImageUpload={handleImageUpload} />
        </div>
      </div>
    );
  }

  return (
    <ImageRenderCard imageUrl={uploadedImageUrl} />
  );
}
