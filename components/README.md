# Editor Components Structure

The editor has been refactored to separate concerns and make it easier to add new features.

## Component Hierarchy

```
EditorPage
└── EditorMain
    └── ImageRenderCard
        └── BackgroundComponent
            └── ContentContainer
                ├── ImageRenderComponent (for images)
                └── [Other content components] (text, overlays, etc.)
```

## Core Components

### BackgroundComponent

- Handles gradient backgrounds, solid colors, and images
- Provides the main container with styling
- Accepts `imageUrl` and `children` props
- Supports opacity control for all background types

### ImageRenderComponent

- Handles image display and border radius
- Pure image rendering component

### ContentContainer

- Manages different types of content within the background
- Can handle images, text overlays, filters, etc.
- Makes it easy to add new content types

## Background System

### Supported Background Types

1. **Gradients**: 13 pre-defined gradient options
2. **Solid Colors**: 20 pre-defined colors + custom color picker
3. **Images**: Pre-loaded demo images + custom image upload + URL input

### Background Components

- **BackgroundPicker**: Main component with tabs for each background type
- **ColorPicker**: Custom color selection with hex input
- **BackgroundImageUpload**: File upload for custom background images

### Features

- **Opacity Control**: Slider to adjust background opacity (0-100%)
- **Custom Colors**: Color picker with hex input for any color
- **Image Upload**: Drag & drop or file picker for custom images
- **URL Input**: Direct URL input for external images
- **Pre-defined Options**: Curated selection of gradients, colors, and images

## Adding New Features

### 1. Text Overlays

```tsx
<BackgroundComponent imageUrl={imageUrl}>
  <div className="absolute text-white">Your text overlay</div>
</BackgroundComponent>
```

### 2. Filters/Effects

```tsx
<BackgroundComponent imageUrl={imageUrl}>
  <div className="filter grayscale">
    <ImageRenderComponent imageUrl={imageUrl} />
  </div>
</BackgroundComponent>
```

### 3. Multiple Content Layers

```tsx
<BackgroundComponent imageUrl={imageUrl}>
  <ImageRenderComponent imageUrl={imageUrl} />
  <TextOverlay text="Hello World" />
  <FilterEffect type="blur" />
</BackgroundComponent>
```

## Benefits of This Structure

1. **Separation of Concerns**: Background styling is separate from content rendering
2. **Reusability**: Components can be reused in different contexts
3. **Extensibility**: Easy to add new features without modifying existing code
4. **Maintainability**: Each component has a single responsibility
5. **Testability**: Components can be tested in isolation
6. **Flexibility**: Multiple background types with unified interface

## State Management

The `useImageStore` hook manages:

- Image upload and display
- Background configuration (type, value, opacity)
- Border radius
- Aspect ratio

### Background Configuration

```typescript
interface BackgroundConfig {
  type: 'gradient' | 'solid' | 'image';
  value: string; // gradient key, color key, or image URL
  opacity: number; // 0-1
}
```

New features can add their own state or extend the existing store as needed.
