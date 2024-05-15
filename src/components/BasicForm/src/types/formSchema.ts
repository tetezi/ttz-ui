import type { PropertyPath } from "lodash";
import type {
  CSSProperties,
  Component,
  Raw,
  VNodeChild,
  WritableComputedRef,
} from "vue";
import type {
  ComponentType,
  ContainerComponentMutableProps,
  DisplayComponentMutableProps,
  InputComponentMutableProps,
} from "./componentType";
import type { Recordable } from "@/global";

export type CategoryEnums = "Container" | "Input" | "Display";
// 动态渲染参数
export type RenderParams<Category extends CategoryEnums> = {
  formValue: Readonly<Recordable>;
} & (Category extends "Input"
  ? {
      // 可写组件值
      compValue: WritableComputedRef<any>;
    }
  : {});
// 动态配置
export type DynamicConfig<Category extends CategoryEnums, T> =
  | T
  | ((renderParams: RenderParams<Category>) => T);

type FormSchemaOfPublic<Category extends CategoryEnums> = {
  /**
   * 组件的vueKey 变化后触发vue强制重构组件
   */
  schemaKey?: string;
  ifShow?: DynamicConfig<Category, boolean>;
  /**
   * 组件自定义渲染函数
   */
  render?: (renderParams: RenderParams<Category>) => VNodeChild;
  /**
   * 组件使用插槽
   */
  slot?: string;

  componentStyle?: DynamicConfig<Category, CSSProperties>;
};
type FormSchemaOfContainer = (
  | ContainerComponentMutableProps
  | {
      component: Raw<Component>;
      componentProps?: DynamicConfig<"Container", any>;
    }
) & {
  category: "Container";
  children: FormSchemas;
  componentSlot?: DynamicConfig<"Container", Recordable<() => VNodeChild>>;
};
type FormSchemaOfDisplay = (
  | DisplayComponentMutableProps
  | {
      component: Raw<Component>;
      componentProps?: DynamicConfig<"Display", any>;
    }
) & {
  category: "Display";
  componentSlot?: DynamicConfig<
    "Display",
    VNodeChild | Recordable<() => VNodeChild>
  >;
};
type FormSchemaOfInput = (
  | InputComponentMutableProps
  | {
      component: Raw<Component>;
      componentProps?: DynamicConfig<"Input", any>;
    }
) & {
  category?: "Input";
  /**
   * 映射字段
   */
  field: PropertyPath;
  /**
   * 对应标签文本
   */
  label?: DynamicConfig<"Input", string>;

  /**
   * 对应标签渲染函数
   */
  labelRender?: DynamicConfig<"Input", VNodeChild>;
  labelWidth?: DynamicConfig<"Input", string | number>;
  labelShow?: DynamicConfig<"Input", boolean>;
  componentSlot?: DynamicConfig<
    "Input",
    VNodeChild | Recordable<() => VNodeChild>
  >;
};
export type FormSchema<Category extends CategoryEnums> =
  FormSchemaOfPublic<Category> &
    (Category extends "Container"
      ? FormSchemaOfContainer
      : Category extends "Display"
      ? FormSchemaOfDisplay
      : FormSchemaOfInput);
export type FormSchemas = Array<
  FormSchema<"Container"> | FormSchema<"Input"> | FormSchema<"Display">
>;
