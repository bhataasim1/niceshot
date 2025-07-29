'use client';

import { useState } from 'react';
import { BackgroundComponent } from './background-component';
import { ImageRenderComponent } from './image-render-component';
import { TextOverlay } from './text-overlay';

interface EnhancedEditorProps {
  imageUrl: string;
}

export const EnhancedEditor = ({ imageUrl }: EnhancedEditorProps) => {
  const [overlayText, setOverlayText] = useState('');
  const [textPosition, setTextPosition] = useState({ x: 50, y: 50 });

  return (
    <BackgroundComponent imageUrl={imageUrl}>
      {/* Text Overlay Feature */}
      {overlayText && (
        <div
          className="absolute text-white text-2xl font-bold drop-shadow-lg pointer-events-none"
          style={{
            left: `${textPosition.x}%`,
            top: `${textPosition.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {overlayText}
        </div>
      )}

      {/* Text Overlay Controls */}
      <TextOverlay
        onTextChange={setOverlayText}
        onPositionChange={setTextPosition}
      />
    </BackgroundComponent>
  );
};
