import type { VNode } from "vue";
import type { FormSchemas } from "./formSchema";
import type { SubmitFunction } from "./useHooks.ts";
import type {
  RowProps as ELRowProps,
  ColProps as ELColProps,
} from "element-plus";
import type { FormMethods } from ".";
import type { SetModelValue, GetModelValue, SetFieldsValue } from "@/utils";
export type FormProps = {
  defaultValue?: Recordable;
  labelWidth?: number | string;
  rowProps?: Partial<ELRowProps>;
  baseColProps?: Partial<ELColProps>;
  submitApi?: (params: Recordable) => MaybePromise<void>;
  formSchemas?:
    | FormSchemas
    | ((params: {
        setModelValue: SetModelValue;
        getModelValue: GetModelValue;
      }) => FormSchemas);
};

export type FormItemProps = {
  schema: Flatten<FormSchemas>;
  formModel: Recordable;
  setFieldsValue: SetFieldsValue;
  submitFunction: SubmitFunction;
  baseColProps?: FormProps["baseColProps"];
  getSlot: (slotName: string, data: Recordable) => VNode[] | null;
};

export type FormShortEvent = {
  change: [formData: Recordable];
  submit: [formData: Recordable];
  register: [formMethods: FormMethods];
};

export type FormEventObject = ShortEventToOnEvent<FormShortEvent>;

export type FormBind = FormProps & FormEventObject;
