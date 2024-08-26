import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BlocksProvider, LayersProvider, PagesProvider } from "@grapesjs/react";
import { MdOutlineLayers, MdOutlineAddToPhotos } from "react-icons/md";
import { RiPagesLine } from "react-icons/ri";
import { Blocks, Layers, PageManager } from "./tabs";

export function SidebarLeft() {
  return (
    <Tabs defaultValue="layers" className="w-[300px] p-2">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="layers">
          <MdOutlineLayers />
        </TabsTrigger>
        <TabsTrigger value="components">
          <MdOutlineAddToPhotos />
        </TabsTrigger>
        <TabsTrigger value="pages">
          <RiPagesLine />
        </TabsTrigger>
      </TabsList>
      <TabsContent value="layers">
        <LayersProvider>{(props) => <Layers {...props} />}</LayersProvider>
      </TabsContent>
      <TabsContent value="components">
        <BlocksProvider>{(props) => <Blocks {...props} />}</BlocksProvider>
      </TabsContent>
      <TabsContent value="pages">
        <PagesProvider>{(props) => <PageManager {...props} />}</PagesProvider>
      </TabsContent>
    </Tabs>
  );
}
