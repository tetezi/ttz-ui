import { omit, upperFirst } from "lodash";
import { ref, computed, unref } from "vue";

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

export function useLocalProps<
  Props extends Recordable,
  ShortEvent extends Recordable
>(props: Partial<Props>, emit: Function) {
  type EventObject = ShortEventToOnEvent<ShortEvent>;
  type Bind = Props & EventObject;
  const propsRef = ref<Partial<Bind>>({});
  /**
   * 实际配置
   */
  const getProps = computed(() => {
    return {
      ...(omit(props, ["modelValue", "modelModifiers"]) as Partial<Props>),
      ...(unref(propsRef) as Partial<Bind>),
    } as Bind;
  });
  /**
   * 设置配置，叠加旧配置
   */
  const setProps = function (props: Partial<Bind>) {
    (propsRef.value as Partial<Bind>) = {
      ...(unref(propsRef) as Partial<Bind>),
      ...props,
    };
  };
  /**
   * 提交事件
   */
  const emitEvent = function (key: keyof ShortEvent, ...args: any[]) {
    /**
     * 提交vue原生事件
     */
    emit(key, ...args);
    const eventHandler = unref(getProps)[
      `on${upperFirst(key as string)}` as keyof EventObject
    ] as Function;
    /**
     * 回调组件内部事件配置，以on开头的同名方法，如onChange等
     */
    eventHandler?.(...args);
  };
  return { getProps, setProps, emitEvent };
}
