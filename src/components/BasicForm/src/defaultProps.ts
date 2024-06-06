import { narrow } from "@/utils";

export default narrow({
  labelPosition: "left",
  labelWidth: 100,
  defaultValue: () => ({}),
  formSchemas: () => [],
  isDesign: false,
  isDesignFormSchema: false,
  // rowProps: () => ({
  //   gutter: 10,
  // }),
});
