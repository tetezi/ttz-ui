/**
 * 声明数组数据收窄自动推断类型为元组
 */
export function narrow<T>(val: Narrow<T>): T {
  return val as T;
} 