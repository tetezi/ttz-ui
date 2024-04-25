import { useComponentRegister } from "@/utils";
import type {
  MaybeRefOrGetter, 
} from "vue";
import type { DialogBind, DialogMethods } from "../types";
import { BasicDialog } from "../.."; 

export function useDialog<Data>(
  props: MaybeRefOrGetter<DialogBind<Data>>,
  onRegister?: (dialogMethods: DialogMethods<Data>) => void
) { 
  return useComponentRegister(BasicDialog, props, onRegister);
} 