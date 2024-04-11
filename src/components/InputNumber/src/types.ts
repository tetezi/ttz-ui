export type Props = {
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  disabled?: boolean;
};

export type ShortEvent = {
  change:[val:number]
  blur:[]
  focus:[]
};

export type EventObject = ShortEventToOnEvent<ShortEvent>;

export type Bind = Props & EventObject;
