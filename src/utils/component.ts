import type { Recordable } from "@/global";
import { isEmpty } from "lodash";
import {
  defineComponent,
  h,
  toValue,
  watchEffect,
  type Component,
  type DefineSetupFnComponent,
  type EmitsOptions,
  type MaybeRefOrGetter,
  type SlotsType,
} from "vue";
export function useComponentRegister<
  Bind extends Recordable,
  Methods extends { setProps: (props: Bind) => void }
>(
  component: Component,
  bind: MaybeRefOrGetter<Bind>,
  onRegister?: (methods: Methods) => void
) {
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
      watchEffect(() => {
        methodsProxy.setProps(toValue(bind));
      });
    }
    onRegister?.(methodsProxy);
  };
  return [
    defineComponent((_props, { slots }) => {
      return () => h(component, { onRegister: register }, slots);
    }),
    methodsProxy,
  ] as [DefineSetupFnComponent<Bind>, Methods];
}
