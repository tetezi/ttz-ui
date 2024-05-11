import { narrow } from "@/utils";
import { defaultSelectProps } from "@/components/Select";
import { omit } from "lodash";
export default narrow({
  ...omit(defaultSelectProps, ["options", "loading"]),
  immediate: false,
  resultField: "",
  params: ()=>({}),
  queryField: "query",
});
