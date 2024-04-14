import type { FormProps, FormMethods } from "@/components";
import { BasicForm } from "@/components";
import { isEmpty } from "lodash";
import { h, type VNode } from "vue";

export function useForm(
  props: FormProps,
  onRegister?: (formMethods: FormMethods) => void
): [VNode, FormMethods] {
  let formMethods: FormMethods | {} = {};
  const formMethodsProxy: FormMethods = new Proxy(formMethods as FormMethods, {
    get(target, prop, receiver) {
      if (isEmpty(target)) {
        console.warn("表单实例未完成。");
        throw new Error("表单实例未完成。");
      } else {
        return Reflect.get(target as FormMethods, prop, receiver);
      }
    },
  });
  const register = (methods) => {
    formMethods = methods;
    if (props) {
      formMethodsProxy.setProps(props);
    }
    onRegister?.(formMethodsProxy);
  };
  return [h(BasicForm, { onRegister: register }), formMethodsProxy];
}
