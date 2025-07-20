'use client';

import { ImageUpload } from '@/components/image-upload';

export default function Page() {
  const handleImageUpload = (file: File) => {
    console.log('Image uploaded:', file.name);
    // You can add additional logic here like uploading to a server
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-4xl w-full">
        <ImageUpload onImageUpload={handleImageUpload} />
      </div>
    </div>
  );
}
