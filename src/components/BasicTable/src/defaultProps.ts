import { narrow } from "@/utils";

export const defaultTableProps = narrow({
  pageConfigs:false,
  immediate:false,
  loading: false,
  border: true,
  fit: true,
  showHeader: true,
  treeProps: () => ({ hasChildren: "hasChildren", children: "children" }),
  columns: () => [],
  listField: "rows",
  totalField: "total",
});

export const defaultTableColumnProps = narrow({
  resizable: true,
  align: "left",
  childrenColumns: () => [],
});
