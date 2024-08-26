import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LayersProvider } from "@grapesjs/react";
import { MdOutlineLayers, MdOutlineAddToPhotos } from "react-icons/md";
import { RiPagesLine } from "react-icons/ri";
import { Layers } from "./tabs";

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
      <TabsContent value="components">Components</TabsContent>
      <TabsContent value="pages">Pages</TabsContent>
    </Tabs>
  );
}
