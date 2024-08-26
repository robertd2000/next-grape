import * as React from "react";
import { useEditor } from "@grapesjs/react";

import type {
  Property,
  PropertyComposite,
  PropertyRadio,
  PropertySelect,
  PropertySlider,
  PropertyStack,
} from "grapesjs";
import { cn } from "@/lib/utils";
import { IoIosArrowDown, IoIosArrowUp, IoMdClose } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ColorPicker } from "@/components/ui/color-picker";

interface StylePropertyFieldProps extends React.HTMLProps<HTMLDivElement> {
  prop: Property;
}

export function StylePropertyField({ prop, ...rest }: StylePropertyFieldProps) {
  const editor = useEditor();
  const handleChange = (value: string) => {
    prop.upValue(value);
  };

  const onChange = (ev: any) => {
    handleChange(ev?.target?.value);
  };

  const openAssets = () => {
    const { Assets } = editor;
    Assets.open({
      select: (asset, complete) => {
        console.log({ complete });
        prop.upValue(asset.getSrc(), { partial: !complete });
        complete && Assets.close();
      },
      types: ["image"],
      accept: "image/*",
    });
  };

  const type = prop.getType();
  const defValue = prop.getDefaultValue();
  const canClear = prop.canClear();
  const hasValue = prop.hasValue();
  const value = prop.getValue();
  const valueString = hasValue ? value : "";
  const valueWithDef = hasValue ? value : defValue;

  let inputToRender = (
    <Input
      placeholder={defValue}
      value={valueString}
      onChange={onChange}
      className="bg-inherit"
    />
  );

  switch (type) {
    case "radio":
      {
        const radioProp = prop as PropertyRadio;
        inputToRender = (
          <RadioGroup value={value} onChange={onChange}>
            {radioProp.getOptions().map((option) => (
              <div
                className="flex items-center space-x-2 bg-inherit"
                key={radioProp.getOptionId(option)}
              >
                <RadioGroupItem
                  value={radioProp.getOptionId(option)}
                  id="r1"
                  className="bg-inherit"
                />
                <Label htmlFor="r1">{radioProp.getOptionLabel(option)}</Label>
              </div>
              //   <FormControlLabel
              //     key={radioProp.getOptionId(option)}
              //     value={radioProp.getOptionId(option)}
              //     label={radioProp.getOptionLabel(option)}
              //     control={<Radio size="small" />}
              //   />
            ))}
          </RadioGroup>
        );
      }
      break;
    case "select":
      {
        const selectProp = prop as PropertySelect;
        inputToRender = (
          <Select
            value={value}
            onValueChange={(e) => {
              handleChange(e);
            }}
          >
            <SelectTrigger className="w-[180px] bg-inherit">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {selectProp.getOptions().map((option) => (
                  <SelectItem
                    value={selectProp.getOptionId(option)}
                    key={selectProp.getOptionId(option)}
                  >
                    {" "}
                    {selectProp.getOptionLabel(option)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        );
      }
      break;
    case "color":
      {
        inputToRender = (
          <ColorPicker
            placeholder={defValue}
            value={valueString}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        );
      }
      break;
    case "slider":
      {
        const sliderProp = prop as PropertySlider;
        inputToRender = (
          <Slider
            defaultValue={[parseFloat(value)]}
            min={sliderProp.getMin()}
            max={sliderProp.getMax()}
            step={sliderProp.getStep()}
            onChange={onChange}
          />
        );
      }
      break;
    case "file":
      {
        inputToRender = (
          <div className="flex flex-col items-center gap-3">
            {value && value !== defValue && (
              <div
                className="w-[50px] h-[50px] rounded inline-block bg-cover bg-center cursor-pointer"
                style={{ backgroundImage: `url("${value}")` }}
                onClick={() => handleChange("")}
              />
            )}
            <button type="button" onClick={openAssets}>
              Select Image
            </button>
          </div>
        );
      }
      break;
    case "composite":
      {
        const compositeProp = prop as PropertyComposite;
        inputToRender = (
          <div className={"flex flex-wrap p-2 bg-black/20"}>
            {compositeProp.getProperties().map((prop) => (
              <StylePropertyField key={prop.getId()} prop={prop} />
            ))}
          </div>
        );
      }
      break;
    case "stack":
      {
        const stackProp = prop as PropertyStack;
        const layers = stackProp.getLayers();
        const isTextShadow = stackProp.getName() === "text-shadow";
        inputToRender = (
          <div className={"flex flex-col p-2 gap-2 bg-black/20 min-h-[54px]"}>
            {layers.map((layer) => (
              <div key={layer.getId()}>
                <div className="flex gap-1 bg-slate-800 px-2 py-1 items-center">
                  <Button onClick={() => layer.move(layer.getIndex() - 1)}>
                    <IoIosArrowUp />
                  </Button>
                  <Button onClick={() => layer.move(layer.getIndex() + 1)}>
                    <IoIosArrowDown />
                  </Button>
                  <button className="flex-grow" onClick={() => layer.select()}>
                    {layer.getLabel()}
                  </button>
                  <div
                    className={
                      "bg-white min-w-[17px] min-h-[17px] text-black text-sm flex justify-center"
                    }
                    style={layer.getStylePreview({
                      number: { min: -3, max: 3 },
                      camelCase: true,
                    })}
                  >
                    {isTextShadow && "T"}
                  </div>
                  <Button onClick={() => layer.remove()}>
                    <IoMdClose />
                  </Button>
                </div>
                {layer.isSelected() && (
                  <div className="p-2 flex flex-wrap">
                    {stackProp.getProperties().map((prop) => (
                      <StylePropertyField key={prop.getId()} prop={prop} />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      }
      break;
  }

  return (
    <div
      {...rest}
      className={cn("mb-3 px-1", prop.isFull() ? "w-full" : "w-1/2")}
    >
      <div className={cn("flex mb-2 items-center", canClear && "text-sky-300")}>
        <div className="flex-grow capitalize">{prop.getLabel()}</div>
        {canClear && (
          <button onClick={() => prop.clear()}>
            <IoMdClose />
          </button>
        )}
        {type === "stack" && (
          <Button
            className="!ml-2"
            onClick={() => (prop as PropertyStack).addLayer({}, { at: 0 })}
          >
            <FaPlus />
          </Button>
        )}
      </div>
      {inputToRender}
    </div>
  );
}
