import { ref, type Component } from "vue";
import type { ComponentType } from "./types/componentType";

import { Card } from "@/components/Card";
import { Radio } from "@/components/Radio";
import { Select } from "@/components/Select";
import { InputNumber } from "@/components/InputNumber";
import { Slider } from "@/components/Slider";
import { Switch } from "@/components/Switch";
import { ApiSelect } from "@/components/ApiSelect";
import { DatePicker } from "@/components/DatePicker";
import { Input } from "@/components/Input";
import { BasicButton } from "@/components/BasicButton";
import { EditableTable } from "@/components/EditableTable";
import { TableTransfer } from "@/components/TableTransfer";
import { Row } from "@/components/Row";
export const inputComponentMap = new Map<ComponentType<"Input">, Component>([
  ["Radio", Radio],
  ["Select", Select],
  ["ApiSelect", ApiSelect],
  ["Input", Input],
  ["InputNumber", InputNumber],
  ["Slider", Slider],
  ["Switch", Switch],
  ["DatePicker", DatePicker],
  ["EditableTable", EditableTable],
  ["TableTransfer", TableTransfer],
]);
export const containerComponentMap = new Map<
  ComponentType<"Container">,
  Component
>([
  ["Card", Card],
  ["Row", Row],
]);
export const displayComponentMap = new Map<ComponentType<"Display">, Component>(
  [["BasicButton", BasicButton]]
);
export const injectComponentMap = ref(new Map())
// export function getComponent<C extends CategoryEnums>(schema: FormSchema<C>) {
//   if (checkSchemaCategory(schema, "Container")) {
//     return schema.component
//       ? containerComponentMap.get(schema.component)
//       : null;
//   } else if (checkSchemaCategory(schema, "Input")) {
//     return schema.component ? inputComponentMap.get(schema.component) : null;
//   } else if (checkSchemaCategory(schema, "Display")) {
//     return schema.component ? displayComponentMap.get(schema.component) : null;
//   } else {
//     return null;
//   }
// }
