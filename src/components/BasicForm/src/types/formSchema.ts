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
export type JavaScriptCode<T> = { code?: string; value?: T };

export type CategoryEnums = "Container" | "Input" | "Display";
// 动态渲染参数

export type RenderParams<
  Category extends CategoryEnums,
  ExtraRenderParams extends Recordable
> = ExtraRenderParams & {
  formValue: Readonly<Recordable>;
  schema: FormSchema<Category, ExtraRenderParams>;
} & (Category extends "Input"
    ? {
        // 可写组件值
        compValue: WritableComputedRef<any>;
      }
    : {});

// 动态配置
export type DynamicConfig<
  Category extends CategoryEnums,
  T,
  ExtraRenderParams extends Recordable
> = T | ((renderParams: RenderParams<Category, ExtraRenderParams>) => T);

type FormSchemaOfPublic<
  Category extends CategoryEnums,
  ExtraRenderParams extends Recordable
> = {
  /**
   * 组件的vueKey 变化后触发vue强制重构组件
   */
  schemaKey?: string;
  ifShow?: DynamicConfig<Category, boolean, ExtraRenderParams>;
  /**
   * 组件自定义渲染函数
   */
  render?: (
    renderParams: RenderParams<Category, ExtraRenderParams>
  ) => VNodeChild;
  /**
   * 组件使用插槽
   */
  slot?: string;

  componentStyle?: DynamicConfig<Category, CSSProperties, ExtraRenderParams>;
  formItemStyle?: DynamicConfig<Category, CSSProperties, ExtraRenderParams>;
  width?: string | number;
};
type FormSchemaOfContainer<ExtraRenderParams extends Recordable> = (
  | ContainerComponentMutableProps<ExtraRenderParams>
  | {
      component: Raw<Component>;
      componentProps?: DynamicConfig<"Container", any, ExtraRenderParams>;
    }
) & {
  category: "Container";
  children: FormSchemas<ExtraRenderParams>;
  componentSlot?: DynamicConfig<
    "Container",
    Recordable<() => VNodeChild>,
    ExtraRenderParams
  >;
};
type FormSchemaOfDisplay<ExtraRenderParams extends Recordable> = (
  | DisplayComponentMutableProps<ExtraRenderParams>
  | {
      component: Raw<Component>;
      componentProps?: DynamicConfig<"Display", any, ExtraRenderParams>;
    }
) & {
  category: "Display";
  componentSlot?: DynamicConfig<
    "Display",
    VNodeChild | Recordable<() => VNodeChild>,
    ExtraRenderParams
  >;
};
type FormSchemaOfInput<ExtraRenderParams extends Recordable> = (
  | InputComponentMutableProps<ExtraRenderParams>
  | {
      component: Raw<Component>;
      componentProps?: DynamicConfig<"Input", any, ExtraRenderParams>;
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
  label?: DynamicConfig<"Input", string, ExtraRenderParams>;

  /**
   * 对应标签渲染函数
   */
  labelRender?: DynamicConfig<"Input", VNodeChild, ExtraRenderParams>;
  labelWidth?: DynamicConfig<"Input", string | number, ExtraRenderParams>;
  labelShow?: DynamicConfig<"Input", boolean, ExtraRenderParams>;
  componentSlot?: DynamicConfig<
    "Input",
    VNodeChild | Recordable<() => VNodeChild>,
    ExtraRenderParams
  >;
};
export type FormSchema<
  Category extends CategoryEnums,
  ExtraRenderParams extends Recordable
> = FormSchemaOfPublic<Category, ExtraRenderParams> &
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
   * 组件宽度
   */
  width?: string;
  /**
   * 子组件
   */
  children?: DesignFormSchema[];
};
