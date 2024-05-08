import { getSlot } from "@/utils";
import { computed, unref } from "vue";

export function useDialogSlots<Data>(getProps, slots) {
  function getDialogSlot(name: "header" | "body" | "footer") {
    const { bodyRender, headerRender, footerRender, data } = unref(getProps);
    if (name === "header") {
      return () =>
        headerRender
          ? headerRender(data as Data)
          : getSlot(slots, name, data as Data) || unref(getProps).title;
    } else if (name === "body") {
      return () =>
        bodyRender
          ? bodyRender(data as Data)
          : getSlot(slots, "default", data as Data);
    } else if (name === "footer") {
      return () =>
        footerRender
          ? footerRender(data as Data)
          : getSlot(slots, name, data as Data);
    }
  }
  return {
    headerSlotVNode: computed(() => getDialogSlot("header")),
    defaultSlotVNode: computed(() => getDialogSlot("body")),
    footerSlotVNode: computed(() => getDialogSlot("footer")),
  };
}
