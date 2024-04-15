import type { PropertyPath } from "lodash";
import type { TableBind } from "./";
import type { ComputedRef } from "vue";

export type TableMethods<Data extends Recordable> = {
  setProps: (props: Partial<TableBind<Data>>) => void;
  getProps: ComputedRef<TableBind<Data>>;
  setValue: (val: Data[]) => void;
  getValue: ComputedRef<Data[]>;
  getFieldsValue: (key: PropertyPath) => any;
  setFieldsValue: (key: PropertyPath, val: any) => any;
};
