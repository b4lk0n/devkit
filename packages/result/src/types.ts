export type Sink<T> = (v: T) => void
export type Thunk<T> = () => T
export type UnaryFn<T, U> = (v: T) => U
