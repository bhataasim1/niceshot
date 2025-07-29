import { aspectRatios } from '@/constants/aspect-ratios';
import { gradientColors } from '@/constants/gradient-colors';
import { useImageStore } from '@/lib/store';
import { ContentContainer } from './content-container';

interface BackgroundComponentProps {
  imageUrl?: string;
  children?: React.ReactNode;
}

export const BackgroundComponent = ({
  imageUrl,
  children,
}: BackgroundComponentProps) => {
  const { selectedGradient, selectedAspectRatio } = useImageStore();

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
            <ContentContainer imageUrl={imageUrl}>{children}</ContentContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
