import type { ShortEventToOnEvent } from "@/global";
import type { RowProps as ElRowProps } from "element-plus";
export type RowProps = {} & ElRowProps;

export type RowShortEvent = {};

export type RowEventObject = ShortEventToOnEvent<RowShortEvent>;

export type RowBind = RowProps & RowEventObject;
