import type { Recordable } from "@/global";
import type { GetTableProps, TableColumn, TableShortEvent } from "../types";
import { unref, computed, toValue, ref, type ComputedRef, type Ref } from "vue";
import { get } from "lodash";
export function useTableSelect<Data extends Recordable>(
  getProps: GetTableProps<Data>,
  getData: ComputedRef<Data[]>,
  emitEvent: (key: keyof TableShortEvent<Data>, ...args: any[]) => void
) {
  const selectRows:Ref<Data[]> = ref([]);
  function getSelectRowIndex(row: Data) {
    const { rowKey } = unref(getProps);
    return unref(selectRows).findIndex((val) => {
      if (rowKey) {
        return get(val, rowKey) === get(row, rowKey);
      } else {
        return val === row;
      }
    });
  }
  function selectRow(row) {
    const { selectType } = unref(getProps);
    if (getSelectRowIndex(row) === -1) {
      if (toValue(selectType) === "Check") {
        unref(selectRows).push(row);
      } else if (toValue(selectType) === "Select") {
        setSelectRows([row]);
      }
      emitEvent("selectRow", row, unref(getSelectRows));
    }
  }
  function unSelectRow(row) {
    const { selectType } = unref(getProps);
    const index = getSelectRowIndex(row);
    if (index !== -1) {
      if (toValue(selectType) === "Check") {
        unref(selectRows).splice(index, 1);
      } else if (toValue(selectType) === "Select") {
        setSelectRows([]);
      }
    }
  }
  function setSelectRows(rows) {
    selectRows.value = rows;
  }
  const getSelectRows = computed(() => {
    return unref(selectRows);
  });
  const selectColumn = computed<TableColumn<Data>>(() => {
    const { selectType } = unref(getProps);
    return {
      columnKey: "_select",
      formatter: (row) => {
        if (toValue(selectType) === "Select") {
          return (
            <el-radio
              modelValue={getSelectRowIndex(row) !== -1}
              value={true}
              onChange={() => {
                selectRow(row);
              }}
            ></el-radio>
          );
        } else if (toValue(selectType) === "Check") {
          return (
            <div>
              <el-checkbox
                modelValue={getSelectRowIndex(row) !== -1}
                onChange={(val) => {
                  if (val) {
                    selectRow(row);
                  } else {
                    unSelectRow(row);
                  }
                }}
              ></el-checkbox>
            </div>
          );
        }
        return <span></span>;
      },
      isHideColumn: !toValue(selectType),
      renderHeader: () => {
        if (toValue(selectType) === "Select") {
          return <span> </span>;
        } else if (toValue(selectType) === "Check") {
          const selectCount = unref(getSelectRows).length;
          const pageData = unref(getData);
          return (
            <div>
              <el-tooltip placement="right">
                {{
                  default: () => (
                    <el-checkbox
                      indeterminate={
                        selectCount !==0 && selectCount !== pageData.length
                      }
                      modelValue={
                        pageData.length !== 0 && selectCount === pageData.length
                      }
                      onChange={(val) => {
                        if (val) {
                          selectAllRow();
                        } else {
                          setSelectRows([]);
                        }
                      }}
                    ></el-checkbox>
                  ),
                  content: () => {
                    return (
                      <div>{`当前已选择${selectCount}/${pageData.length}`}</div>
                    );
                  },
                }}
              </el-tooltip>
            </div>
          );
        } else {
          return <span></span>;
        }
      },
      width: 50,
    };
  });
  function selectAllRow() {
    const pageData = unref(getData);
    pageData.forEach((row) => {
      selectRow(row);
    });
  }
  function clearSelectRows() {
    setSelectRows([]);
  }
  return {
    selectRow,
    selectAllRow,
    unSelectRow,
    setSelectRows,
    getSelectRows,
    selectColumn,
    clearSelectRows,
  };
}
