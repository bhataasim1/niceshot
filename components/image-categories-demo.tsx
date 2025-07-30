'use client';

import { ImageCategoryAccordion } from './image-category-accordion';
import { imageCategories } from '@/constants/image-backgrounds';

export const ImageCategoriesDemo = () => {
  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <h2 className="text-lg font-semibold">Categorized Image Backgrounds</h2>
        <p className="text-sm text-muted-foreground">
          Click on any category to expand and see all available images
        </p>
      </div>

      <div className="space-y-3">
        {imageCategories.map((category) => (
          <ImageCategoryAccordion key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};
