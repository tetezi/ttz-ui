import type { TableColumn, TableProps } from "@/components";
import type { FormSchema } from "@/components/BasicForm";
import type { MaybeRefOrGetter } from "vue";
export type EditableTableRednerParams<Data extends Recordable> = {
  row: Partial<Data>;
  cellValue: any;
  index: number;
  setRowFieldValue: (key: keyof Partial<Data>, value: any) => void;
  setRowValue: (value: Partial<Data>) => void;
};
export type EditableTableColumn<Data extends Recordable> = {
  required?: boolean;
  hide?: boolean | ((rednerParams: EditableTableRednerParams<Data>) => boolean);
  prop: string;
  editConfig?:
    | ((rednerParams: EditableTableRednerParams<Data>) => Omit<
        FormSchema<any>,
        "field" | "label" | "labelWidth" | "labelShow"
        // | "component"
        // | "componentProps"
      >)
    | false
    | Omit<
        FormSchema<any>,
        "field" | "label" | "labelWidth" | "labelShow"
        // | "component"
        // | "componentProps"
      >;
} & Omit<TableColumn<Data>, "prop">;

export type EditableTableProps<Data extends Recordable> = Omit<TableProps<Data>,'columns'> & {
  columns: MaybeRefOrGetter<Array<EditableTableColumn<Data>>>;
};

export type EditableTableShortEvent<Data extends Recordable> = {};

export type EditableTableEventObject<Data extends Recordable> =
  ShortEventToOnEvent<EditableTableShortEvent<Data>>;

export type EditableTableBind<Data extends Recordable> =
  EditableTableProps<Data> & EditableTableEventObject<Data>;
