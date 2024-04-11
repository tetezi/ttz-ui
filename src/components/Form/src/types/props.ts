import type { VNode } from "vue";
import type { FormSchemas, FormSchema } from "./formSchema";
import type {
  GetFormData,
  SetFieldsValue,
  SetFormData,
  SubmitFunction,
} from "./useHooks.ts";
import type {
  RowProps as ELRowProps,
  ColProps as ELColProps,
} from "element-plus";
export type FormProps = {
  defaultValue?: Recordable;
  labelWidth?: number | string;
  rowProps?: Partial<ELRowProps>;
  baseColProps?: Partial<ELColProps>;
  submitApi?: (params: Recordable) => MaybePromise<void>;
  formSchemas?:
    | FormSchemas
    | ((params: {
        getFormData: GetFormData;
        setFormData: SetFormData;
      }) => FormSchemas);
};

export type FormItemProps = {
  schema: Flatten<FormSchemas>;
  formModel: GetFormData["value"];
  setFieldsValue: SetFieldsValue;
  submitFunction: SubmitFunction;
  baseColProps?: FormProps["baseColProps"];   
  getSlot: (slotName: string, data: Recordable) => VNode[] | null;
};

export type FormShortEvent = {
  change: [formData: Recordable];
  submit: [formData: Recordable];
};

export type FormEventObject = ShortEventToOnEvent<FormShortEvent>;

export type FormBind = FormProps & FormEventObject;
