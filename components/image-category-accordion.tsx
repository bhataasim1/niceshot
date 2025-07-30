'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { ImageCategory } from '@/constants/image-backgrounds';
import { useImageStore } from '@/lib/store';

interface ImageCategoryAccordionProps {
  category: ImageCategory;
}

export const ImageCategoryAccordion = ({
  category,
}: ImageCategoryAccordionProps) => {
  const { backgroundConfig, setBackgroundConfig } = useImageStore();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleImageSelect = (imageUrl: string) => {
    setBackgroundConfig({
      type: 'image',
      value: imageUrl,
      opacity: backgroundConfig.opacity || 1,
    });
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const isSelected =
    backgroundConfig.type === 'image' &&
    category.allImages.includes(backgroundConfig.value);

  return (
    <div
      className={`border rounded-lg overflow-hidden transition-all duration-200 ${
        isSelected
          ? 'ring-2 ring-primary/20 border-primary/30'
          : 'border-border'
      }`}
    >
      <div className="p-4 bg-background/50 hover:bg-background/70 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="font-medium text-sm flex items-center gap-2">
              {category.name}
              {isSelected && (
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  Selected
                </span>
              )}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {category.description}
            </p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={toggleExpanded}
            className="h-8 w-8 p-0 hover:bg-accent"
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t bg-muted/20">
          <div className="p-4">
            <div className="grid grid-cols-3 gap-2">
              {category.allImages.map((imageUrl, index) => (
                <Button
                  key={index}
                  variant={
                    backgroundConfig.type === 'image' &&
                    backgroundConfig.value === imageUrl
                      ? 'default'
                      : 'outline'
                  }
                  size="sm"
                  className="h-16 p-0 overflow-hidden hover:scale-105 transition-transform"
                  onClick={() => handleImageSelect(imageUrl)}
                >
                  <img
                    src={imageUrl}
                    alt={`${category.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
