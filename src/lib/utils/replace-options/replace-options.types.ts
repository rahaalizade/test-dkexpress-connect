export type ReplaceOptionsObjectType<T> =
  T extends `${infer L}{${infer V}}${infer R}`
    ? Record<V, unknown> &
        (ReplaceOptionsObjectType<`${L}${R}`> extends never
          ? Record<never, never>
          : ReplaceOptionsObjectType<`${L}${R}`>)
    : never;

export type ReplaceOptionsType = <T extends string>(
  text: T,
  options?: ReplaceOptionsObjectType<T>,
) => string;
