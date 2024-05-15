import type { Recordable } from "@/global";
import type { CategoryEnums, DynamicConfig } from ".";
import type {
  ApiSelectProps,
  DatePickerProps,
  EditableTableProps,
  InputNumberProps,
  InputBind,
  SelectProps,
  SwitchProps,
  TableTransferProps,
  BasicButtonProps,
  CardProps,
} from "@/components";

type MutableRecord<
  /**判断key */
  K extends string,
  /**判断类型限制枚举 */
  U extends Recordable<Recordable>
> = {
  [SubType in keyof U]: {
    [A in K]: SubType;
  } & U[SubType];
}[keyof U];

export type ComponentType<Category extends CategoryEnums> =
  Category extends "Container"
    ? "Card"
    : Category extends "Display"
    ? "BasicButton"
    : Category extends "Input"
    ?
        | "Select"
        | "ApiSelect"
        | "Input"
        | "InputNumber"
        | "Switch"
        | "Slider"
        | "DatePicker"
        | "EditableTable"
        | "TableTransfer"
    : never;

export type InputComponentMutableProps = MutableRecord<
  "component",
  {
    Input: { componentProps?: DynamicConfig<"Input", InputBind> };
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
    TableTransfer: {
      componentProps?: DynamicConfig<"Input", TableTransferProps<Recordable>>;
    };
  }
>;

export type DisplayComponentMutableProps = MutableRecord<
  "component",
  {
    BasicButton: {
      componentProps?: DynamicConfig<"Display", BasicButtonProps>;
    };
  }
>;
export type ContainerComponentMutableProps = MutableRecord<
  "component",
  {
    Card: {
      componentProps?: DynamicConfig<"Container", CardProps>;
    };
  }
>;
