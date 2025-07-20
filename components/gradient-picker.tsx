'use client';

import { gradientColors, GradientKey } from '@/constants/gradient-colors';
import { useImageStore } from '@/lib/store';
import { Button } from './ui/button';

export const GradientPicker = () => {
  const { selectedGradient, setGradient } = useImageStore();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-2 justify-center items-center">
        {Object.entries(gradientColors).map(([key, gradient]) => (
          <Button
            key={key}
            onClick={() => setGradient(key as GradientKey)}
            className={`size-12 border-2 transition-all duration-200 hover:scale-105 ${
              selectedGradient === key
                ? 'border-blue-500 ring-2 ring-blue-200'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            style={{ background: gradient }}
            title={key.charAt(0).toUpperCase() + key.slice(1)}
            size="icon"
          />
        ))}
      </div>
    </div>
  );
};
