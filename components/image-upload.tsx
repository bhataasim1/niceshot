'use client';

import { cn } from '@/lib/utils';
import { Image as ImageIcon, Upload } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageUploadProps {
  onImageUpload?: (file: File) => void;
  className?: string;
}

export function ImageUpload({ onImageUpload, className }: ImageUploadProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file && file.type.startsWith('image/')) {
        const imageUrl = URL.createObjectURL(file);
        setUploadedImage(imageUrl);
        onImageUpload?.(file);
      }
    },
    [onImageUpload]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: {
        'image/*': ['.jpeg', '.jpg', '.png'],
      },
      multiple: false,
      maxFiles: 1,
    });

  if (uploadedImage) {
    return (
      <div className={cn('relative group', className)}>
        <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-white">
          <img
            src={uploadedImage}
            alt="Uploaded image"
            className="w-full h-auto max-h-96 object-contain"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={cn(
        'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200 hover:border-blue-400 hover:bg-blue-50/50',
        isDragActive && !isDragReject && 'border-blue-400 bg-blue-50/50',
        isDragReject && 'border-red-400 bg-red-50/50',
        'border-gray-300 bg-gray-50/50',
        className
      )}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center space-y-4">
        <div className="p-3 rounded-full bg-blue-100">
          {isDragActive ? (
            <Upload className="w-8 h-8 text-blue-600" />
          ) : (
            <ImageIcon className="w-8 h-8 text-gray-400" />
          )}
        </div>
        <div className="space-y-2">
          <p className="text-lg font-medium text-gray-900">
            {isDragActive
              ? isDragReject
                ? 'Invalid file type'
                : 'Drop your image here'
              : 'Drag & drop your image here'}
          </p>
          <p className="text-sm text-gray-500">
            {isDragActive
              ? isDragReject
                ? 'Please upload an image file'
                : 'Release to upload'
              : 'or click to browse'}
          </p>
          <p className="text-xs text-gray-400">Supports: JPG, PNG (max 10MB)</p>
        </div>
      </div>
    </div>
  );
}
