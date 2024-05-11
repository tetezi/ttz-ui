import { type PropertyPath } from "lodash";
import { type SelectProps } from "@/components/Select";
import type { MaybeRefOrGetter } from "vue";
import type { Recordable, MaybePromise, ShortEventToOnEvent } from "@/global";

export type Props<Params extends Recordable, Option extends Recordable> = {
  api: (params: Params) => MaybePromise<any>;
  params?: MaybeRefOrGetter<Params>;
  resultField?: PropertyPath;
  immediate?: boolean;
  queryField?: string;
} & Omit<SelectProps<Option>, "options" | "loading" | "remoteMethod">;
 

export type ShortEvent<Option extends Recordable> = {
  "init": [data: Option[]];
  "options-change": [data: Option[]];
  "change":
    | [val: string | Option, option?: Option]
    | [
        val: Array<Option> | Array<string>,
        option?: Array<Option> | Array<undefined | Option>
      ];
};

export type EventObject<Option extends Recordable> = ShortEventToOnEvent<
  ShortEvent<Option>
>;

export type Bind<Params extends Recordable, Option extends Recordable> = Props<
  Params,
  Option
> &
  EventObject<Option>;
