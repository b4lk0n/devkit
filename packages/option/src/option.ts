type None = Readonly<{
  tag: "None"
}>

type Some<T> = Readonly<{
  tag: "Some"
  data: T
}>

export type Option<T> = None | Some<T>

export const none = (): Option<never> => ({ tag: "None" })
export const isNone = (opt: Option<unknown>): opt is None => opt.tag === "None"

export const some = <T>(data: T): Option<T> => ({ tag: "Some", data })
export const isSome = <T>(opt: Option<T>): opt is Some<T> => opt.tag === "Some"
