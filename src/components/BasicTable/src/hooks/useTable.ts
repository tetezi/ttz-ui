import { isEmpty } from "lodash";
import { h, type VNode } from "vue";
import BasicTable from "../BasicTable.vue";
import type { TableMethods, TableProps } from "../types";

export function useTable<Data extends Recordable>(
  props: TableProps<Data>,
  onRegister?: (tableMethods: TableMethods<Data>) => void
): [VNode, TableMethods<Data>] {
  let tableMethods: TableMethods<Data> | {} = {};
  const tableMethodsProxy: TableMethods<Data> = new Proxy(
    tableMethods as TableMethods<Data>,
    {
      get(target, prop, receiver) {
        if (isEmpty(target)) {
          console.warn("表格实例未完成。");
          throw new Error("表格实例未完成。");
        } else {
          return Reflect.get(target as TableMethods<Data>, prop, receiver);
        }
      },
    }
  );
  const register = (methods) => {
    tableMethods = methods;
    if (props) {
      tableMethodsProxy.setProps(props);
    }
    onRegister?.(tableMethodsProxy);
  };
  return [h(BasicTable, { onRegister: register }), tableMethodsProxy];
}
