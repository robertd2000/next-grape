import * as React from "react";
import { PagesResultProps } from "@grapesjs/react";
import { FaRegTrashCan } from "react-icons/fa6";
import { cn } from "@/lib/utils";

export function PageManager({
  pages,
  selected,
  add,
  select,
  remove,
}: PagesResultProps) {
  const addNewPage = () => {
    const nextIndex = pages.length + 1;
    add({
      name: `New page ${nextIndex}`,
      component: `<h1>Page content ${nextIndex}</h1>`,
    });
  };

  return (
    <div className="gjs-custom-page-manager">
      <div className="p-2">
        <button type="button" onClick={addNewPage}>
          Add new page
        </button>
      </div>
      {pages.map((page, index) => (
        <div
          key={page.getId()}
          className={cn(
            "flex items-center py-2 px-4 border-b",
            index === 0 && "border-t"
          )}
        >
          <button
            type="button"
            className="flex-grow text-left"
            onClick={() => select(page)}
          >
            {page.getName() || "Untitled page"}
          </button>
          {selected !== page && (
            <button type="button" onClick={() => remove(page)}>
              <FaRegTrashCan />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
