import { BackgroundComponent } from './background-component';

interface ImageRenderCardProps {
  imageUrl: string;
}

export const ImageRenderCard = ({ imageUrl }: ImageRenderCardProps) => {
  return <BackgroundComponent imageUrl={imageUrl} />;
};
