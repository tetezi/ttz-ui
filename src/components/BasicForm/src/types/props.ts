import type { VNode } from "vue";
import type { DesignFormSchema, FormSchemas } from "./formSchema";
import type { FormMethods } from ".";
import type { SetFieldsValue } from "@/utils";
import type {
  Recordable,
  MaybePromise,
  Flatten,
  ShortEventToOnEvent,
} from "@/global";
export type FormProps = {
  defaultValue?: Recordable;
  labelWidth?: number | string;
  beforeSubmit?: (params: any) => MaybePromise<any>;
  submitApi?: (params: any) => MaybePromise<any>;
  isDesign?: boolean;
  isDesignFormSchema?: boolean;
  formSchemas?: DesignFormSchema[] | FormSchemas<FormMethods>;
};

export type FormItemGroupProps<ExtraRenderParams extends Recordable> = {
  parentSchema?: Recordable;
  formModel: Recordable;
  setFieldsValue: SetFieldsValue;
  getSlot: (slotName: string, data: Recordable) => VNode[] | null;
  extraRenderParams?: ExtraRenderParams;
};
export type FormItemProps<ExtraRenderParams extends Recordable> = {
  schema: Flatten<FormSchemas<ExtraRenderParams>>;
  formModel: Recordable;
  setFieldsValue: SetFieldsValue;
  getSlot: (slotName: string, data: Recordable) => VNode[] | null;
  extraRenderParams?: ExtraRenderParams;
};

export type FormShortEvent = {
  change: [formData: Recordable];
  submit: [formData: Recordable, submitResult: any];
  register: [formMethods: FormMethods];
};

export type FormEventObject = ShortEventToOnEvent<FormShortEvent>;

export type FormBind = FormProps & FormEventObject;
