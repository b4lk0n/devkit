import { purry } from "remeda"
import type { UnaryFn } from "../types.js"
import type { Result } from "./result.js"
import { err, isErr } from "./result.js"
import { unwrapErr } from "./unwrap-err.js"

export function mapErr<E, T, F>(
  fn: UnaryFn<E, F>,
): (result: Result<E, T>) => Result<F, F>
export function mapErr<E, T, F>(
  result: Result<E, T>,
  fn: UnaryFn<E, F>,
): Result<F, T>

export function mapErr(...args: ReadonlyArray<unknown>): unknown {
  return purry(mapErrImpl, args)
}

function mapErrImpl<E, T, F>(result: Result<E, T>, fn: UnaryFn<E, F>) {
  return isErr(result) ? err(fn(unwrapErr(result))) : result
}
