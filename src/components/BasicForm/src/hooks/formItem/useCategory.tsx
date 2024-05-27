import {
  isUndefined,
  isFunction,
  get,
  isString,
  cloneDeep,
  pick,
  set,
} from "lodash";
import FormItemGroup from "../../FormItemGroup.vue";
import {
  computed,
  unref,
  type ComputedRef,
  type VNodeChild,
  defineComponent,
  type VNode,
  readonly,
  type Component,
  type Ref,
} from "vue";
import type {
  FormSchema,
  DynamicConfig,
  FormItemProps,
  RenderParams,
  CategoryEnums,
} from "../../types";
import {
  containerComponentMap,
  displayComponentMap,
  inputComponentMap,
} from "../../components";
import { FormItem } from "@/components/BasicForm";
import type { Recordable } from "@/global";

function useGetDynamicConfig<
  C extends CategoryEnums,
  ExtraRenderParams extends Recordable
>(renderParams: ComputedRef<RenderParams<C, ExtraRenderParams>>) {
  function getDynamicConfig<T>(
    config: DynamicConfig<C, T, ExtraRenderParams>
  ): T {
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
  return getDynamicConfig;
}
function useContent<
  C extends CategoryEnums,
  ExtraRenderParams extends Recordable
>(
  schema: FormSchema<C, ExtraRenderParams>,
  props: FormItemProps<ExtraRenderParams>,
  renderParams: ComputedRef<RenderParams<C, ExtraRenderParams>>,
  getSchemaComponent: () => VNode | undefined
) {
  const { render, slot, component } = schema;
  let Content: VNodeChild;
  if (render) {
    Content = render(unref(renderParams));
  } else if (slot) {
    Content = props.getSlot(slot, unref(renderParams));
  } else if (component) {
    Content = getSchemaComponent();
  }
  return () => Content;
}

export function checkSchemaCategory<
  T extends "Container" | "Display" | "Input",
  ExtraRenderParams extends Recordable
>(schema: any, category: T): schema is FormSchema<T, ExtraRenderParams> {
  return schema.category === category;
}

export function useContainerCategory<ExtraRenderParams extends Recordable>(
  schema: FormSchema<"Container", ExtraRenderParams>,
  props: FormItemProps<ExtraRenderParams>,
  emit
) {
  const renderParams = computed<RenderParams<"Container", ExtraRenderParams>>(
    () => {
      return {
        schema,
        formValue: readonly(props.formModel),
        ...(props.extraRenderParams as ExtraRenderParams),
      };
    }
  );
  function getSchemaComponent() {
    const {
      component,
      children,
      componentProps,
      componentStyle,
      componentSlot,
    } = schema;

    let Comp;
    if (!component) {
      console.error(`表单未选择Container组件`);
      return undefined;
    }
    if (isString(component)) {
      if (!containerComponentMap.has(component)) {
        console.error(`组件${component}未注册`);
        return undefined;
      }
      Comp = containerComponentMap.get(component);
    } else {
      Comp = component;
    }
    const compAttr = {
      ...getDynamicConfig(componentProps),
      style: getDynamicConfig(componentStyle),
    };
    const formItemGroupBind = {
      modelValue: children,
      parentSchema: schema,
      ...pick(props, [
        "formModel",
        "setFieldsValue",
        "getSlot",
        "extraRenderParams",
      ]),
      ref: (el) => {
        emit("formItemInstanceReady", schema.schemaKey, el);
      },
      onFormItemInstanceReady: (key, el) => {
        emit("formItemInstanceReady", key, el);
      },
    };
    const slots = {
      default: () => {
        return (
          <FormItemGroup {...formItemGroupBind}></FormItemGroup> 
        );
      },
      ...(componentSlot ? getDynamicConfig(componentSlot) : {}),
    };
    return <Comp {...compAttr}>{slots}</Comp>;
  }
  const getDynamicConfig = useGetDynamicConfig<"Container", ExtraRenderParams>(
    renderParams
  );
  const getContent = useContent<"Container", ExtraRenderParams>(
    schema,
    props,
    renderParams,
    getSchemaComponent
  );
  const ifShowOfDynamic = getDynamicConfig(schema.ifShow ?? true);
  return { getDynamicConfig, getContent, ifShowOfDynamic };
}

export function useInputCategory<ExtraRenderParams extends Recordable>(
  schema: FormSchema<"Input", ExtraRenderParams>,
  props: FormItemProps<ExtraRenderParams>,
  emit
) {
  const renderParams = computed<RenderParams<"Input", ExtraRenderParams>>(
    () => {
      return {
        schema,
        compValue: computed({
          get: () => get(props.formModel, schema.field),
          set: (val) => {
            props.setFieldsValue(schema.field, val);
          },
        }),
        formValue: readonly(props.formModel),
        ...(props.extraRenderParams as ExtraRenderParams),
      };
    }
  );
  function getSchemaComponent() {
    const { component, field, componentProps, componentSlot, componentStyle } =
      schema;
    let Comp;
    if (!component) {
      console.error(`表单未选择组件`);
      return undefined;
    }
    if (isString(component)) {
      if (!inputComponentMap.has(component)) {
        console.error(`组件${component}未注册`);
        return undefined;
      }
      Comp = inputComponentMap.get(component);
    } else {
      Comp = component;
    }

    const compAttr = {
      "modelValue": get(props.formModel, field),
      "onUpdate:modelValue": (val: any) => {
        props.setFieldsValue(field, val);
      },
      ...getDynamicConfig(componentProps),
      "style": getDynamicConfig(componentStyle),
      "ref": (el) => {
        emit("formItemInstanceReady", schema.schemaKey, el);
      },
    };
    return (
      <div style={{ width: "100%", display: "flex" }}>
        <div style={{ flex: "1 1 auto", overflow: "hidden" }}>
          {componentSlot ? (
            <Comp {...compAttr}>{getDynamicConfig(componentSlot)}</Comp>
          ) : (
            <Comp {...compAttr}></Comp>
          )}
        </div>
      </div>
    );
  }
  const getDynamicConfig = useGetDynamicConfig<"Input", ExtraRenderParams>(
    renderParams
  );
  const getContent = useContent<"Input", ExtraRenderParams>(
    schema,
    props,
    renderParams,
    getSchemaComponent
  );
  const ifShowOfDynamic = getDynamicConfig(schema.ifShow ?? true);
  return { getDynamicConfig, getContent, ifShowOfDynamic };
}

export function useDisplayCategory<ExtraRenderParams extends Recordable>(
  schema: FormSchema<"Display", ExtraRenderParams>,
  props: FormItemProps<ExtraRenderParams>,
  emit
) {
  const renderParams = computed<RenderParams<"Display", ExtraRenderParams>>(
    () => {
      return {
        schema,
        formValue: readonly(props.formModel),
        ...(props.extraRenderParams as ExtraRenderParams),
      };
    }
  );
  function getSchemaComponent() {
    const { component, componentProps, componentStyle, componentSlot } = schema;
    let Comp;
    if (!component) {
      console.error(`表单未选择Display组件`);
      return undefined;
    }
    if (isString(component)) {
      if (!displayComponentMap.has(component)) {
        console.error(`组件${component}未注册`);
        return undefined;
      }
      Comp = displayComponentMap.get(component);
    } else {
      Comp = component;
    }
    const compAttr = {
      ...getDynamicConfig(componentProps),
      style: getDynamicConfig(componentStyle),
      ref: (el) => {
        emit("formItemInstanceReady", schema.schemaKey, el);
      },
    };
    return componentSlot ? (
      <Comp {...compAttr}>{getDynamicConfig(componentSlot)}</Comp>
    ) : (
      <Comp {...compAttr}></Comp>
    );
  }
  const getDynamicConfig = useGetDynamicConfig<"Display", ExtraRenderParams>(
    renderParams
  );
  const getContent = useContent<"Display", ExtraRenderParams>(
    schema,
    props,
    renderParams,
    getSchemaComponent
  );
  const ifShowOfDynamic = getDynamicConfig(schema.ifShow ?? true);
  return { getDynamicConfig, getContent, ifShowOfDynamic };
}
