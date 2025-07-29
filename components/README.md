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

- Handles gradient backgrounds and aspect ratio
- Provides the main container with styling
- Accepts `imageUrl` and `children` props

### ImageRenderComponent

- Handles image display and border radius
- Pure image rendering component

### ContentContainer

- Manages different types of content within the background
- Can handle images, text overlays, filters, etc.
- Makes it easy to add new content types

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

## State Management

The `useImageStore` hook manages:

- Image upload and display
- Gradient selection
- Border radius
- Aspect ratio

New features can add their own state or extend the existing store as needed.
