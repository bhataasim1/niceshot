import { aspectRatios } from '@/constants/aspect-ratios';
import { useImageStore } from '@/lib/store';
import { Button } from './ui/button';

export const AspectRatioPicker = () => {
  const { selectedAspectRatio, setAspectRatio } = useImageStore();

  return (
    <div className="grid grid-cols-2 gap-2">
      {aspectRatios.map((aspectRatio) => (
        <Button
          key={aspectRatio.id}
          onClick={() => setAspectRatio(aspectRatio.id)}
          variant={
            selectedAspectRatio === aspectRatio.id ? 'secondary' : 'outline'
          }
          className="w-full"
        >
          <div className="flex items-center gap-2">
            <div
              className="bg-muted rounded border"
              style={{
                width: '24px',
                height: `${24 * aspectRatio.ratio}px`,
                maxHeight: '24px',
                minHeight: '8px',
              }}
            />
            <span className="text-sm font-medium">{aspectRatio.name}</span>
          </div>
        </Button>
      ))}
    </div>
  );
};
