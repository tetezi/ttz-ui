import type { FormInstance } from "element-plus";
import type { DesignFormSchema, FormSchemas } from "./formSchema";
import type {
  FormBind,
  FormProps,
  FormEventObject,
  FormShortEvent,
} from "./props";

import type { PropertyPath } from "lodash";
import type { ComputedRef } from "vue";
import type { Flatten, GetProps, MaybeArray, Recordable } from "@/global";
import type defaultProps from "../defaultProps";
import type { WritableComputedRef } from "vue";
import type { FormMethods } from "./formMethods";
// useProps.ts
export type GetFormProps = GetProps<
  FormProps,
  typeof defaultProps,
  FormEventObject
>;
export type SetProps = (props: Partial<FormBind>) => void;

export type EmitEvent = (key: keyof FormShortEvent, ...args: any[]) => void;

//useFormSchemas.ts
export type FormSchemasCompRef<ExtraRenderParams extends Recordable> =
  WritableComputedRef<
    Array<
      Flatten<FormSchemas<ExtraRenderParams>> & {
        category: "Container" | "Display" | "Input";
        schemaKey: string;
      }
    >
  >;

//useElFormInstance.ts
export type GetElFormInstance = () => FormInstance;
export type Validate = () => Promise<void>;
export type ValidateField = (props: MaybeArray<PropertyPath>) => Promise<void>;
export type GetFormItemInstance = (key: string) => Recordable | undefined;

//useSubmit.ts
export type SubmitFunction = () => Promise<void>;
export type GetSubmitLoading = ComputedRef<boolean>;

//upFormSchemas.ts
export type UpdateSchema = (
  schemaKey: string,
  schema: DesignFormSchema[] | FormSchemas<FormMethods>,
  isRetain?: boolean
) => void;
export type SetSchemas = (
  schemas: DesignFormSchema[] | FormSchemas<FormMethods>,
  parentSchemaKey?: string
) => void;
export type GetSchema = (
  schemaKey: string
) => DesignFormSchema[] | FormSchemas<FormMethods> | undefined;
