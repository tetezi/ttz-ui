import { isUndefined, isFunction, get, isString, pick } from "lodash";
import FormItemGroup from "../../FormItemGroup.vue";
import {
  computed,
  unref,
  type VNodeChild,
  readonly,
  type ComputedRef,
} from "vue";
import type {
  DynamicConfig,
  FormItemProps,
  FormSchema,
  RenderParams,
} from "../../types";
import {
  containerComponentMap,
  displayComponentMap,
  inputComponentMap,
} from "../../components";
import type { Recordable } from "@/global";
export function useDynamicConfig<ExtraRenderParams extends Recordable>(
  // schema:
  //   | FormSchema<"Container", ExtraRenderParams>
  //   | FormSchema<"Input", ExtraRenderParams>
  //   | FormSchema<"Display", ExtraRenderParams>,
  // formModel: Recordable,
  // setFieldsValue: SetFieldsValue,
  // extraRenderParams?: ExtraRenderParams
  formItemProps: FormItemProps<ExtraRenderParams>
) {
  const renderParams: ComputedRef<RenderParams<ExtraRenderParams>> = computed(
    () => {
      return {
        schema: formItemProps.schema,
        formValue: readonly(formItemProps.formModel),
        compValue: computed({
          get: () =>
            "field" in formItemProps.schema
              ? get(formItemProps.formModel, formItemProps.schema.field)
              : undefined,
          set: (val) => {
            "field" in formItemProps.schema &&
              formItemProps.setFieldsValue(formItemProps.schema.field, val);
          },
        }),
        ...(formItemProps.extraRenderParams as ExtraRenderParams),
      };
    }
  );
  function getDynamicConfig<T>(config: DynamicConfig<T, ExtraRenderParams>): T {
    if (isUndefined(config)) {
      return config;
    } else {
      if (isFunction(config)) {
        return config(unref(renderParams));
      } else {
        return config;
      }
    }
  }
  return {
    renderParams,
    getDynamicConfig,
  };
}
export function useFormItem<ExtraRenderParams extends Recordable>(
  props: FormItemProps<ExtraRenderParams>,
  emit
) {
  const { renderParams, getDynamicConfig } = useDynamicConfig(props);
  const componentPropsOfDynamic = computed(() => {
    return getDynamicConfig(props.schema.componentProps);
  });
  const componentStyleOfDynamic = computed(() => {
    return getDynamicConfig(props.schema.componentStyle);
  });
  const componentSlotOfDynamic = computed(() => {
    if (props.schema.componentSlot) {
      return getDynamicConfig(props.schema.componentSlot);
    } else {
      return undefined;
    }
  });
  const ifShowOfDynamic = computed(() =>
    getDynamicConfig(props.schema.ifShow ?? true)
  );
  const labelShowOfDynamic = computed(() => {
    if (props.schema.category === "Input") {
      return getDynamicConfig(props.schema.labelShow ?? true);
    } else {
      return undefined;
    }
  });
  const labelVNodeOfDynamic = computed(() => {
    if (props.schema.category === "Input") {
      const { labelRender, label } = props.schema;
      if (unref(labelShowOfDynamic)) {
        if (labelRender) {
          return getDynamicConfig(labelRender);
        } else {
          return getDynamicConfig(label);
        }
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  });
  function getSchemaComponent() {
    const { component } = props.schema;
    let Comp;
    if (isFunction(component)) {
      Comp = component();
    } else if (isString(component)) {
      if (props.schema.category === "Container") {
        Comp = containerComponentMap.get(component as any);
      } else if (props.schema.category === "Display") {
        Comp = displayComponentMap.get(component as any);
      } else if (props.schema.category === "Input") {
        Comp = inputComponentMap.get(component as any);
      }
      if (!Comp) {
        console.error(`找不到组件${props.schema.category}.${component}`);
        return undefined;
      }
    }

    const compAttr = {
      ...unref(componentPropsOfDynamic),
      style: unref(componentStyleOfDynamic),
      ref: (el) => {
        emit("formItemInstanceReady", props.schema.schemaKey, el);
      },
    };
    let slots = unref(componentSlotOfDynamic);
    if (props.schema.category === "Container") {
      const formItemGroupBind = {
        formSchemas: props.schema.children,
        parentSchema: props.schema,
        ...pick(props, [
          "formModel",
          "setFieldsValue",
          "getSlot",
          "extraRenderParams",
        ]),
        onFormItemInstanceReady: (key, el) => {
          emit("formItemInstanceReady", key, el);
        },
      };
      slots = {
        default: () => {
          return <FormItemGroup {...formItemGroupBind}></FormItemGroup>;
        },
        ...(slots || {}),
      };
    } else if (props.schema.category === "Input") {
      const field = props.schema.field;
      compAttr.modelValue = get(props.formModel, field);
      compAttr["onUpdate:modelValue"] = (val: any) => {
        props.setFieldsValue(field, val);
      };
    }
    return <Comp {...compAttr}>{slots}</Comp>;
  }
  const getContent = () => {
    const { render, slot, component } = props.schema;
    let Content: VNodeChild;
    if (render) {
      Content = render(unref(renderParams));
    } else if (slot) {
      Content = props.getSlot(slot, unref(renderParams));
    } else if (component) {
      Content = getSchemaComponent();
    }
    return Content;
  };
  return {
    getDynamicConfig,
    getContent,
    ifShowOfDynamic,
    labelVNodeOfDynamic,
    labelShowOfDynamic,
  };
}
