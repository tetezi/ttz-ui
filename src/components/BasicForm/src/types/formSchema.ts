import type { PropertyPath } from "lodash";
import type { VNodeChild, WritableComputedRef } from "vue"; 
import type { ComponentType } from "./componentType";
export type CategoryEnums = "Container" | "Input" | "Display"
// 动态渲染参数
export type RenderParams<Category extends CategoryEnums> =
  {} & (Category extends "Input"
    ? {
        // 可写组件值
        compValue: WritableComputedRef<any>;
      }
    : {});
// 动态配置
export type DynamicConfig<
  Category extends CategoryEnums,
  T
> = T | ((renderParams: RenderParams<Category>) => T);

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
  componentSlot?: DynamicConfig<
    Category,
    VNodeChild | Recordable<() => VNodeChild>
  >;
};
type FormSchemaOfContainer = {
  category: "Container";
  /**
   * 预设组件
   */
  component?: ComponentType<"Container">;
  componentProps?: DynamicConfig<"Container", Recordable>;
};
type FormSchemaOfDisplay = {
  category: "Display";
  /**
   * 预设组件
   */
  component?: ComponentType<"Display">;
  componentProps?: DynamicConfig<"Display", Recordable>;
};
type FormSchemaOfInput = {
  category?: "Input";
  /**
   * 预设组件
   */
  component?: ComponentType<"Input">;
  componentProps?: DynamicConfig<"Input", Recordable>;
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
};
export type FormSchema<Category extends CategoryEnums> =
  FormSchemaOfPublic<Category> &
    (Category extends "Container"
      ? FormSchemaOfContainer
      : Category extends "Display"
      ? FormSchemaOfDisplay
      : FormSchemaOfInput);
// export type FormSchema<Category extends CategoryEnums> = {
//   /**
//    * 组件的vueKey 变化后触发vue强制重构组件
//    */
//   schemaKey?: string;
//   ifShow?: DynamicConfig<Category, boolean>;
//   /**
//    * 组件自定义渲染函数
//    */
//   render?: (renderParams: RenderParams<Category>) => VNodeChild;
//   /**
//    * 组件使用插槽
//    */
//   slot?: string;
//   componentSlot?: DynamicConfig<
//     Category,
//     VNodeChild | Recordable<() => VNodeChild>
//   >;
// } & (Category extends "Container"
//   ? {
//       category: "Container";
//       /**
//        * 预设组件
//        */
//       component?: ComponentType<"Container">;
//       componentProps?: DynamicConfig<"Container", Recordable>;
//     }
//   : Category extends "Display"
//   ? {
//       category: "Display";
//       /**
//        * 预设组件
//        */
//       component?: ComponentType<"Display">;
//       componentProps?: DynamicConfig<"Display", Recordable>;
//     }
//   : Category extends "Input"
//   ? {
//       category?: "Input";
//       /**
//        * 预设组件
//        */
//       component?: ComponentType<"Input">;
//       componentProps?: DynamicConfig<"Input", Recordable>;
//       /**
//        * 映射字段
//        */
//       field: PropertyPath;
//       /**
//        * 对应标签文本
//        */
//       label?: DynamicConfig<Category, string>;

//       /**
//        * 对应标签渲染函数
//        */
//       labelRender?: DynamicConfig<Category, VNodeChild>;
//       labelWidth?: DynamicConfig<Category, string | number>;
//       labelShow?: DynamicConfig<Category, boolean>;
//     }
//   : never);
export type FormSchemas = Array<
  FormSchema<"Container"> | FormSchema<"Input"> | FormSchema<"Display">
>;
