export type Props<Option extends Recordable> = {
  options?: Array<Option>;
  labelField?: string | ((item: Option) => string);
  valueField?: string;
  placeholder?: string;
  isObject?: boolean;
  filterable?: boolean;
  loading?: boolean;
  remote?: boolean;
  remoteMethod?: (query: string) => void;
  disabled?: boolean;
  multiple?: boolean;
};

export type ShortEvent<Option extends Recordable> = {
  change:
    | [val: string | Option, option?: Option]
    | [
        val: Array<Option> | Array<string>,
        option?: Array<Option> | Array<undefined | Option>
      ];
  focus: [];
};

export type EventObject<O extends Recordable> = ShortEventToOnEvent<ShortEvent<O>>;

export type Bind<Option extends Recordable> = Props<Option> & EventObject<Option>;
