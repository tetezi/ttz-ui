import type { VNode } from "vue";
import type { FormSchemas } from "./formSchema";
import type { FormMethods } from ".";
import type { SetModelValue, GetModelValue, SetFieldsValue } from "@/utils";
import type { Recordable, MaybePromise, Flatten, ShortEventToOnEvent } from "@/global";
export type FormProps = {
  defaultValue?: Recordable;
  labelWidth?: number | string;
  // rowProps?: Partial<ELRowProps>;
  beforeSubmit?: (params: any) => MaybePromise<any>;
  submitApi?: (params: any) => MaybePromise<any>; //(params: Recordable)  => MaybePromise<void>;
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
  getSlot: (slotName: string, data: Recordable) => VNode[] | null;
};

export type FormShortEvent = {
  change: [formData: Recordable];
  submit: [formData: Recordable, submitResult: any];
  register: [formMethods: FormMethods];
};

export type FormEventObject = ShortEventToOnEvent<FormShortEvent>;

export type FormBind = FormProps & FormEventObject;
