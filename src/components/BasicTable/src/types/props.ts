import type { MaybeRef, MaybeRefOrGetter, VNode, VNodeChild } from "vue";
import type { TableMethods } from "./tableMethods";
import type {
  TableProps as ElTableProps,
  TableColumnCtx as ElTableColumnProps,
} from "element-plus";
import type { MaybePromise, Recordable, ShortEventToOnEvent } from "@/global"; 
export type TableProps<Data extends Recordable> = {
  immediate?: boolean;
  beforeFetch?: (params) => MaybePromise<Recordable>;
  title?: MaybeRefOrGetter<VNodeChild>;
  api?: (params, pageParams) => MaybePromise<Recordable>;
  params?: MaybeRef<Recordable>;
  listField?: string;
  totalField?: string;
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
};

export type TableEventObject<Data extends Recordable> = ShortEventToOnEvent<
  TableShortEvent<Data>
>;

export type TableBind<Data extends Recordable> = TableProps<Data> &
  TableEventObject<Data>;
