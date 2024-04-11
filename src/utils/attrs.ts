import { upperFirst } from "lodash";

/**获取当前组件事件，用于传递子组件做事件继承 */
export function getInheritanceEvent<T extends string>(
  emit: Function,
  keys: T[]
) {
  const result: Recordable = {};
  keys.forEach((key) => {
    result[`on${upperFirst(key)}`] = (...arg: any[]) => {
      emit(key, ...arg);
    };
  });
  return result;
}
