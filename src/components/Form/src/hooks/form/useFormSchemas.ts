import { isFunction } from "lodash";
import { computed, unref, type ComputedRef } from "vue";

import type {
  GetFormData,
  GetFormSchemas,
  SetFormData,
  FormBind,
  FormSchema, 
} from "../../types";
import { buildUUID } from "@/utils/uuid";

export function useFormSchemas(
  getProps: ComputedRef<FormBind>,
  {
    setFormData,
    getFormData,
  }: {
    setFormData: SetFormData;
    getFormData: GetFormData;
  }
) {
  const getFormSchemas: GetFormSchemas = computed(() => {
    const formSchemas = unref(getProps).formSchemas || [];
    const reuslt = isFunction(formSchemas)
      ? formSchemas({
          getFormData: getFormData,
          setFormData: setFormData,
        })
      : formSchemas;
    return reuslt.map((comp) => {
      return {
        ...comp,
        category: comp.category ?? "Input",
        schemaKey:
          comp.schemaKey ?? (<FormSchema<"Input">>comp).field
            ? String((<FormSchema<"Input">>comp).field)
            : buildUUID(),
      };
    }) as GetFormSchemas["value"];
  });
  return {
    getFormSchemas,
  };
}
