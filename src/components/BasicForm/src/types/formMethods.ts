import type { ComputedRef } from "vue";
import type { SetProps, GetProps, Validate, SubmitFunction } from "./useHooks";
import type { PropertyPath } from "lodash";

export type FormMethods = {
  setProps: SetProps;
  getProps: GetProps;
  getModelValue: ComputedRef<any>;
  setModelValue: (val: any) => void;
  setFieldsValue: (key: PropertyPath, val: any) => void;
  getFieldsValue: (key: PropertyPath) => any;
  validate: Validate;
  submitFunction: SubmitFunction;
  initDefaultValue: () => void;
};
