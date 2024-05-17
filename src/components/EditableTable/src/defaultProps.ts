import { defaultTableProps } from "@/components/BasicTable";
import { narrow } from "@/utils";

export const editableTableDefaultProps = {
  ...defaultTableProps,
  addBtnValue: () => ({}),
  addBtnText: "添加记录",
};
