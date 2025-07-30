'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface TextOverlayProps {
  onTextChange: (text: string) => void;
  onPositionChange: (position: { x: number; y: number }) => void;
}

export const TextOverlay = ({
  onTextChange,
  onPositionChange,
}: TextOverlayProps) => {
  const [text, setText] = useState('');

  const handleTextChange = (value: string) => {
    setText(value);
    onTextChange(value);
  };

  return (
    <div className="absolute top-4 left-4 z-10 bg-background/80 backdrop-blur-sm rounded-lg p-4 border">
      <div className="flex flex-col gap-2">
        <Input
          placeholder="Enter text..."
          value={text}
          onChange={(e) => handleTextChange(e.target.value)}
          className="w-48"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPositionChange({ x: 50, y: 50 })}
        >
          Center Text
        </Button>
      </div>
    </div>
  );
};
