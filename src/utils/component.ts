import { isEmpty } from "lodash";
import {
  defineComponent,
  h,
  toValue,
  watchEffect,
  type DefineComponent,
  type MaybeRefOrGetter,
  type VNode,
} from "vue";
export function useComponentRegister<
Bind,
  Methods extends { setProps: (props: Bind) => void }
>(
  component: DefineComponent,
  bind: MaybeRefOrGetter<Bind>,
  onRegister?: (methods: Methods) => void
) {
  const methodsProxy = new Proxy(
    {},
    {
      get(target, prop, receiver) {
        if (isEmpty(target)) {
          console.warn(`${component.__name}实例未完成。`);
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
    defineComponent(() => {
      return () => h(component, { onRegister: register });
    }),
    methodsProxy,
  ] as [DefineComponent, Methods];
}
