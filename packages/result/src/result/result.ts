export type Err<E> = Readonly<{
  tag: "Err"
  err: E
}>

export type Ok<T> = Readonly<{
  tag: "Ok"
  data: T
}>

export type Result<E, T> = Err<E> | Ok<T>

export function err<E, T>(err: E): Result<E, T> {
  return {
    tag: "Err",
    err,
  }
}

export function ok<E, T>(data: T): Result<E, T> {
  return {
    tag: "Ok",
    data,
  }
}

export function isErr<E, T>(result: Result<E, T>): result is Err<E> {
  return result.tag === "Err"
}

export function isOk<E, T>(result: Result<E, T>): result is Ok<T> {
  return result.tag === "Ok"
}
