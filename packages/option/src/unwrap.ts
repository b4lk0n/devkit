import { type Option, isSome } from "./option.js"

export function unwrap<T>(opt: Option<T>): T {
  if (isSome(opt)) {
    return opt.data
  }

  throw new Error("Cannot unwrap a None value")
}
