import type { MaybeRef, MaybeRefOrGetter, VNode, VNodeChild } from "vue";
import type { TableMethods } from "./tableMethods";
import type {
  TableProps as ElTableProps,
  TableColumnCtx as ElTableColumnProps,
} from "element-plus";
import type { MaybePromise, Recordable, ShortEventToOnEvent } from "@/global";
import type { PropertyPath } from "lodash";
export type TableProps<Data extends Recordable> = {
  disableSelect?: (row: Data) => boolean;
  immediate?: boolean;
  beforeFetch?: (params) => MaybePromise<Recordable>;
  title?: MaybeRefOrGetter<VNodeChild>;
  api?: (params, pageParams) => MaybePromise<Recordable>;
  params?: MaybeRef<Recordable>;
  listField?: PropertyPath;
  totalField?: PropertyPath;
  pageConfigs?:
    | false
    | {
        pageSizeField?: string;
        currentPageField?: string;
        pageLayout?: string;
        pageSize?: number;
      };
  loading?: boolean;
  columns?: MaybeRefOrGetter<TableColumn<Data>[]>;
  actionColumn?: Partial<TableColumn<Data>> | TableColumn<Data>["formatter"];
  headerActionRender?: MaybeRefOrGetter<VNodeChild>;
  selectType?: MaybeRefOrGetter<"Select" | "Check">;
  rowKey?: PropertyPath;
} & Partial<
  Pick<
    ElTableProps<Data>,
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
    | "rowClassName"
  >
>;

export type TableColumn<Data extends Recordable> = {
  childrenColumns?: TableColumn<Data>[];
  isHideColumn?: MaybeRefOrGetter<boolean>;
  formatter?: (
    row: any,
    cellValue: any,
    index: number,
    column: any
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
  rowClick: [row: Data, column: any, event: Event];
  selectRow: [row: Data, rows: Data[]];
};

export type TableEventObject<Data extends Recordable> = ShortEventToOnEvent<
  TableShortEvent<Data>
>;

export type TableBind<Data extends Recordable> = TableProps<Data> &
  TableEventObject<Data>;
