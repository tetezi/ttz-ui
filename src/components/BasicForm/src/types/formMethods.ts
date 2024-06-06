import type { ComputedRef } from "vue";
import type {
  SetProps,
  GetFormProps,
  Validate,
  SubmitFunction,
  GetSubmitLoading,
  UpdateSchema,
  RemoveSchema,
  SetSchemas,
  GetSchema,
  IsSelectedSchema,
  SelectedSchema,
  SelectSchema,
  GetFormItemInstance,
  GetSchemas,
  GetParentSchema,
} from "./useHooks";
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
  getSubmitLoading: GetSubmitLoading;
  initDefaultValue: () => void;
  updateSchema: UpdateSchema;
  removeSchema: RemoveSchema;
  getParentSchema: GetParentSchema;
  setSchemas: SetSchemas;
  getSchema: GetSchema;
  getSchemas: GetSchemas;
  selectSchema: SelectSchema;
  isSelectedSchema: IsSelectedSchema;
  getFormItemInstance: GetFormItemInstance;
  selectedSchema: SelectedSchema;
};
