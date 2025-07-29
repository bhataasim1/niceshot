'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BackgroundType } from '@/constants/background-types';
import { gradientColors } from '@/constants/gradient-colors';
import { useImageStore } from '@/lib/store';
import { useState } from 'react';
import { BackgroundImageUpload } from './background-image-upload';
import { solidColors } from '@/constants/solid-colors';
import { defaultBackgrounds } from '@/constants/image-backgrounds';

export const BackgroundPicker = () => {
  const { backgroundConfig, setBackgroundConfig, setBackgroundOpacity } =
    useImageStore();
  const [customImageUrl, setCustomImageUrl] = useState('');

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

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <p className="font-medium text-muted-foreground">Background</p>
        <Tabs defaultValue="gradients" className="w-full">
          <TabsList className="w-full h-10 border">
            <TabsTrigger value="gradients">Gradients</TabsTrigger>
            <TabsTrigger value="solids">Solid Colors</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
          </TabsList>

          <TabsContent value="gradients" className="space-y-2">
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
                  onClick={() =>
                    handleBackgroundChange('gradient', gradientKey)
                  }
                >
                  <div
                    className="w-full h-full rounded"
                    style={{ background: gradientColors[gradientKey] }}
                  />
                </Button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="solids" className="space-y-4">
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
          </TabsContent>

          <TabsContent value="images" className="space-y-4">
            <BackgroundImageUpload />

            <div className="grid grid-cols-2 gap-2">
              {defaultBackgrounds.images.map((imageUrl, index) => (
                <Button
                  key={index}
                  variant={
                    backgroundConfig.type === 'image' &&
                    backgroundConfig.value === imageUrl
                      ? 'default'
                      : 'outline'
                  }
                  size="sm"
                  className="h-16 p-0 overflow-hidden"
                  onClick={() => handleBackgroundChange('image', imageUrl)}
                >
                  <img
                    src={imageUrl}
                    alt={`Background ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </Button>
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
          </TabsContent>
        </Tabs>
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
