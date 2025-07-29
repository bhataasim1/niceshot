'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BackgroundType } from '@/constants/background-types';
import { gradientColors } from '@/constants/gradient-colors';
import { useImageStore } from '@/lib/store';
import { useState } from 'react';
import { BackgroundImageUpload } from './background-image-upload';
import { solidColors } from '@/constants/solid-colors';
import {
  defaultBackgrounds,
  imageCategories,
} from '@/constants/image-backgrounds';
import { ImageCategoryAccordion } from './image-category-accordion';

export const BackgroundPicker = () => {
  const { backgroundConfig, setBackgroundConfig, setBackgroundOpacity } =
    useImageStore();
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [selectedTab, setSelectedTab] = useState<BackgroundType>('gradient');

  const handleBackgroundChange = (type: BackgroundType, value: string) => {
    setBackgroundConfig({
      type,
      value,
      opacity: backgroundConfig.opacity || 1,
    });
  };

  const handleOpacityChange = (opacity: number[]) => {
    setBackgroundOpacity(opacity[0]);
  };

  const handleCustomImageUpload = () => {
    if (customImageUrl.trim()) {
      handleBackgroundChange('image', customImageUrl.trim());
    }
  };

  const handleTabChange = (value: string) => {
    setSelectedTab(value as BackgroundType);
  };

  const renderContent = () => {
    switch (selectedTab) {
      case 'gradient':
        return (
          <div className="grid grid-cols-3 gap-2">
            {defaultBackgrounds.gradients.map((gradientKey) => (
              <Button
                key={gradientKey}
                variant={
                  backgroundConfig.type === 'gradient' &&
                  backgroundConfig.value === gradientKey
                    ? 'default'
                    : 'outline'
                }
                size="sm"
                className="h-12 p-0"
                onClick={() => handleBackgroundChange('gradient', gradientKey)}
              >
                <div
                  className="w-full h-full rounded"
                  style={{ background: gradientColors[gradientKey] }}
                />
              </Button>
            ))}
          </div>
        );

      case 'solid':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-2">
              {defaultBackgrounds.solids.map((colorKey) => (
                <Button
                  key={colorKey}
                  variant={
                    backgroundConfig.type === 'solid' &&
                    backgroundConfig.value === colorKey
                      ? 'default'
                      : 'outline'
                  }
                  size="sm"
                  className="h-10 p-0"
                  onClick={() => handleBackgroundChange('solid', colorKey)}
                >
                  <div
                    className="w-full h-full rounded"
                    style={{ backgroundColor: solidColors[colorKey] }}
                  />
                </Button>
              ))}
            </div>
          </div>
        );

      case 'image':
        return (
          <div className="space-y-4">
            <BackgroundImageUpload />

            <div className="space-y-3">
              {imageCategories.map((category) => (
                <ImageCategoryAccordion key={category.id} category={category} />
              ))}
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Custom Image URL
              </p>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter image URL..."
                  value={customImageUrl}
                  onChange={(e) => setCustomImageUrl(e.target.value)}
                  className="flex-1"
                />
                <Button size="sm" onClick={handleCustomImageUpload}>
                  Add
                </Button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <p className="font-medium text-muted-foreground">Background</p>

        <Select value={selectedTab} onValueChange={handleTabChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select background type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gradient">Gradients</SelectItem>
            <SelectItem value="solid">Solid Colors</SelectItem>
            <SelectItem value="image">Images</SelectItem>
          </SelectContent>
        </Select>

        <div className="mt-4">{renderContent()}</div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <p className="text-sm font-medium text-muted-foreground">Opacity</p>
          <span className="text-sm text-muted-foreground">
            {Math.round((backgroundConfig.opacity || 1) * 100)}%
          </span>
        </div>
        <Slider
          value={[backgroundConfig.opacity || 1]}
          onValueChange={handleOpacityChange}
          max={1}
          min={0}
          step={0.01}
          className="w-full"
        />
      </div>
    </div>
  );
};
