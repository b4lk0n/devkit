import { describe, expect, it } from "vitest"
import { none, some } from "./option.js"
import { unwrapOr } from "./unwrap-or.js"

describe("Option.unwrapOr", () => {
  const def = 2

  it("unwraps Some<T>", () => {
    const val = unwrapOr(def)(some(5))
    expect(val).toBe(5)

    const val2 = unwrapOr(some(5), def)
    expect(val2).toBe(5)
  })

  it("returns a default value for None values", () => {
    const val = unwrapOr(def)(none())
    expect(val).toBe(def)

    const val2 = unwrapOr(none(), def)
    expect(val2).toBe(def)
  })
})
