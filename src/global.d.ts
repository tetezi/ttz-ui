/**键名为string类型的对象 */
declare type Recordable<T = any> = Record<string, T>;
/**emit事件简写还原为完整对象事件onEvent */
declare type ShortEventToOnEvent<T extends Recordable> = {
  [K in keyof T as `on${Capitalize<string & K>}`]?: (...args: T[K]) => void;
};
/** 原始类型  */
declare type Primitive =
  | string
  | number
  | boolean
  | bigint
  | symbol
  | undefined
  | null;

/**深层版本的keyof关键字 */
declare type DeepKeyof<T> = T extends object
  ? {
      [K in keyof T]-?: K extends string | number
        ? `${K}` | `${K}.${DeepKeyof<T[K]>}`
        : never;
    }[keyof T]
  : never;

/**压缩类型推断范围 */
declare type Narrow<T> = T extends []
  ? []
  : {
      [K in keyof T]: T[K] extends Primitive ? T[K] : Narrow<T[K]>;
    };

/** 动态对象类型限制 */
declare type MutableRecord<
  /**判断key */
  K extends string,
  /**判断类型限制枚举 */
  U extends Recordable<Recordable>,
  /**扩展通用属性 */
  E extends Recordable = {}
> = {
  [SubType in keyof U]: {
    [A in K]: SubType;
  } & U[SubType] &
    E;
}[keyof U];

// 数组展开一级
declare type Flatten<T> = T extends (infer U)[] ? U : never;

/**可空 */
declare type Nullable<T> = T | null;

/**YYYY-MM-DD日期格式的字符串  */
declare type StringOfDate = string;
/**YYYY-MM-DD HH:mm:ss日期时间格式的字符串  */
declare type StringOfDateTime = string;

/**UUID格式字符串 */
declare type UUID = string;

declare type MaybePromise<T = any> = T | Promise<T>;
declare type MaybeArray<T = any> = T | Array<T>;
