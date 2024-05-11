import { isUndefined, isFunction, get, isString } from "lodash";
import {
  computed,
  unref,
  type ComputedRef,
  type VNodeChild,
  defineComponent,
  type VNode,
  readonly,
  type Component,
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

function useGetDynamicConfig<C extends CategoryEnums>(
  renderParams: ComputedRef<RenderParams<C>>
) {
  function getDynamicConfig<T>(config: DynamicConfig<C, T>): T {
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
function useContent<C extends CategoryEnums>(
  schema: FormSchema<C>,
  props: FormItemProps,
  renderParams: ComputedRef<RenderParams<C>>,
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
  T extends "Container" | "Display" | "Input"
>(schema: any, category: T): schema is FormSchema<T> {
  return schema.category === category;
}

export function useContainerCategory(
  schema: FormSchema<"Container">,
  props: FormItemProps
) {
  const renderParams = computed<RenderParams<"Container">>(() => {
    return {
      formValue: readonly(props.formModel),
    };
  });
  function getSchemaComponent() {
    const { component, componentProps, componentStyle, componentSlot } = schema;
    if (!(component && containerComponentMap.has(component))) {
      console.error(`组件${component}未注册`);
      return undefined;
    }
    const Comp = containerComponentMap.get(component) as ReturnType<
      typeof defineComponent
    >;
    const compAttr = {
      ...getDynamicConfig(componentProps),
      style: getDynamicConfig(componentStyle),
    };
    return componentSlot ? (
      <Comp {...compAttr}>{getDynamicConfig(componentSlot)}</Comp>
    ) : (
      <Comp {...compAttr}></Comp>
    );
  }
  const getDynamicConfig = useGetDynamicConfig<"Container">(renderParams);
  const getContent = useContent<"Container">(
    schema,
    props,
    renderParams,
    getSchemaComponent
  );
  const ifShowOfDynamic = getDynamicConfig(schema.ifShow ?? true);
  return { getDynamicConfig, getContent, ifShowOfDynamic };
}

export function useInputCategory(
  schema: FormSchema<"Input">,
  props: FormItemProps
) {
  const renderParams = computed<RenderParams<"Input">>(() => {
    return {
      compValue: computed({
        get: () => get(props.formModel, schema.field),
        set: (val) => {
          props.setFieldsValue(schema.field, val);
        },
      }),
      formValue: readonly(props.formModel),
    };
  });
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
      Comp = inputComponentMap.get(component) as Component;
    } else {
      Comp = component;
    }

    const compAttr = {
      ...getDynamicConfig(componentProps),
      "style": {
        width: "99%",
        ...getDynamicConfig(componentStyle),
      },
      "modelValue": get(props.formModel, field),
      "onUpdate:modelValue": (val: any) => {
        props.setFieldsValue(field, val);
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
  const getDynamicConfig = useGetDynamicConfig<"Input">(renderParams);
  const getContent = useContent<"Input">(
    schema,
    props,
    renderParams,
    getSchemaComponent
  );
  const ifShowOfDynamic = getDynamicConfig(schema.ifShow ?? true);
  return { getDynamicConfig, getContent, ifShowOfDynamic };
}

export function useDisplayCategory(
  schema: FormSchema<"Display">,
  props: FormItemProps
) {
  const renderParams = computed<RenderParams<"Display">>(() => {
    return {
      formValue: readonly(props.formModel),
    };
  });
  function getSchemaComponent() {
    const { component, componentProps, componentStyle, componentSlot } = schema;
    if (!(component && displayComponentMap.has(component))) {
      console.error(`组件${component}未注册`);
      return undefined;
    }
    if (!displayComponentMap.has(component)) {
      throw new Error(`组件${component}未注册`);
    }
    const Comp = displayComponentMap.get(component) as ReturnType<
      typeof defineComponent
    >;
    const compAttr = {
      ...getDynamicConfig(componentProps),
      style: getDynamicConfig(componentStyle),
    };
    return componentSlot ? (
      <Comp {...compAttr}>{getDynamicConfig(componentSlot)}</Comp>
    ) : (
      <Comp {...compAttr}></Comp>
    );
  }
  const getDynamicConfig = useGetDynamicConfig<"Display">(renderParams);
  const getContent = useContent<"Display">(
    schema,
    props,
    renderParams,
    getSchemaComponent
  );
  const ifShowOfDynamic = getDynamicConfig(schema.ifShow ?? true);
  return { getDynamicConfig, getContent, ifShowOfDynamic };
}
