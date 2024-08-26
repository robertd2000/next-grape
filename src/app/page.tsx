"use client";
import { Inspector, SidebarLeft, Spinner } from "@/components";
import { gjsOptions } from "@/constants";
import GjsEditor, {
  AssetsProvider,
  Canvas,
  ModalProvider,
} from "@grapesjs/react";
import type { Editor } from "grapesjs";
import { useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const onEditor = (editor: Editor) => {
    (window as any).editor = editor;

    editor.BlockManager.add("test-component", {
      label: "Test Component",
      content: `<div data-gjs-type="test-component">
      Test text
      </div>`,
    });

    setIsLoading(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative">
      <GjsEditor
        className="gjs-custom-editor text-white bg-dark"
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
        {isLoading ? <Spinner /> : null}
        <div className={`flex h-full border-t`}>
          <SidebarLeft />

          <div className="gjs-column-m flex flex-col flex-grow">
            <Canvas />
          </div>

          <Inspector />
        </div>
      </GjsEditor>
    </main>
  );
}
