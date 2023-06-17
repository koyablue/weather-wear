/*
const FOO = {
  foo: 'test',
  bar: 'test2'
} as const;

type Foo = ValueOf<typeof FOO> // 'test' | 'test2'
*/
export type ValueOf<T> = T[keyof T]
