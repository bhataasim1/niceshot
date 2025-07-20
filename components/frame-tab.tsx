import { GradientPicker } from './gradient-picker';

export const FrameTab = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="font-medium text-muted-foreground">Gradients</p>
        <GradientPicker />
      </div>
    </div>
  );
};
