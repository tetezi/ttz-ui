import type { PropertyPath } from "lodash";
import type { TableBind, TableEventObject, TableProps } from "./";
import type { ComputedRef, MaybeRefOrGetter } from "vue";
import type { GetProps, Recordable } from "@/global";
import type { defaultTableProps } from "../defaultProps";

// export type GetProps<Data extends Recordable> = ComputedRef<
//   PropsWithDefaults<TableProps<Data>, typeof defaultTableProps> &
//     TableEventObject<Data>
// >;
export type GetTableProps<Data extends Recordable> = GetProps<
  TableProps<Data>,
  typeof defaultTableProps,
  TableEventObject<Data>
>;

export type TableMethods<Data extends Recordable> = {
  getPageData: ComputedRef<Data[]>;
  setProps: (props: Partial<TableBind<Data>>) => void;
  getProps: GetTableProps<Data>;
  setModelValue: (val: Data[]) => void;
  getModelValue: ComputedRef<Data[]>;
  getFieldsValue: (key: PropertyPath) => any;
  setFieldsValue: (key: PropertyPath, val: any) => any;
  fetch: (params?: MaybeRefOrGetter<Recordable>) => Promise<any>;
  reload: (params?: MaybeRefOrGetter<Recordable>) => Promise<any>;
};
