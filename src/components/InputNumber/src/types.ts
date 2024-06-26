import type { ShortEventToOnEvent } from "@/global";

export type Props = {
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  disabled?: boolean;
  size?: "large" | "default" | "small";
};

export type ShortEvent = {
  change: [val: number];
  blur: [];
  focus: [];
};

export type EventObject = ShortEventToOnEvent<ShortEvent>;

export type Bind = Props & EventObject;
