'use client';

import { useImageStore } from '@/lib/store';
import { getFontCSS } from '@/constants/fonts';

export const TextOverlayRenderer = () => {
  const { textOverlays } = useImageStore();

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
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              whiteSpace: 'nowrap',
              zIndex: 10,
            }}
          >
            {overlay.text}
          </div>
        ))}
    </>
  );
};
