import { type DefineComponent, type MaybeRefOrGetter, type VNode } from "vue";
import BasicTable from "../BasicTable.vue";
import type { TableMethods, TableBind } from "../types";
import { useComponentRegister } from "@/utils";
export function useTable<Data extends Recordable>(
  props: MaybeRefOrGetter<TableBind<Data>>,
  onRegister?: (tableMethods: TableMethods<Data>) => void
): [DefineComponent, TableMethods<Data>] {
  return useComponentRegister(
    BasicTable as unknown as DefineComponent,
    props,
    onRegister
  );
}
