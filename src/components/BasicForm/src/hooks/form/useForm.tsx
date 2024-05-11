import type { FormBind, FormMethods } from "@/components";
import { BasicForm } from "@/components";
import { useComponentRegister } from "@/utils";
import {
  nextTick,
  type DefineComponent,
  type MaybeRefOrGetter,
  type VNode,
} from "vue";

export function useForm(
  props: MaybeRefOrGetter<FormBind>,
  onRegister?: (formMethods: FormMethods) => void
) {
  return useComponentRegister(
    BasicForm,
    props,
    onRegister
      ? (formMethods: FormMethods) => {
          nextTick(() => {
            onRegister(formMethods);
          });
        }
      : undefined
  );
}
