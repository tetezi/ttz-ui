import { useComponentRegister } from "@/utils";
import type { MaybeRefOrGetter, DefineComponent } from "vue";
import type { DialogBind, DialogMethods } from "../types";
import { BasicDialog } from "../..";

export function useDialog(
  props: MaybeRefOrGetter<DialogBind>,
  onRegister?: (dialogMethods: DialogMethods) => void
) {
  return useComponentRegister(
    BasicDialog as unknown as DefineComponent,
    props,
    onRegister
  );
}
