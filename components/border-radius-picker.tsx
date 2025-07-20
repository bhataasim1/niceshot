'use client';

import { useImageStore } from '@/lib/store';
import { Button } from './ui/button';

const PRESET_RADIUS_OPTIONS = [
  { label: 'Sharp', value: 0 },
  { label: 'Curved', value: 24 },
  { label: 'Round', value: 32 },
];

export const BorderRadiusPicker = () => {
  const { borderRadius, setBorderRadius } = useImageStore();

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setBorderRadius(value);
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
          <input
            type="range"
            min="0"
            max="50"
            value={borderRadius}
            onChange={handleSliderChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(borderRadius / 50) * 100}%, #e5e7eb ${(borderRadius / 50) * 100}%, #e5e7eb 100%)`,
            }}
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
