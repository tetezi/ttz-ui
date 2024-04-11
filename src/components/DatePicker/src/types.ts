import dayjs from "dayjs";
export type Props = {
  max?: dayjs.ConfigType;
  min?: dayjs.ConfigType;
  type?:
    | "year"
    | "years"
    | "month"
    | "date"
    | "dates"
    | "datetime"
    | "daterange"
    | "monthrange"
    | "datetimerange";
  /**
   * 显示在选择器的文本，使用Day.js支持的格式，如YYYY-MM-DD
   */
  format?: string;
  /**
   * 实际绑定的值，格式同上
   */
  valueFormat?: string;
  /**
   * datetime模式下的默认时分秒
   */
  defaultTime?:dayjs.ConfigType
  disabledDate?: (date: dayjs.ConfigType) => boolean;
  shortcuts?: Array<{ text: string; value: Date | (() => Date) }>;
  disabled?: boolean;
  clearable?: boolean;
  placeholder?: string;
  startPlaceholder?: string;
  endPlaceholder?: string;
  unlinkPanels?: boolean;
};

export type ShortEvent = {
  change: [val: number];
};

export type EventObject = ShortEventToOnEvent<ShortEvent>;

export type Bind = Props & EventObject;
