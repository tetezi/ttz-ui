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

export type InputComponentMutableProps<ExtraRenderParams extends Recordable> =
  MutableRecord<
    "component",
    {
      Input: {
        componentProps?: DynamicConfig<"Input", InputBind, ExtraRenderParams>;
      };
      Select: {
        componentProps?: DynamicConfig<
          "Input",
          SelectProps<Recordable>,
          ExtraRenderParams
        >;
      };
      Switch: {
        componentProps?: DynamicConfig<"Input", SwitchProps, ExtraRenderParams>;
      };
      ApiSelect: {
        componentProps?: DynamicConfig<
          "Input",
          ApiSelectProps<Recordable, Recordable>,
          ExtraRenderParams
        >;
      };
      InputNumber: {
        componentProps?: DynamicConfig<
          "Input",
          InputNumberProps,
          ExtraRenderParams
        >;
      };
      DatePicker: {
        componentProps?: DynamicConfig<
          "Input",
          DatePickerProps,
          ExtraRenderParams
        >;
      };
      EditableTable: {
        componentProps?: DynamicConfig<
          "Input",
          EditableTableProps<Recordable>,
          ExtraRenderParams
        >;
      };
      TableTransfer: {
        componentProps?: DynamicConfig<
          "Input",
          TableTransferProps<Recordable>,
          ExtraRenderParams
        >;
      };
    }
  >;

export type DisplayComponentMutableProps<ExtraRenderParams extends Recordable> = MutableRecord<
  "component",
  {
    BasicButton: {
      componentProps?: DynamicConfig<
        "Display",
        BasicButtonProps,
        ExtraRenderParams
      >;
    };
  }
>;
export type ContainerComponentMutableProps<ExtraRenderParams extends Recordable> = MutableRecord<
  "component",
  {
    Card: {
      componentProps?: DynamicConfig<"Container", CardProps, ExtraRenderParams>;
    };
  }
>;
