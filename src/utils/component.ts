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
  Props,
  Methods extends { setProps: (props: Props) => void }
>(
  component: DefineComponent,
  props: MaybeRefOrGetter<Props>,
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
    if (props) {
      watchEffect(() => {
        methodsProxy.setProps(toValue(props));
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
