import { useComponentRegister } from "@/utils";
import type {
  MaybeRefOrGetter, 
} from "vue";
import type { DialogBind, DialogMethods } from "../types";
import { BasicDialog } from "../.."; 

export function useDialog(
  props: MaybeRefOrGetter<DialogBind>,
  onRegister?: (dialogMethods: DialogMethods) => void
) {
  return useComponentRegister(BasicDialog, props, onRegister);
}
