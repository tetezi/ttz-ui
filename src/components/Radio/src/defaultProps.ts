import { narrow } from "@/utils";

export const defaultRadioProps = narrow({
  options: () => [],
  labelField: "label",
  valueField: "value",
  isObject: false,
  isButton:false,
  size: "default",
});
