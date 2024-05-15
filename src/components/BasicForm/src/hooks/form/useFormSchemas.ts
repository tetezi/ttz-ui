import { isFunction } from "lodash";
import { computed, unref, type ComputedRef } from "vue";

import type {
  GetFormSchemas,
  FormBind,
  FormSchema,
  FormSchemas,
} from "../../types";
import { buildUUID } from "@/utils/uuid";
import type { GetModelValue, SetModelValue } from "@/utils";
export function adjustFormSchemas(
  formSchemas: FormSchemas
): GetFormSchemas["value"] {
  return formSchemas.map((comp) => {
    return {
      ...comp,
      category: comp.category ?? "Input",
      schemaKey:
        comp.schemaKey ?? (<FormSchema<"Input">>comp).field
          ? String((<FormSchema<"Input">>comp).field)
          : buildUUID(),
    };
  }) as GetFormSchemas["value"];
}
export function useFormSchemas(
  getProps: ComputedRef<FormBind>,
  {
    setModelValue,
    getModelValue,
  }: {
    setModelValue: SetModelValue;
    getModelValue: GetModelValue;
  }
) {
  const getFormSchemas: GetFormSchemas = computed(() => {
    const formSchemas = unref(getProps).formSchemas || [];
    const reuslt = isFunction(formSchemas)
      ? formSchemas({
          getModelValue,
          setModelValue,
        })
      : formSchemas;
    return adjustFormSchemas(reuslt);
  });
  return {
    getFormSchemas,
  };
}
