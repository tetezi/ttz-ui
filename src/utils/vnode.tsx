import { isFunction } from "lodash";
import type { Slots, Slot, VNode } from "vue";
/**
 * 获取插槽内容
 */
export function getSlot(
  slots: Slots,
  slot = "default",
  data?: any
): VNode[] | null {
  if (!slots || !Reflect.has(slots, slot)) {
    return null;
  }
  if (!isFunction(slots[slot])) {
    console.error(`${slot} 需传递插槽函数`);
    return null;
  }
  const slotFn = slots[slot];
  if (!slotFn) return null;
  return slotFn(data);
}
