import type {
  GetFieldsValue,
  GetFormData,
  SetFieldsValue,
  SetFormData,
  SetProps,
  Validate,
  SubmitFunction,
} from "./useHooks";

export type FormMethods = {
  setProps: SetProps;
  getFormData: GetFormData;
  setFormData: SetFormData;
  setFieldsValue: SetFieldsValue;
  getFieldsValue: GetFieldsValue;
  validate: Validate;
  submitFunction: SubmitFunction;
};
