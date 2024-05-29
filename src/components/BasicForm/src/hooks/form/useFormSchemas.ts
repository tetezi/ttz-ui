import { getCurrentInstance, unref, watch, type Ref } from "vue";
import type {
  DesignFormSchema,
  FormSchemas,
  FormMethods,
  GetFormProps,
  UpdateSchema,
  SetSchemas,
  GetSchema,
  SetProps,
} from "../../types";
import { cloneDeep } from "lodash";

export function useFormSchemas(
  // formSchemasRef: Ref<DesignFormSchema[] | FormSchemas<FormMethods>>,
  getProps: GetFormProps,
  setProps: SetProps
) {
  const updateSchema: UpdateSchema = (scheamKey, data, isRetain = false) => {
    function update(schemas) {
      for (const i in schemas) {
        if (
          /**
           * DesignFormSchema[]
           */
          (schemas[i].id ||
            /**
             * FormSchemas<FormMethods>
             */
            schemas[i].scheamKey ||
            String(schemas[i].field)) === scheamKey
        ) {
          if (isRetain) {
            schemas[i] = {
              ...schemas[i],
              ...data,
            };
          } else {
            schemas[i] = data;
          }
          return;
        } else if (schemas[i].children) {
          update(schemas[i].children);
        }
      }
    }
    update(unref(getProps).formSchemas);
  };
  const setSchemas: SetSchemas = (schemas, parentSchemaKey?: string) => {
    if (!parentSchemaKey) {
      // formSchemasRef.value = schemas;
      setProps({
        formSchemas: schemas,
      });
    } else {
      updateSchema(parentSchemaKey, { children: schemas } as any, true);
    }
  };
  const getSchema: GetSchema = (scheamKey) => {
    function find(schemas) {
      for (const schema of schemas) {
        if (
          /**
           * DesignFormSchema[]
           */
          (schema.id ||
            /**
             * FormSchemas<FormMethods>
             */
            schema.scheamKey ||
            String(schema.field)) === scheamKey
        ) {
          return schema;
        } else if (schema.children) {
          find(schema.children);
        }
      }
    }
    return find(unref(getProps).formSchemas);
  };
  /**
   * 修改setProps的本地props时同步设置localFormSchemas
   */
  // const rawProps = getCurrentInstance()!.vnode!.props!;
  // if (!("formSchemas" in rawProps)) {
  //   watch(
  //     () => unref(getProps).formSchemas,
  //     (val) => {
  //       formSchemasRef.value = cloneDeep(val);
  //     },
  //     {
  //       deep: true,
  //       immediate: true,
  //     }
  //   );
  // }
  return {
    updateSchema,
    setSchemas,
    getSchema,
  };
}
