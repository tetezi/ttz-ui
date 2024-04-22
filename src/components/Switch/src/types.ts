import type { ShortEventToOnEvent } from "@/global";
import type { SwitchProps } from "element-plus";
export type Props = {} & Pick<
  SwitchProps,
  | "size"
  | "width"
  | "width"
  | "inactiveText"
  | "activeText"
  | "activeValue"
  | "inactiveValue"
>;

export type ShortEvent = {
  change: [val: number];
};

export type EventObject = ShortEventToOnEvent<ShortEvent>;

export type Bind = Props & EventObject;
