import { aspectRatios } from '@/constants/aspect-ratios';
import { gradientColors } from '@/constants/gradient-colors';
import { useImageStore } from '@/lib/store';
import Image from 'next/image';

interface ImageRenderCardProps {
  imageUrl: string;
}

export const ImageRenderCard = ({ imageUrl }: ImageRenderCardProps) => {
  const { selectedGradient, borderRadius, selectedAspectRatio } =
    useImageStore();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-7xl flex items-center justify-center">
        <div
          id="image-render-card"
          className="rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center p-8"
          style={{
            background: gradientColors[selectedGradient],
            aspectRatio:
              aspectRatios.find((ar) => ar.id === selectedAspectRatio)?.ratio ||
              1,
            maxHeight: '80vh',
          }}
        >
          <div className="p-6 w-full h-full flex items-center justify-center">
            <img
              src={imageUrl}
              alt="Uploaded image"
              className="max-w-full max-h-full object-contain"
              style={{ borderRadius: `${borderRadius}px` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
