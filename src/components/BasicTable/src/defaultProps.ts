import { narrow } from "@/utils";

export const defaultTableProps = narrow({
  loading: false,
  border: true,
  fit: true,
  showHeader: true,
  treeProps: () => ({ hasChildren: "hasChildren", children: "children" }),
});

export const defaultTableColumnProps = narrow({
  resizable: true,
  align: "left",
  childrenColumns: () => [],
});
