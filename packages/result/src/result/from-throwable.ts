import { purry } from "remeda"
import type { Thunk, UnaryFn } from "../types.js"
import type { Result } from "./result.js"
import { err, ok } from "./result.js"

export function fromThrowable<E, T>(
  onThrow: UnaryFn<unknown, E>,
): (fn: Thunk<T>) => Result<E, T>
export function fromThrowable<E, T>(
  fn: Thunk<T>,
  onThrow: UnaryFn<unknown, E>,
): Result<E, T>

export function fromThrowable(...args: ReadonlyArray<unknown>) {
  return purry(tryCatchImpl, args)
}

function tryCatchImpl<E, T>(fn: Thunk<T>, onThrow: UnaryFn<unknown, E>) {
  try {
    return ok(fn())
  } catch (e) {
    return err(onThrow(e))
  }
}
