import { ref, unref } from "vue";

export function useSelectedSchema() {
  const selectedSchemaKey = ref<string | null>(null);
  function selectSchema(schemaKey: string | false) {
    selectedSchemaKey.value = schemaKey ? schemaKey : null;
  }
  function unSelectSchema() {
    selectedSchemaKey.value = null;
  }
  function isSelectedSchema(schema) {
    return unref(selectedSchemaKey) === schema.schemaKey;
  }
  return {
    selectSchema,
    unSelectSchema,
    isSelectedSchema,
  };
}
