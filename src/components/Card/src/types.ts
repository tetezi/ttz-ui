import type { ShortEventToOnEvent } from "@/global";
import type { CSSProperties } from "vue";

export type CardProps = {
  title?: string;
  footer?: string;
  shadow?: "always" | "never" | "hover";
  bodyStyle?: CSSProperties;
};

export type CardShortEvent = {};

export type CardEventObject = ShortEventToOnEvent<CardShortEvent>;

export type CardBind = CardProps & CardEventObject;
