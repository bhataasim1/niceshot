'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useImageStore } from '@/lib/store';
import { Plus, Trash2, Eye, EyeOff } from 'lucide-react';

export const TextOverlayControls = () => {
  const {
    textOverlays,
    addTextOverlay,
    updateTextOverlay,
    removeTextOverlay,
    clearTextOverlays,
  } = useImageStore();

  const [newText, setNewText] = useState('');
  const [selectedOverlayId, setSelectedOverlayId] = useState<string | null>(
    null
  );

  const selectedOverlay = textOverlays.find(
    (overlay) => overlay.id === selectedOverlayId
  );

  const handleAddText = () => {
    if (newText.trim()) {
      addTextOverlay({
        text: newText.trim(),
        position: { x: 50, y: 50 },
        fontSize: 24,
        fontWeight: 'normal',
        color: '#ffffff',
        opacity: 1,
        isVisible: true,
      });
      setNewText('');
    }
  };

  const handleUpdatePosition = (axis: 'x' | 'y', value: number[]) => {
    if (selectedOverlay) {
      updateTextOverlay(selectedOverlay.id, {
        position: {
          ...selectedOverlay.position,
          [axis]: value[0],
        },
      });
    }
  };

  const handleUpdateFontSize = (value: number[]) => {
    if (selectedOverlay) {
      updateTextOverlay(selectedOverlay.id, {
        fontSize: value[0],
      });
    }
  };

  const handleUpdateOpacity = (value: number[]) => {
    if (selectedOverlay) {
      updateTextOverlay(selectedOverlay.id, {
        opacity: value[0],
      });
    }
  };

  const handleUpdateText = (text: string) => {
    if (selectedOverlay) {
      updateTextOverlay(selectedOverlay.id, { text });
    }
  };

  const handleUpdateColor = (color: string) => {
    if (selectedOverlay) {
      updateTextOverlay(selectedOverlay.id, { color });
    }
  };

  const handleUpdateFontWeight = (weight: string) => {
    if (selectedOverlay) {
      updateTextOverlay(selectedOverlay.id, { fontWeight: weight });
    }
  };

  const handleToggleVisibility = (id: string) => {
    const overlay = textOverlays.find((o) => o.id === id);
    if (overlay) {
      updateTextOverlay(id, { isVisible: !overlay.isVisible });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-sm">Text Overlays</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={clearTextOverlays}
          disabled={textOverlays.length === 0}
        >
          Clear All
        </Button>
      </div>

      <div className="space-y-2">
        <div className="flex gap-2">
          <Input
            placeholder="Enter text..."
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddText()}
            className="flex-1"
          />
          <Button size="sm" onClick={handleAddText} disabled={!newText.trim()}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {textOverlays.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">
            Manage Overlays
          </p>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {textOverlays.map((overlay) => (
              <div
                key={overlay.id}
                className={`flex items-center gap-2 p-2 rounded border cursor-pointer transition-colors ${
                  selectedOverlayId === overlay.id
                    ? 'bg-accent border-accent-foreground'
                    : 'bg-background hover:bg-accent/50'
                }`}
                onClick={() => setSelectedOverlayId(overlay.id)}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleVisibility(overlay.id);
                  }}
                  className="h-6 w-6 p-0"
                >
                  {overlay.isVisible ? (
                    <Eye className="h-3 w-3" />
                  ) : (
                    <EyeOff className="h-3 w-3" />
                  )}
                </Button>
                <span className="flex-1 text-xs truncate">{overlay.text}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTextOverlay(overlay.id);
                    if (selectedOverlayId === overlay.id) {
                      setSelectedOverlayId(null);
                    }
                  }}
                  className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedOverlay && (
        <div className="space-y-4 border-t pt-4">
          <div className="space-y-4">
            <p className="text-xs font-medium text-muted-foreground">
              {`Edit: "${selectedOverlay.text}"`}
            </p>

            <Input
              placeholder="Edit text..."
              value={selectedOverlay.text}
              onChange={(e) => handleUpdateText(e.target.value)}
            />

            <div className="flex gap-2">
              <Input
                type="color"
                value={selectedOverlay.color}
                onChange={(e) => handleUpdateColor(e.target.value)}
                className="w-12 h-8 p-1"
              />
              <Input
                placeholder="#ffffff"
                value={selectedOverlay.color}
                onChange={(e) => handleUpdateColor(e.target.value)}
                className="flex-1"
              />
            </div>

            <Select
              value={selectedOverlay.fontWeight}
              onValueChange={handleUpdateFontWeight}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Font weight" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="100">Thin</SelectItem>
                <SelectItem value="300">Light</SelectItem>
                <SelectItem value="500">Medium</SelectItem>
                <SelectItem value="700">Bold</SelectItem>
                <SelectItem value="800">Extra Bold</SelectItem>
              </SelectContent>
            </Select>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">Font Size</span>
                <span className="text-xs text-muted-foreground">
                  {selectedOverlay.fontSize}px
                </span>
              </div>
              <Slider
                value={[selectedOverlay.fontSize]}
                onValueChange={handleUpdateFontSize}
                max={72}
                min={12}
                step={1}
                className="w-full cursor-grab"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">Opacity</span>
                <span className="text-xs text-muted-foreground">
                  {Math.round(selectedOverlay.opacity * 100)}%
                </span>
              </div>
              <Slider
                value={[selectedOverlay.opacity]}
                onValueChange={handleUpdateOpacity}
                max={1}
                min={0}
                step={0.01}
                className="w-full cursor-grab"
              />
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">
                Position
              </p>

              {/* X position */}
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">
                    X Position
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {Math.round(selectedOverlay.position.x)}%
                  </span>
                </div>
                <Slider
                  value={[selectedOverlay.position.x]}
                  onValueChange={(value) => handleUpdatePosition('x', value)}
                  max={100}
                  min={0}
                  step={1}
                  className="w-full cursor-grab"
                />
              </div>

              {/* Y position */}
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">
                    Y Position
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {Math.round(selectedOverlay.position.y)}%
                  </span>
                </div>
                <Slider
                  value={[selectedOverlay.position.y]}
                  onValueChange={(value) => handleUpdatePosition('y', value)}
                  max={100}
                  min={0}
                  step={1}
                  className="w-full cursor-grab"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
