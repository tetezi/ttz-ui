import type { GetProps, MaybePromise, ShortEventToOnEvent } from "@/global";
import type { DialogMethods } from "./methods";
import type { defaultDialogProps } from "../defaultProps";
import type { DialogProps as ElDialogProps } from "element-plus";
import type { VNodeChild } from "vue";

export type DialogProps = {
  headerRender?: (dialogMethods: DialogMethods) => VNodeChild;
  bodyRender?: (dialogMethods: DialogMethods) => VNodeChild;
  footerRender?: (dialogMethods: DialogMethods) => VNodeChild;
  beforeOpen?: () => MaybePromise<void>;
  beforeClose?: () => MaybePromise<void>;
  submitApi?: () => MaybePromise<void>;
  submitCheckBeforeClose?: boolean;
  showActionBtns?:boolean
  showSubmitBtn?:boolean
  showCancelBtn?:boolean
} & Pick<
  Partial<ElDialogProps>,
  | "title"
  | "width"
  | "fullscreen"
  | "top"
  | "modal"
  | "appendToBody"
  | "appendTo"
  | "lockScroll"
  | "openDelay"
  | "openDelay"
  | "closeDelay"
  | "openDelay"
  | "closeOnClickModal"
  | "closeOnPressEscape"
  | "showClose" 
  | "draggable"
  | "overflow"
  | "center"
  | "alignCenter"
  | "alignCenter"
  | "destroyOnClose"
>;
export type DialogShortEvent = {
  register: [DialogMethods: DialogMethods];
  open: [];
  opened: [];
  close: [];
  closed: [];
};

export type DialogEventObject = ShortEventToOnEvent<DialogShortEvent>;

export type DialogBind = DialogProps & DialogEventObject;

export type GetDialogProps = GetProps<
  DialogProps,
  typeof defaultDialogProps,
  DialogEventObject
>;
