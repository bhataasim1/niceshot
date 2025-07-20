import { BorderRadiusPicker } from './border-radius-picker';

export const MockupTab = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="font-medium text-muted-foreground">Border Radius</p>
        <BorderRadiusPicker />
      </div>
    </div>
  );
};
