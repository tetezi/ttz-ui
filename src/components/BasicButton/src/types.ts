import type { DefineComponent } from "vue";

export type Props = {
  size?: "large" | "default" | "small";
  type?: "primary" | "success" | "warning" | "danger" | "info";
  text?: boolean;
  bg?: boolean;
  link?: boolean;
  round?: boolean;
  circle?: boolean;
  disabled?: boolean;
  icon?: string | DefineComponent;
  autoInsertSpace?: boolean;

  func?: (...args: any[]) => Promise<any> | void;
  isConfirm?: boolean;
  tip?: string;
  errMsg?: string;
};

export type ShortEvent = {
  click: [];
};

export type EventObject = ShortEventToOnEvent<ShortEvent>;

export type Bind = Props & EventObject;
