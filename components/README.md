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
3. **Images**: Categorized image collections with accordion interface

### Image Categories

The image background system is organized into categories:

- **Mesh**: Geometric mesh patterns (8 images)
- **Mac Wallpapers**: Apple macOS wallpapers (6 images)
- **Lo-Fi**: Chill lo-fi aesthetic backgrounds (5 images)
- **Abstract**: Modern abstract designs (6 images)
- **Nature**: Natural landscapes and scenes (4 images)
- **Minimal**: Clean minimal designs (4 images)

### Background Components

- **BackgroundPicker**: Main component with Select dropdown for background type
- **ImageCategoryAccordion**: Collapsible category component with preview images
- **ColorPicker**: Custom color selection with hex input
- **BackgroundImageUpload**: File upload for custom background images

### Features

- **Categorized Images**: Organized image collections with preview thumbnails
- **Accordion Interface**: Click to expand categories and see all images
- **Visual Selection**: Selected categories and images are highlighted
- **Opacity Control**: Slider to adjust background opacity (0-100%)
- **Custom Colors**: Color picker with hex input for any color
- **Image Upload**: Drag & drop or file picker for custom images
- **URL Input**: Direct URL input for external images
- **Pre-defined Options**: Curated selection of gradients, colors, and images

### Image Category Structure

```typescript
interface ImageCategory {
  id: string;
  name: string;
  description: string;
  previewImages: string[]; // 2 preview images shown in header
  allImages: string[]; // All images in the category
}
```

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

### 4. Adding New Image Categories

```typescript
// In constants/image-backgrounds.ts
{
  id: 'new-category',
  name: 'New Category',
  description: 'Description of the category',
  previewImages: ['/path/to/preview1.jpg', '/path/to/preview2.jpg'],
  allImages: [
    '/path/to/image1.jpg',
    '/path/to/image2.jpg',
    // ... more images
  ],
}
```

## Benefits of This Structure

1. **Separation of Concerns**: Background styling is separate from content rendering
2. **Reusability**: Components can be reused in different contexts
3. **Extensibility**: Easy to add new features without modifying existing code
4. **Maintainability**: Each component has a single responsibility
5. **Testability**: Components can be tested in isolation
6. **Flexibility**: Multiple background types with unified interface
7. **Organization**: Images are categorized for better discoverability
8. **User Experience**: Accordion interface makes browsing efficient

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
