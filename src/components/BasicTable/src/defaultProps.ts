import { narrow } from "@/utils";

export const defaultTableProps = narrow({
  pageConfigs:()=>({}),
  immediate:true,
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
