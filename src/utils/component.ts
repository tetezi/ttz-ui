import type { Recordable } from "@/global";
import { isEmpty } from "lodash";
import {
  defineComponent,
  h,
  toValue,
  watchEffect,
  type Component,
  type ComputedOptions,
  type DefineSetupFnComponent,
  type ObjectEmitsOptions,
  type MaybeRefOrGetter,
  type MethodOptions,
  type SlotsType,
  type DefineComponent,
  type ConcreteComponent,
  watch,
  ref,
  type Ref,
} from "vue";
export function useComponentRegister<
  Bind extends Recordable,
  Methods extends { setProps: (props: Bind) => void }
>(
  component: Component,
  bind: MaybeRefOrGetter<Bind>,
  onRegister?: (methods: Methods) => void
) {
  const isOk = ref(false);
  const methodsProxy = new Proxy(
    {},
    {
      get(target, prop, receiver) {
        if (isEmpty(target)) {
          console.warn(
            `${(<any>component).__name}实例未完成。无法获取${String(prop)}`
          );
          throw new Error("实例未完成。");
        } else {
          return Reflect.get(target, prop, receiver);
        }
      },
    }
  ) as Methods;
  const register = (methods) => {
    Object.entries(methods).forEach(([key, val]) => {
      methodsProxy[key] = val;
    });
    if (bind) {
      watch(
        () => toValue(bind),
        () => {
          methodsProxy.setProps(toValue(bind));
        },
        {
          immediate: true,
          deep: true,
        }
      );
    }
    onRegister?.(methodsProxy);
    isOk.value = true;
  };

  return [
    defineComponent((_props, { slots }) => {
      return () => h(component, { onRegister: register }, slots);
    }),
    methodsProxy,
    isOk,
  ] as [DefineSetupFnComponent<Bind>, Methods, Ref<boolean>];
}
