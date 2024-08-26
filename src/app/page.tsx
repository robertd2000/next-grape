"use client";
import { SidebarLeft } from "@/components";
import { gjsOptions } from "@/constants";
import GjsEditor, {
  AssetsProvider,
  Canvas,
  ModalProvider,
} from "@grapesjs/react";
import type { Editor } from "grapesjs";

export default function Home() {
  const onEditor = (editor: Editor) => {
    console.log("Editor loaded");
    (window as any).editor = editor;
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <GjsEditor
        className="gjs-custom-editor text-white bg-slate-900"
        grapesjs="https://unpkg.com/grapesjs"
        grapesjsCss="https://unpkg.com/grapesjs/dist/css/grapes.min.css"
        options={gjsOptions}
        plugins={[
          {
            id: "gjs-blocks-basic",
            src: "https://unpkg.com/grapesjs-blocks-basic",
          },
        ]}
        onEditor={onEditor}
      >
        <div className={`flex h-full border-t`}>
          <SidebarLeft />

          <div className="gjs-column-m flex flex-col flex-grow">
            <Canvas />
          </div>
        </div>
      </GjsEditor>
    </main>
  );
}
