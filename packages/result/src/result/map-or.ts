import { purry } from "remeda"
import type { UnaryFn } from "../types.js"
import type { Result } from "./result.js"
import { isOk, ok } from "./result.js"
import { unwrap } from "./unwrap.js"

export function mapOr<E, T, U>(
  def: U,
  fn: UnaryFn<T, U>,
): (result: Result<E, T>) => Result<E, U>
export function mapOr<E, T, U>(
  result: Result<E, T>,
  def: U,
  fn: UnaryFn<T, U>,
): Result<E, U>

export function mapOr(...args: ReadonlyArray<unknown>): unknown {
  return purry(mapOrImpl, args)
}

function mapOrImpl<E, T, U>(result: Result<E, T>, def: U, fn: UnaryFn<T, U>) {
  return ok(isOk(result) ? fn(unwrap(result)) : def)
}
