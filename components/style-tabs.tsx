import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FrameTab } from './frame-tab';
import { MockupTab } from './mockup-tab';
import { TextOverlayControls } from './text-overlay-controls';

export const StyleTabs = () => {
  return (
    <Tabs defaultValue="mockup" className="w-full p-4 space-y-6">
      <TabsList className="w-full h-10 border">
        <TabsTrigger value="mockup">Mockup</TabsTrigger>
        <TabsTrigger value="frame">Frame</TabsTrigger>
        <TabsTrigger value="text">Text</TabsTrigger>
      </TabsList>
      <TabsContent value="mockup">
        <MockupTab />
      </TabsContent>
      <TabsContent value="frame">
        <FrameTab />
      </TabsContent>
      <TabsContent value="text">
        <TextOverlayControls />
      </TabsContent>
    </Tabs>
  );
};
