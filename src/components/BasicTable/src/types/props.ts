import type { MaybeRefOrGetter, VNode } from "vue";
import type { TableMethods } from "./tableMethods";
import type {
  TableProps as ElTableProps,
  TableColumnCtx as ElTableColumnProps,
} from "element-plus";
export type TableProps<Data extends Recordable> = {
  loading?: boolean;
  columns?: MaybeRefOrGetter<TableColumn<Data>[]>;
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

export type TableColumn<Data extends Recordable> = {
  childrenColumns?: TableColumn<Data>[];
  isHideColumn?: MaybeRefOrGetter<boolean>;
  formatter?: (
    row: any,
    cellValue: any,
    index: number,
    column: any,
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

export type TableColumnProps<Data extends Recordable> = TableColumn<Data> & {};
export type TableShortEvent<Data extends Recordable> = {
  register: [tableMethods: TableMethods<Data>];
};

export type TableEventObject<Data extends Recordable> = ShortEventToOnEvent<
  TableShortEvent<Data>
>;

export type TableBind<Data extends Recordable> = TableProps<Data> &
  TableEventObject<Data>;
