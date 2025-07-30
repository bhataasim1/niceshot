// 'use client';

// import { Input } from '@/components/ui/input';
// import { useImageStore } from '@/lib/store';
// import { useState } from 'react';

// export const ColorPicker = () => {
//   const { setBackgroundConfig, backgroundConfig } = useImageStore();
//   const [customColor, setCustomColor] = useState('#000000');

//   const handleCustomColorChange = (color: string) => {
//     setCustomColor(color);
//     setBackgroundConfig({
//       type: 'solid',
//       value: color,
//       opacity: backgroundConfig.opacity || 1,
//     });
//   };

//   return (
//     <div className="space-y-2">
//       <p className="text-sm font-medium text-muted-foreground">Custom Color</p>
//       <div className="flex gap-2">
//         <Input
//           type="color"
//           value={customColor}
//           onChange={(e) => handleCustomColorChange(e.target.value)}
//           className="w-12 h-10 p-1"
//         />
//         <Input
//           placeholder="#000000"
//           value={customColor}
//           onChange={(e) => handleCustomColorChange(e.target.value)}
//           className="flex-1"
//         />
//       </div>
//     </div>
//   );
// };
