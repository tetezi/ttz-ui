import type { CategoryEnums } from ".";

export type ComponentType<Category extends CategoryEnums> =
  Category extends "Container"
    ? ""
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
    : never;
