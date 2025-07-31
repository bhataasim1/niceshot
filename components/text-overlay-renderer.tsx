'use client';

import { useImageStore } from '@/lib/store';
import { getFontCSS } from '@/constants/fonts';

interface TextShadow {
  enabled: boolean;
  color: string;
  blur: number;
  offsetX: number;
  offsetY: number;
}

export const TextOverlayRenderer = () => {
  const { textOverlays } = useImageStore();

  const getTextShadowCSS = (shadow: TextShadow) => {
    if (!shadow.enabled) return 'none';
    return `${shadow.offsetX}px ${shadow.offsetY}px ${shadow.blur}px ${shadow.color}`;
  };

  const getOrientationStyle = (orientation: string) => {
    if (orientation === 'vertical') {
      return {
        writingMode: 'vertical-rl' as const,
        textOrientation: 'mixed' as const,
      };
    }
    return {};
  };

  return (
    <>
      {textOverlays
        .filter((overlay) => overlay.isVisible)
        .map((overlay) => (
          <div
            key={overlay.id}
            className="absolute pointer-events-none select-none"
            style={{
              left: `${overlay.position.x}%`,
              top: `${overlay.position.y}%`,
              transform: 'translate(-50%, -50%)',
              fontSize: `${overlay.fontSize}px`,
              fontWeight: overlay.fontWeight,
              fontFamily: getFontCSS(overlay.fontFamily),
              color: overlay.color,
              opacity: overlay.opacity,
              textShadow: getTextShadowCSS(overlay.textShadow),
              whiteSpace: 'nowrap',
              zIndex: 10,
              ...getOrientationStyle(overlay.orientation),
            }}
          >
            {overlay.text}
          </div>
        ))}
    </>
  );
};
