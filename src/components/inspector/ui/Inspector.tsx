import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export function Inspector() {
  return (
    <Tabs defaultValue="style" className="w-[400px] p-2">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="style">Style</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="style">style</TabsContent>
      <TabsContent value="components">settings</TabsContent>
    </Tabs>
  );
}
