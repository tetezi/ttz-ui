import type { GetProps, MaybePromise, ShortEventToOnEvent } from "@/global";
import type { DialogMethods } from "./methods";
import type { defaultDialogProps } from "../defaultProps";
import type { DialogProps as ElDialogProps } from "element-plus";
import type { VNodeChild } from "vue";

export type DialogProps<Data> = {
  data?: Data;
  headerRender?: (dialogMethods: DialogMethods<Data>) => VNodeChild;
  bodyRender?: (dialogMethods: DialogMethods<Data>) => VNodeChild;
  footerRender?: (dialogMethods: DialogMethods<Data>) => VNodeChild;
  beforeOpen?: () => MaybePromise<void>;
  beforeClose?: () => MaybePromise<void>;
  submitApi?: () => MaybePromise<void>;
  submitCheckBeforeClose?: boolean;
  showActionBtns?: boolean;
  showSubmitBtn?: boolean;
  showCancelBtn?: boolean;
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
export type DialogShortEvent<Data> = {
  register: [DialogMethods: DialogMethods<Data>];
  open: [];
  opened: [];
  close: [];
  closed: [];
};

export type DialogEventObject<Data> = ShortEventToOnEvent<DialogShortEvent<Data>>;

export type DialogBind<Data> = DialogProps<Data> & DialogEventObject<Data>;

export type GetDialogProps<Data> = GetProps<
  DialogProps<Data>,
  typeof defaultDialogProps,
  DialogEventObject<Data>
>;
