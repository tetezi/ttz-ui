import { computed, ref, toRaw, unref } from "vue";

export function useSelectedSchema() {
  const selectedSchema = ref(null);
  function selectSchema(schema) {
    selectedSchema.value = schema;
  }
  function unSelectSchema() {
    selectedSchema.value = null;
  }
  function isSelectedSchema(schema) {
    console.log("判断", {
      schema,
      a: unref(selectedSchema)?.schemaKey ,
      b: schema.schemaKey,
      bb:unref(selectedSchema)?.schemaKey === schema.schemaKey
    });
    // console.log('toRaw(unref(selectedSchema)) === schema;',toRaw(unref(selectedSchema)) , schema,toRaw(unref(selectedSchema)) === schema)
    return unref(selectedSchema)?.schemaKey === schema.schemaKey;
  }
  const getSelectedSchema = computed(() => unref(selectedSchema));
  return {
    getSelectedSchema,
    selectSchema,
    unSelectSchema,
    isSelectedSchema,
  };
}
