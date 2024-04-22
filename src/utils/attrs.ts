import type { Recordable, ShortEventToOnEvent } from "@/global";
import {
  cloneDeep,
  get,
  isObject,
  omit,
  set,
  upperFirst,
  type PropertyPath,
} from "lodash";
import {
  ref,
  computed,
  unref,
  getCurrentInstance, 
  toRaw,
  type Ref,
  type ModelRef, 
  type ComputedRef,
} from "vue";

/**获取当前组件事件，用于传递子组件做事件继承 */
export function getInheritanceEvent<T extends string>(
  emit: Function | unknown,
  keys: T[]
) {
  const result: Recordable = {};
  keys.forEach((key) => {
    result[`on${upperFirst(key)}`] = (...arg: any[]) => {
      (emit as Function)(key, ...arg);
    };
  });
  return result;
}

/**
 * 本地模式props，与组件props合并
 */
export function useLocalProps<
  Props extends Recordable,
  ShortEvent extends Recordable
>(props: Props, emit: Function) {
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

export type SetModelValue<T = any> = (val: T) => void;
export type GetModelValue<T = any> = ComputedRef<T>;
export type SetFieldsValue = (key: PropertyPath, val: any) => void;
export type GetFieldsValue<T = any> = (key: PropertyPath) => T;

/**
 * 本地模式modelValue，如有使用v-model则使用原modelValue，否则生成一个本地modelValue
 * PS:vue的defineModel语法糖内部也会实现本地模式，但返回的是简单类型的customRefRef，无法监听深层修改，故作修改
 */
export function useLocalModel<T>(modelValue: ModelRef<T>, defaultValue?: T) {
  const rawProps = getCurrentInstance()!.vnode!.props; 
  const localModelValue: ModelRef<T> | Ref<T> =
    rawProps && "modelValue" in rawProps
      ? modelValue
      : (ref(cloneDeep(defaultValue ?? toRaw(unref(modelValue)))) as Ref<T>);
  const setFieldsValue: SetFieldsValue = (key, val) => {
    const model = unref(localModelValue);
    if (isObject(model)) {
      set(model, key, val);
    }
  };
  const getFieldsValue: GetFieldsValue = (key) => {
    return get(unref(localModelValue), key);
  };
  const setModelValue: SetModelValue<T> = (val) => {
    localModelValue.value = val;
  };
  const getModelValue: GetModelValue = computed(() => unref(localModelValue));
  return {
    localModelValue,
    setModelValue,
    getModelValue,
    getFieldsValue,
    setFieldsValue,
  };
}
