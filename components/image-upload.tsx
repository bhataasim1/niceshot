'use client';

import { cn } from '@/lib/utils';
import { Image as ImageIcon, Upload, Camera } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useImageStore } from '@/lib/store';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface ImageUploadProps {
  onImageUpload?: (file: File) => void;
  className?: string;
}

export function ImageUpload({ onImageUpload, className }: ImageUploadProps) {
  const { uploadedImageUrl, imageName, setImage, clearImage } = useImageStore();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file && file.type.startsWith('image/')) {
        setImage(file);
        onImageUpload?.(file);
      }
    },
    [onImageUpload, setImage]
  );

  const handleScreenshot = async () => {
    if (!url) return;
    setLoading(true);
    try {
      const res = await fetch(
        `/api/screenshot?url=${encodeURIComponent(url)}`,
        {
          method: 'POST',
        }
      );
      if (!res.ok) throw new Error('Failed to fetch screenshot');
      const blob = await res.blob();
      const file = new File([blob], 'screenshot.png', { type: 'image/png' });
      setImage(file);
      onImageUpload?.(file);
      setUrl(''); // Clear URL after successful screenshot
    } catch (err) {
      console.error('Error taking screenshot:', err);
      alert('Error taking screenshot. Please try again.');
    }
    setLoading(false);
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: {
        'image/*': ['.jpeg', '.jpg', '.png'],
      },
      multiple: false,
      maxFiles: 1,
    });

  return (
    <div>
      {/* Show uploaded image preview if available */}
      {uploadedImageUrl && (
        <div className="mb-4 flex flex-col items-center">
          <img
            src={uploadedImageUrl}
            alt={imageName || 'Uploaded image'}
            className="max-w-full max-h-64 rounded-lg border"
          />
          <Button
            onClick={clearImage}
            className="mt-2 px-3 py-1 bg-red-500 text-white rounded"
          >
            Remove Image
          </Button>
        </div>
      )}

      {/* Screenshot from URL section */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-muted-foreground mb-2">
          Screenshot from URL
        </label>
        <div className="flex gap-2">
          <Input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter website URL (e.g., https://example.com)"
            className="flex-1 border rounded-md px-3 py-2 text-sm"
            disabled={loading}
          />
          <Button
            onClick={handleScreenshot}
            disabled={loading || !url}
            variant={uploadedImageUrl ? 'default' : 'secondary'}
            className="px-4 py-2 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            <Camera className="size-4" />
            {loading ? 'Loading...' : 'Screenshot'}
          </Button>
        </div>
      </div>

      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200 border-secondary-foreground hover:border-blue-400',
          className
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center space-y-4">
          <div className="p-3 rounded-full border-2">
            {isDragActive ? (
              <Upload className="size-8 text-blue-600" />
            ) : (
              <ImageIcon className="size-8" />
            )}
          </div>
          <div className="space-y-2">
            <p className="text-lg font-medium">
              {isDragActive
                ? isDragReject
                  ? 'Invalid file type'
                  : 'Drop your image here'
                : 'Drag & drop your image here'}
            </p>
            <p className="text-sm">
              {isDragActive
                ? isDragReject
                  ? 'Please upload an image file'
                  : 'Release to upload'
                : 'or click to browse'}
            </p>
            <p className="text-xs">Supports: JPG, PNG (max 10MB)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
