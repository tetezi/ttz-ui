import type { ShortEventToOnEvent } from "@/global";

export type Props = {
  type?: "text" | "password" | "textarea";
  maxlength?: number;
  showWordLimit?: boolean;
  placeholder?: string;
  clearable?: boolean;
  showPassword?: boolean;
  autosize?:
    | boolean
    | {
        minRows?: number;
        maxRows?: number;
      };
  disabled?: boolean;
};

export type ShortEvent = {
  blur: [];
  focus: [];
  change: [value: string];
  input: [value: string];
  clear: [];
};

export type EventObject = ShortEventToOnEvent<ShortEvent>;

export type Bind = Props & EventObject;
