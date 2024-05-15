import type { Recordable } from "@/global";
import { unref, type Ref } from "vue";
import type { GetTableProps } from "../types";
import type { GetModelValue, SetModelValue } from "@/utils";
import { get, isString } from "lodash";

export function useDataManipulator<Data extends Recordable>(
  getProps: GetTableProps<Data>,
  localModelValue: Ref<Data[]>
) {
  function getTableRowIndex(row: Data | string) {
    const rowKey = unref(getProps).rowKey;
    if (isString(row) && !rowKey) {
      return -1;
    }
    return unref(localModelValue).findIndex((val) => {
      if (rowKey) {
        return get(val, rowKey) === (isString(row) ? row : get(row, rowKey));
      } else {
        return val === row;
      }
    });
  }
  function pushTableRow(data: Data) {
    unref(localModelValue).push(data);
  }
  function unshiftTableRow(data: Data) {
    unref(localModelValue).unshift(data);
  }
  function deleteTableRow(row: Data | string) {
    const index = getTableRowIndex(row);
    unref(localModelValue).splice(index, 1);
  }
  function updateTableRow(rowKey: string, newRow: Data) {
    const index = getTableRowIndex(rowKey);
    unref(localModelValue).splice(index, 0, newRow);
  }
  return {
    getTableRowIndex,
    pushTableRow,
    unshiftTableRow,
    deleteTableRow,
    updateTableRow,
  };
}
