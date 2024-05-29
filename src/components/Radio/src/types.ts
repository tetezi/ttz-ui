import type { Recordable, ShortEventToOnEvent } from "@/global";

export type RadioProps<Option extends Recordable> = {
  options?: Array<Option>;
  labelField?: string | ((item: Option) => string);
  valueField?: string; 
  isObject?: boolean;
  disabled?: boolean;
  border?: boolean;
  isButton?: boolean;
  size?: "large" | "default" | "small";
};

export type RadioShortEvent<Option extends Recordable> = {
  change: [val: string | Option, option?: Option];
};

export type RadioEventObject<O extends Recordable> = ShortEventToOnEvent<
  RadioShortEvent<O>
>;

export type RadioBind<Option extends Recordable> = RadioProps<Option> &
  RadioEventObject<Option>;
