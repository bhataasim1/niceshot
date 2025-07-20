import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FrameTab } from './frame-tab';

export const StyleTabs = () => {
  return (
    <Tabs defaultValue="mockup" className="w-full p-4">
      <TabsList className="w-full h-10 border">
        <TabsTrigger value="mockup">Mockup</TabsTrigger>
        <TabsTrigger value="frame">Frame</TabsTrigger>
      </TabsList>
      <TabsContent value="mockup">
        <div>Mockups soon</div>
      </TabsContent>
      <TabsContent value="frame">
        <FrameTab />
      </TabsContent>
    </Tabs>
  );
};
