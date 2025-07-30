'use client';

import { BorderRadiusPicker } from './border-radius-picker';
import { AspectRatioDropdown } from './aspect-ratio-dropdown';
import { Slider } from './ui/slider';
import { useImageStore } from '@/lib/store';

export const MockupTab = () => {
  const { imageOpacity, setImageOpacity } = useImageStore();

  const handleOpacityChange = (opacity: number[]) => {
    setImageOpacity(opacity[0]);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="font-medium text-muted-foreground">Aspect Ratio</p>
        <AspectRatioDropdown />
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-medium text-muted-foreground">Border Radius</p>
        <BorderRadiusPicker />
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <p className="text-sm font-medium text-muted-foreground">Opacity</p>
          <span className="text-sm text-muted-foreground">
            {Math.round(imageOpacity * 100)}%
          </span>
        </div>
        <Slider
          value={[imageOpacity]}
          onValueChange={handleOpacityChange}
          max={1}
          min={0}
          step={0.01}
          className="w-full cursor-pointer"
        />
      </div>
    </div>
  );
};
