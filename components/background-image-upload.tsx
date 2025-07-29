'use client';

import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useImageStore } from '@/lib/store';
import { Upload } from 'lucide-react';

export const BackgroundImageUpload = () => {
  const { setBackgroundConfig, backgroundConfig } = useImageStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBackgroundConfig({
        type: 'image',
        value: imageUrl,
        opacity: backgroundConfig.opacity || 1,
      });
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-muted-foreground">Upload Image</p>
      <Button
        variant="outline"
        size="sm"
        onClick={handleUploadClick}
        className="w-full h-10"
      >
        <Upload className="size-4 mr-2" />
        Upload Background Image
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
};
