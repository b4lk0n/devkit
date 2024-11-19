import { purry } from "remeda"
import type { Thunk, UnaryFn } from "./types.js"
import type { Option } from "./option.js"
import { isSome, some } from "./option.js"
import { unwrap } from "./unwrap.js"

export function mapOrElse<T, U>(
  def: Thunk<U>,
  f: UnaryFn<T, U>,
): (opt: Option<T>) => Option<U>
export function mapOrElse<T, U>(
  opt: Option<T>,
  def: Thunk<U>,
  f: UnaryFn<T, U>,
): Option<U>

export function mapOrElse(...args: ReadonlyArray<unknown>): unknown {
  return purry(mapOrElseImpl, args)
}

function mapOrElseImpl<T, U>(opt: Option<T>, def: Thunk<U>, f: UnaryFn<T, U>) {
  return some(isSome(opt) ? f(unwrap(opt)) : def())
}
