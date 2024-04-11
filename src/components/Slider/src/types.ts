import type { CSSProperties } from "vue";

export type Props<Range extends boolean> = {
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  disabled?: boolean;
  showInput?: boolean;
  showInputControls?: boolean;
  formatTooltip?: (value: number) => string;
  /**
   * 范围模式
   */
  range?: Range;
  /**
   * 标记点
   */
  marks?: Record<
    number,
    | {
        style: CSSProperties;
        label: string;
      }
    | string
  >;
};

export type ShortEvent = {
  change: [val: number];
};

export type EventObject = ShortEventToOnEvent<ShortEvent>;

export type Bind<Range extends boolean> = Props<Range> & EventObject;
