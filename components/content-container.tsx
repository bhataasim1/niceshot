import { ImageRenderComponent } from './image-render-component';

interface ContentContainerProps {
  imageUrl?: string;
  children?: React.ReactNode;
}

export const ContentContainer = ({
  imageUrl,
  children,
}: ContentContainerProps) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      {imageUrl && <ImageRenderComponent imageUrl={imageUrl} />}
      {children}
    </div>
  );
};
