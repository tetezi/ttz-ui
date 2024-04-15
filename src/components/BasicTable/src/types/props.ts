import type { MaybeRefOrGetter, VNode } from "vue";
import type { TableMethods } from "./tableMethods";
import type {
  TableProps as ElTableProps,
  TableColumnCtx as ElTableColumnProps,
} from "element-plus";
export type TableProps<Data extends Recordable> = {
  loading?: boolean;
  columns?: TableColumnProps<Data>[];
} & Partial<
  Pick<
    ElTableProps<Data>,
    | "rowKey"
    | "height"
    | "maxHeight"
    | "stripe"
    | "border"
    | "size"
    | "fit"
    | "showHeader"
    | "defaultExpandAll"
    | "showSummary"
    | "spanMethod"
    | "sumText"
    | "summaryMethod"
    | "lazy"
    | "load"
    | "treeProps"
  >
>;
export type TableColumnProps<Data extends Recordable> = {
  childrenColumns?: TableColumnProps<Data>[];
  isHideColumn?: MaybeRefOrGetter<boolean>;
  formatter?: (
    row: any,
    cellValue: any,
    column: any,
    index: number
  ) => VNode | string;
} & Partial<
  Pick<
    ElTableColumnProps<Data>,
    | "label"
    | "columnKey"
    | "prop"
    | "width"
    | "minWidth"
    | "fixed"
    | "renderHeader"
    | "resizable"
    | "showOverflowTooltip"
    | "align"
    | "headerAlign"
  >
>;
export type TableShortEvent<Data extends Recordable> = {
  register: [tableMethods: TableMethods<Data>];
};

export type TableEventObject<Data extends Recordable> = ShortEventToOnEvent<
  TableShortEvent<Data>
>;

export type TableBind<Data extends Recordable> = TableProps<Data> &
  TableEventObject<Data>;
