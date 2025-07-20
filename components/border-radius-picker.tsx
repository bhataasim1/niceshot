'use client';

import { useImageStore } from '@/lib/store';
import { Button } from './ui/button';
import { Slider } from './ui/slider';

const PRESET_RADIUS_OPTIONS = [
  { label: 'Sharp', value: 0 },
  { label: 'Curved', value: 24 },
  { label: 'Round', value: 40 },
];

export const BorderRadiusPicker = () => {
  const { borderRadius, setBorderRadius } = useImageStore();

  const handleValueChange = (newValue: number[]) => {
    setBorderRadius(newValue[0]);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="grid grid-cols-3 gap-2">
          {PRESET_RADIUS_OPTIONS.map((option) => (
            <Button
              key={option.value}
              onClick={() => setBorderRadius(option.value)}
              variant={borderRadius === option.value ? 'default' : 'outline'}
              size="sm"
              className="h-8 text-xs"
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="relative">
          <Slider
            value={[borderRadius]}
            onValueChange={handleValueChange}
            max={50}
            min={0}
            step={1}
            className="w-full cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0px</span>
            <span>25px</span>
            <span>50px</span>
          </div>
        </div>
      </div>
    </div>
  );
};
