import { ref, computed, unref } from "vue";
import type {
  FormEventObject,
  FormProps,
  FormShortEvent,
  FormBind,
} from "../../types";
import { omit, upperFirst } from "lodash";
import type { GetProps, SetProps, EmitEvent } from "../../types/useHooks";

export function useProps(props: Partial<FormProps>, emit: Function) {
  const propsRef = ref<Partial<FormBind>>({});
  /**
   * 表单实际配置
   */
  const getProps: GetProps = computed<FormBind>(() => {
    return {
      ...omit(props, ["modelValue",'modelModifiers']),
      ...(unref(propsRef) as Partial<FormBind>),
    };
  });
  /**
   * 设置表单配置，叠加旧配置
   */
  const setProps: SetProps = function (props: Partial<FormBind>) {
    (propsRef.value as Partial<FormBind>) = {
      ...(unref(propsRef) as Partial<FormBind>),
      ...props,
    };
  };
  /**
   * 提交表单事件
   */
  const emitEvent: EmitEvent = function (
    key: keyof FormShortEvent,
    ...args: any[]
  ) {
    /**
     * 提交vue原生事件
     */
    emit(key, ...args);
    const eventHandler = unref(getProps)[
      `on${upperFirst(key)}` as keyof FormEventObject
    ] as Function;
    /**
     * 回调组件内部事件配置，以on开头的同名方法，如onChange等
     */
    eventHandler?.(...args);
  };
  return { getProps, setProps, emitEvent };
}
