import type { PropertyPath } from "lodash";
import type {
  CSSProperties,
  Component,
  Raw,
  VNodeChild,
  WritableComputedRef,
} from "vue";
import type {
  ContainerComponentMutableProps,
  DisplayComponentMutableProps,
  InputComponentMutableProps,
} from "./componentType";
import type { Recordable } from "@/global";
export type JavaScriptCode<T> =
  | { type: "code"; code?: string }
  | { type: "value"; value?: T };

export type CategoryEnums = "Container" | "Input" | "Display";
// 动态渲染参数

export type RenderParams<ExtraRenderParams extends Recordable> =
  ExtraRenderParams & {
    formValue: Readonly<Recordable>;
    schema:
      | FormSchema<"Display", ExtraRenderParams>
      | FormSchema<"Input", ExtraRenderParams>
      | FormSchema<"Container", ExtraRenderParams>;
    compValue: WritableComputedRef<any>;
  };

// 动态配置
export type DynamicConfig<T, ExtraRenderParams extends Recordable> =
  | T
  | ((renderParams: RenderParams<ExtraRenderParams>) => T);

type FormSchemaOfPublic<ExtraRenderParams extends Recordable> = {
  /**
   * 组件的vueKey 变化后触发vue强制重构组件
   */
  schemaKey?: string;
  ifShow?: DynamicConfig<boolean, ExtraRenderParams>;
  /**
   * 组件自定义渲染函数
   */
  render?: (renderParams: RenderParams<ExtraRenderParams>) => VNodeChild;
  /**
   * 组件使用插槽
   */
  slot?: string;

  componentStyle?: DynamicConfig<CSSProperties, ExtraRenderParams>;
  // formItemProps
};
type FormSchemaOfContainer<ExtraRenderParams extends Recordable> = (
  | ContainerComponentMutableProps<ExtraRenderParams>
  | {
      component: () => Component;
      componentProps?: DynamicConfig<any, ExtraRenderParams>;
    }
) & {
  category: "Container";
  children: FormSchemas<ExtraRenderParams>;
  componentSlot?: DynamicConfig<
    Recordable<() => VNodeChild>,
    ExtraRenderParams
  >;
};
type FormSchemaOfDisplay<ExtraRenderParams extends Recordable> = (
  | DisplayComponentMutableProps<ExtraRenderParams>
  | {
      component: () => Component;
      componentProps?: DynamicConfig<any, ExtraRenderParams>;
    }
) & {
  category: "Display";
  componentSlot?: DynamicConfig<
    Recordable<() => VNodeChild>,
    ExtraRenderParams
  >;
};
type FormSchemaOfInput<ExtraRenderParams extends Recordable> = (
  | InputComponentMutableProps<ExtraRenderParams>
  | {
      component: () => Component;
      componentProps?: DynamicConfig<any, ExtraRenderParams>;
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
  label?: DynamicConfig<string, ExtraRenderParams>;

  /**
   * 对应标签渲染函数
   */
  labelRender?: DynamicConfig<VNodeChild, ExtraRenderParams>;
  labelWidth?: DynamicConfig<string | number, ExtraRenderParams>;
  labelShow?: DynamicConfig<boolean, ExtraRenderParams>;
  componentSlot?: DynamicConfig<
    Recordable<() => VNodeChild>,
    ExtraRenderParams
  >;
};
export type FormSchema<
  Category extends CategoryEnums,
  ExtraRenderParams extends Recordable = {}
> = FormSchemaOfPublic<ExtraRenderParams> &
  (Category extends "Container"
    ? FormSchemaOfContainer<ExtraRenderParams>
    : Category extends "Display"
    ? FormSchemaOfDisplay<ExtraRenderParams>
    : FormSchemaOfInput<ExtraRenderParams>);
export type FormSchemas<ExtraRenderParams extends Recordable> = Array<
  | FormSchema<"Container", ExtraRenderParams>
  | FormSchema<"Input", ExtraRenderParams>
  | FormSchema<"Display", ExtraRenderParams>
>;

export type DesignFormSchema = {
  /**
   * 组件类别    容器|输入|展示
   */
  category?: "Container" | "Input" | "Display";
  /**
   * 组件
   */
  component?: string;
  /**
   * 组件Props
   */
  componentProps?: JavaScriptCode<Recordable>;
  /**
   * 组件样式
   */
  componentStyle?: JavaScriptCode<CSSProperties>;
  /**
   * 配置主键
   */
  id?: string;
  /**
   * 是否显示
   */
  ifShow?: JavaScriptCode<boolean>;
  /**
   * 映射字段（英文，可通过.映射深层属性，如：a.b，但请确保a已声明而非“a is not defined”）
   */
  field?: string;
  /**
   * 对应字段名称（中文）
   */
  label?: JavaScriptCode<string>;
  /**
   * 子组件
   */
  children?: DesignFormSchema[];
};
