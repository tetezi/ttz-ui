import type { ShortEventToOnEvent } from "@/global";
import type { Component } from "vue";

export type BasicIconProps = {
  // iconComponent?: Component,
  // iconName?: string,
  // iconUrl?: string
  icon: string | Component;
  size?: string | number;
  loading?: boolean;
};

export type BasicIconShortEvent = {};

export type BasicIconEventObject = ShortEventToOnEvent<BasicIconShortEvent>;

export type BasicIconBind = BasicIconProps & BasicIconEventObject;
