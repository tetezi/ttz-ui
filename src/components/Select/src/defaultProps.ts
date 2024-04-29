import { narrow } from "@/utils";

export default narrow({
  options: () => [],
  labelField: "label",
  valueField: "value",
  loading: false,
  isObject: false,
  filterable: true,
  remote: false,
  size: "default",
});
