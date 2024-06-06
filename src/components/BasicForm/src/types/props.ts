import type { Component, Raw, VNode } from "vue";
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
  injectComponents?: Array<[string, Raw<Component>]>;
  labelPosition?: "left" | "right" | "top";
  defaultValue?: Recordable;
  labelWidth?: number | string;
  beforeSubmit?: (params: any) => MaybePromise<any>;
  submitApi?: (params: any) => MaybePromise<any>;
  isDesign?: boolean;
  isDesignFormSchema?: boolean;
  formSchemas?: DesignFormSchema[] | FormSchemas<FormMethods>;
};

export type FormItemGroupProps<ExtraRenderParams extends Recordable> = {
  formSchemas: DesignFormSchema[] | FormSchemas<ExtraRenderParams>;
  parentSchema?: Flatten<FormSchemas<ExtraRenderParams>>;
  formModel: Recordable;
  setFieldsValue: SetFieldsValue;
  getSlot: (slotName: string, data: Recordable) => VNode[] | null;
  extraRenderParams?: ExtraRenderParams;
  isDesign?: boolean;
  isDesignFormSchema?: boolean;
};
export type FormItemProps<ExtraRenderParams extends Recordable> = {
  schema: Flatten<FormSchemas<ExtraRenderParams>>;
  formModel: Recordable;
  setFieldsValue: SetFieldsValue;
  getSlot: (slotName: string, data: Recordable) => VNode[] | null;
  extraRenderParams?: ExtraRenderParams;
  isDesign?: boolean;
  isDesignFormSchema?: boolean;
};

export type FormShortEvent = {
  change: [formData: Recordable];
  submit: [formData: Recordable, submitResult: any];
  selectSchema: [schemaKey: string];
  register: [formMethods: FormMethods];
};

export type FormEventObject = ShortEventToOnEvent<FormShortEvent>;

export type FormBind = FormProps & FormEventObject;
