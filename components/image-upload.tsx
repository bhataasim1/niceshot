'use client';

import { cn } from '@/lib/utils';
import { Image as ImageIcon, Upload } from 'lucide-react';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageUploadProps {
  onImageUpload?: (file: File) => void;
  className?: string;
}

export function ImageUpload({ onImageUpload, className }: ImageUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file && file.type.startsWith('image/')) {
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

  return (
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
  );
}
