import { StylesResultProps } from "@grapesjs/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { StylePropertyField } from "@/components/style-property-field";
export function StyleManager({
  sectors,
}: Omit<StylesResultProps, "Container">) {
  return (
    <div>
      {sectors.map((sector) => (
        <Accordion type="multiple" className="w-full" key={sector.id}>
          <AccordionItem value="item-1">
            <AccordionTrigger>{sector.getName()}</AccordionTrigger>
            <AccordionContent>
              {sector.getProperties().map((prop) => (
                <StylePropertyField key={prop.getId()} prop={prop} />
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
}
