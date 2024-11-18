import { purry } from "remeda"
import type { UnaryFn } from "../types.js"
import type { Result } from "./result.js"
import { isOk, ok } from "./result.js"
import { unwrap } from "./unwrap.js"

export function map<E, T, U>(
  fn: UnaryFn<T, U>,
): (result: Result<E, T>) => Result<E, U>
export function map<E, T, U>(
  result: Result<E, T>,
  fn: UnaryFn<T, U>,
): Result<E, U>

export function map(...args: ReadonlyArray<unknown>): unknown {
  return purry(mapImpl, args)
}

export function mapImpl<E, T, U>(result: Result<E, T>, fn: UnaryFn<T, U>) {
  return isOk(result) ? ok(fn(unwrap(result))) : result
}
