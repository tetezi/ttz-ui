import type { PropertyPath } from "lodash";
import type { VNodeChild, WritableComputedRef } from "vue";
import type { ComponentType } from "./componentType";
import type {
  ApiSelectProps,
  DatePickerProps,
  EditableTableProps,
  InputNumberProps,
  InputProps,
  SelectProps,
  SwitchProps,
} from "@/components";
export type CategoryEnums = "Container" | "Input" | "Display";
// 动态渲染参数
export type RenderParams<Category extends CategoryEnums> =
  {} & (Category extends "Input"
    ? {
        // 可写组件值
        compValue: WritableComputedRef<any>;
      }
    : {});
// 动态配置
export type DynamicConfig<Category extends CategoryEnums, T> =
  | T
  | ((renderParams: RenderParams<Category>) => T);

export type InputComponentMutableProps = MutableRecord<
  "component",
  {
    Input: { componentProps?: DynamicConfig<"Input", InputProps> };
    Select: {
      componentProps?: DynamicConfig<"Input", SelectProps<Recordable>>;
    };
    Switch: {
      componentProps?: DynamicConfig<"Input", SwitchProps>;
    };
    ApiSelect: {
      componentProps?: DynamicConfig<
        "Input",
        ApiSelectProps<Recordable, Recordable>
      >;
    };
    InputNumber: { componentProps?: DynamicConfig<"Input", InputNumberProps> };
    DatePicker: { componentProps?: DynamicConfig<"Input", DatePickerProps> };
    EditableTable: {
      componentProps?: DynamicConfig<"Input", EditableTableProps<Recordable>>;
    };
  }
>;
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
type FormSchemaOfInput = InputComponentMutableProps & {
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
