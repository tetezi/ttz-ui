import type { FormInstance } from "element-plus";
import type { FormSchema, FormSchemas } from "./formSchema";
import type { FormBind, FormShortEvent } from "./props";

import type { PropertyPath } from "lodash";
import type { ComputedRef } from "vue";
// useProps.ts
export type GetProps = ComputedRef<FormBind>;
export type SetProps = (props: Partial<FormBind>) => void;

export type EmitEvent = (key: keyof FormShortEvent, ...args: any[]) => void;

//useData.ts
export type SetFieldsValue = (key: PropertyPath, value: any[]) => void;

export type GetFieldsValue = (key: PropertyPath, value: any) => any;

export type SetFormData = (data: Recordable) => void;

export type GetFormData = ComputedRef<Recordable>;

//useFormSchemas.ts
export type GetFormSchemas = ComputedRef<
  Array<
    Flatten<FormSchemas> & {
      category: "Container" | "Display" | "Input";
      schemaKey: string;
    }
  >
>;

//useElFormInstance.ts
export type GetElFormInstance = () => FormInstance;
export type Validate = () => Promise<void>;
export type ValidateField = (props: MaybeArray<PropertyPath>) => Promise<void>;

//useSubmit.ts
export type SubmitFunction = () => Promise<void>;
