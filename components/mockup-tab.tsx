import { BorderRadiusPicker } from './border-radius-picker';
import { AspectRatioDropdown } from './aspect-ratio-dropdown';

export const MockupTab = () => {
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
    </div>
  );
};
