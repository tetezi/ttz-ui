import { computed, getCurrentInstance, ref, unref, watch, type Ref } from "vue";
import type {
  DesignFormSchema,
  FormSchemas,
  FormMethods,
  GetFormProps,
  UpdateSchema,
  RemoveSchema,GetParentSchema,
  SetSchemas,
  SelectedSchema,
  GetSchema,
  GetSchemas,
  SetProps,
  EmitEvent,
  FormSchema,
} from "../../types";
import { cloneDeep, flatMap, get, set } from "lodash";
import type { Flatten, UUID } from "@/global";
import { buildUUID } from "@/utils";

export function useFormSchemas(
  // formSchemasRef: Ref<DesignFormSchema[] | FormSchemas<FormMethods>>,
  getProps: GetFormProps,
  setProps: SetProps,
  emitEvent: EmitEvent
) {
  const selectedSchemaKey = ref<string | null>(null);
  const selectedSchema: SelectedSchema = computed(() => {
    const key = unref(selectedSchemaKey);
    return key ? getSchema(key) : undefined;
  });
  const formSchemas: Ref<FormSchemas<FormMethods> | DesignFormSchema[]> = ref(
    []
  );
  watch(
    () => unref(getProps).formSchemas,
    () => {
      function addId(
        formSchemas: FormSchemas<FormMethods> | DesignFormSchema[]
      ) {
        for (const schema of formSchemas) {
          if (!("schemaKey" in schema)) {
            schema.schemaKey = schema.schemaKey ?? buildUUID();
          }
          if (!("category" in schema)) {
            schema.category = "Input";
          }
          if (schema.category === "Container") {
            addId(schema.children || []);
          }
        }
      }
      const val = cloneDeep(unref(getProps).formSchemas);
      addId(val);
      formSchemas.value = cloneDeep(val);
    }
  );
  const schemaTreeMap = computed(() => {
    const result: {
      [key: UUID]: {
        scheam: DesignFormSchema | Flatten<FormSchemas<FormMethods>>;
        path?: string[];
        parentSchema?: DesignFormSchema | FormSchema<"Container", FormMethods>;
        parentKey?: UUID;
      };
    } = {};
    function addScheamsToTree(
      list: DesignFormSchema[] | FormSchemas<FormMethods>,
      parentSchema?: DesignFormSchema | FormSchema<"Container", FormMethods>,
      path?: string[]
    ) {
      for (const index in list) {
        const item = list[index];
        const actPath = path ? [...path, index] : [index];
        result[item["schemaKey"] as string] = {
          scheam: item,
          path: actPath,
          parentSchema: parentSchema,
          parentKey: parentSchema?.["schemaKey"],
        };
        if (item.category === "Container" && item.children) {
          addScheamsToTree(item.children, item, actPath);
        }
      }
    }
    addScheamsToTree(unref(formSchemas));
    return result;
  });
  function selectSchema(schemaKey: string | false) {
    selectedSchemaKey.value = schemaKey ? schemaKey : null;
    emitEvent("selectSchema", schemaKey);
  }
  function unSelectSchema() {
    selectedSchemaKey.value = null;
  }
  function isSelectedSchema(schemaKey) {
    return unref(selectedSchemaKey) === schemaKey;
  }
  const removeSchema: RemoveSchema = (schemaKey) => {
    const { parentSchema, parentKey } = unref(schemaTreeMap)[schemaKey];
    const schemas = parentKey ? parentSchema?.children : unref(formSchemas);
    setSchemas(
      (schemas || []).filter((s) => schemaKey !== s["schemaKey"]) as
        | FormSchemas<FormMethods>
        | DesignFormSchema[],
      parentKey
    );
  };
  const getParentSchema: GetParentSchema = function (schemaKey) {
    const { parentSchema } = unref(schemaTreeMap)[schemaKey];
    return parentSchema;
  };
  const updateSchema: UpdateSchema = (schemaKey, data) => {
    const { path } = unref(schemaTreeMap)[schemaKey];
    if (path) {
      const objPath = flatMap(path, (item, index) => {
        if (index === 0) {
          return [item];
        }
        return ["children", item];
      });
      set(unref(formSchemas), objPath, data);
    } else {
      console.error(
        "找不到updateSchema对应的schema",
        schemaKey,
        unref(formSchemas)
      );
    }
  };
  const setSchemas: SetSchemas = (schemas, parentSchemaKey?: string) => {
    if (!parentSchemaKey) {
      formSchemas.value = schemas;
    } else {
      const { path } = unref(schemaTreeMap)[parentSchemaKey];
      if (path) {
        const objPath = flatMap(path, (item, index) => {
          if (index === 0) {
            return [item];
          }
          return ["children", item];
        });
        set(unref(formSchemas), [...objPath, "children"], schemas);
      } else {
        console.error(
          "找不到updateSchema对应的schema",
          parentSchemaKey,
          unref(formSchemas)
        );
      }
    }
  };
  const getSchema: GetSchema = (schemaKey) => {
    return unref(schemaTreeMap)[schemaKey]?.scheam;
  };
  const getSchemas: GetSchemas = computed(() => {
    return unref(formSchemas);
  });
  return {
    updateSchema,
    removeSchema,
    setSchemas,
    getSchemas,
    getSchema,
    getParentSchema,
    selectSchema,
    unSelectSchema,
    selectedSchema,
    isSelectedSchema,
  };
}
