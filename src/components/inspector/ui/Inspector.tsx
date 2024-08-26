import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { StylesProvider } from "@grapesjs/react";
import { StyleManager } from "./tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

export function Inspector() {
  return (
    <ScrollArea className="h-[99vh] rounded-md ">
      <Tabs defaultValue="style" className="w-[400px] p-2">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="style">Style</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="style">
          <>
            {/* <SelectorsProvider>
              {(props) => <CustomSelectorManager {...props} />}
            </SelectorsProvider> */}
            <StylesProvider>
              {(props) => <StyleManager {...props} />}
            </StylesProvider>
          </>
        </TabsContent>
        <TabsContent value="components">settings</TabsContent>
      </Tabs>
    </ScrollArea>
  );
}
