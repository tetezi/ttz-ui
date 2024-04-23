import type { ComputedRef } from "vue";
import type { SetProps, GetFormProps, Validate, SubmitFunction } from "./useHooks";
import type { PropertyPath } from "lodash";

export type FormMethods = {
  setProps: SetProps;
  getProps: GetFormProps;
  getModelValue: ComputedRef<any>;
  setModelValue: (val: any) => void;
  setFieldsValue: (key: PropertyPath, val: any) => void;
  getFieldsValue: (key: PropertyPath) => any;
  validate: Validate;
  submitFunction: SubmitFunction;
  initDefaultValue: () => void;
};
