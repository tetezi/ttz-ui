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
  RadioProps,
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
        | "Radio"
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
        componentProps?: DynamicConfig<InputBind, ExtraRenderParams>;
      };
      Radio: {
        componentProps?: DynamicConfig<
          RadioProps<Recordable>,
          ExtraRenderParams
        >;
      };
      Select: {
        componentProps?: DynamicConfig<
          SelectProps<Recordable>,
          ExtraRenderParams
        >;
      };
      Switch: {
        componentProps?: DynamicConfig<SwitchProps, ExtraRenderParams>;
      };
      ApiSelect: {
        componentProps?: DynamicConfig<
          ApiSelectProps<Recordable, Recordable>,
          ExtraRenderParams
        >;
      };
      InputNumber: {
        componentProps?: DynamicConfig<InputNumberProps, ExtraRenderParams>;
      };
      DatePicker: {
        componentProps?: DynamicConfig<DatePickerProps, ExtraRenderParams>;
      };
      EditableTable: {
        componentProps?: DynamicConfig<
          EditableTableProps<Recordable>,
          ExtraRenderParams
        >;
      };
      TableTransfer: {
        componentProps?: DynamicConfig<
          TableTransferProps<Recordable>,
          ExtraRenderParams
        >;
      }; 
    }
  >;

export type DisplayComponentMutableProps<ExtraRenderParams extends Recordable> =
  MutableRecord<
    "component",
    {
      BasicButton: {
        componentProps?: DynamicConfig<BasicButtonProps, ExtraRenderParams>;
      };
    }
  >;
export type ContainerComponentMutableProps<
  ExtraRenderParams extends Recordable
> = MutableRecord<
  "component",
  {
    Card: {
      componentProps?: DynamicConfig<CardProps, ExtraRenderParams>;
    };
  }
>;
