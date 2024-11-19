import { purry } from "remeda"
import type { UnaryFn } from "../types.js"
import type { Result } from "./result.js"
import { isOk } from "./result.js"
import { unwrapErr } from "./unwrap-err.js"
import { unwrap } from "./unwrap.js"

export function match<E, T, U>(
  onErr: UnaryFn<E, U>,
  onOk: UnaryFn<T, U>,
): (result: Result<E, T>) => U
export function match<E, T, U>(
  result: Result<E, T>,
  onErr: UnaryFn<E, U>,
  onOk: UnaryFn<T, U>,
): U

export function match(...args: ReadonlyArray<unknown>): unknown {
  return purry(matchImpl, args)
}

function matchImpl<E, T, U>(
  result: Result<E, T>,
  onErr: UnaryFn<E, U>,
  onOk: UnaryFn<T, U>,
) {
  return isOk(result) ? onOk(unwrap(result)) : onErr(unwrapErr(result))
}
