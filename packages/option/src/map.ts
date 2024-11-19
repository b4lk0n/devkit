import { purry } from "remeda"
import type { UnaryFn } from "./types.js"
import type { Option } from "./option.js"
import { isSome, some } from "./option.js"
import { unwrap } from "./unwrap.js"

export function map<T, U>(f: UnaryFn<T, U>): (opt: Option<T>) => Option<U>
export function map<T, U>(opt: Option<T>, f: UnaryFn<T, U>): Option<U>

export function map(...args: ReadonlyArray<unknown>): unknown {
  return purry(mapImpl, args)
}

function mapImpl<T, U>(opt: Option<T>, f: UnaryFn<T, U>) {
  return isSome(opt) ? some(f(unwrap(opt))) : opt
}
