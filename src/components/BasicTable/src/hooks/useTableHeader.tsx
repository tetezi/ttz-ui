import { BasicButton } from "@/components";
import { computed, toValue, unref } from "vue";
import type { GetTableProps } from "../types";
import type { Recordable } from "@/global";
import { isString } from "lodash";

export function useTableHeader<Data extends Recordable>(
  getProps: GetTableProps<Data>,
  reload
) {
  const getHeaderVNode = computed(() => {
    const { api, title, headerActionRender } = unref(getProps);
    const titleVNode = toValue(title);
    return (
      <div style="display: flex;margin:5px 10px">
        <div
          style={{
            flex: 1,
            ...(isString(titleVNode)
              ? {
                  fontSize: "20px",
                  lineHeight: "32px",
                  fontWeight: "600",
                  fontFamily: "Inter",
                }
              : {}),
          }}
        >
          {titleVNode}
        </div>
        <div style="flex:0">{toValue(headerActionRender)}</div>
        <div style="flex:0;margin:0 5px">
          {api ? (
            <BasicButton
              icon="Refresh"
              func={reload}
              text
            ></BasicButton>
          ) : undefined}
        </div>
      </div>
    );
  });
  return {
    getHeaderVNode,
  };
}
