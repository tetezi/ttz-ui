import { isUndefined, isFunction, get, isString, pick } from "lodash";
import FormItemGroup from "../../FormItemGroup.vue";
import { computed, unref, type VNodeChild, readonly } from "vue";
import type { DynamicConfig, FormItemProps, RenderParams } from "../../types";
import {
  containerComponentMap,
  displayComponentMap,
  inputComponentMap,
} from "../../components";
import type { Recordable } from "@/global";

export function useFormItem<ExtraRenderParams extends Recordable>(
  props: FormItemProps<ExtraRenderParams>,
  emit
) {
  const renderParams = computed<RenderParams<ExtraRenderParams>>(() => {
    return {
      schema: props.schema,
      formValue: readonly(props.formModel),
      compValue: computed({
        get: () =>
          "field" in props.schema
            ? get(props.formModel, props.schema.field)
            : undefined,
        set: (val) => {
          "field" in props.schema &&
            props.setFieldsValue(props.schema.field, val);
        },
      }),
      ...(props.extraRenderParams as ExtraRenderParams),
    };
  });
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
  function getSchemaComponent() {
    const { component, componentProps, componentStyle, componentSlot } =
      props.schema;
    let Comp;
    if (component && !isString(component)) {
      Comp = component;
    } else {
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
      ...getDynamicConfig(componentProps),
      style: getDynamicConfig(componentStyle),
      ref: (el) => {
        emit("formItemInstanceReady", props.schema.schemaKey, el);
      },
    };
    let slots = componentSlot ? getDynamicConfig(componentSlot) : undefined;
    if (props.schema.category === "Container") {
      const formItemGroupBind = {
        modelValue: props.schema.children,
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
    return slots ? (
      <Comp {...compAttr}>{slots}</Comp>
    ) : (
      <Comp {...compAttr}></Comp>
    );
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
  };
}
