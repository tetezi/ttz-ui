import type { PropertyPath } from "lodash";
import type { TableBind } from "./";
import type { ComputedRef } from "vue";
import type { Recordable } from '@/global';

export type TableMethods<Data extends Recordable> = {
  setProps: (props: Partial<TableBind<Data>>) => void;
  getProps: ComputedRef<TableBind<Data>>;
  setModelValue: (val: Data[]) => void;
  getModelValue: ComputedRef<Data[]>;
  getFieldsValue: (key: PropertyPath) => any;
  setFieldsValue: (key: PropertyPath, val: any) => any;
};
