import type { FormInstance } from "element-plus";
import type { FormSchemas } from "./formSchema";
import type { FormBind, FormShortEvent } from "./props";

import type { PropertyPath } from "lodash";
import type { ComputedRef } from "vue";
// useProps.ts
export type GetProps = ComputedRef<FormBind>;
export type SetProps = (props: Partial<FormBind>) => void;

export type EmitEvent = (key: keyof FormShortEvent, ...args: any[]) => void;

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