import { gradientColors, GradientKey } from './gradient-colors';
import { SolidColorKey, solidColors } from './solid-colors';

export type BackgroundType = 'gradient' | 'solid' | 'image';

export interface BackgroundConfig {
  type: BackgroundType;
  value: GradientKey | SolidColorKey | string;
  opacity?: number;
}

export const getBackgroundStyle = (config: BackgroundConfig): string => {
  const { type, value, opacity = 1 } = config;

  switch (type) {
    case 'gradient':
      return gradientColors[value as GradientKey];
    case 'solid':
      const color = solidColors[value as SolidColorKey];
      return color;
    case 'image':
      return `url(${value})`;
    default:
      return gradientColors.primary_gradient;
  }
};

export const getBackgroundCSS = (
  config: BackgroundConfig
): React.CSSProperties => {
  const { type, value, opacity = 1 } = config;

  switch (type) {
    case 'gradient':
      return {
        background: gradientColors[value as GradientKey],
        opacity,
      };
    case 'solid':
      const color = solidColors[value as SolidColorKey];
      return {
        backgroundColor: color,
        opacity,
      };
    case 'image':
      return {
        backgroundImage: `url(${value})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity,
      };
    default:
      return {
        background: gradientColors.primary_gradient,
        opacity,
      };
  }
};
