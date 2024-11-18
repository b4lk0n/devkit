import { describe, expect, it } from "vitest"
import { err, ok } from "./result.js"
import { unwrapOr } from "./unwrap-or.js"

describe("Result.unwrapOr", () => {
  const def = 2

  it("unwraps Ok<T>", () => {
    const val = unwrapOr(def)(ok(5))
    expect(val).toBe(5)

    const val2 = unwrapOr(ok(5), def)
    expect(val2).toBe(5)
  })

  it("returns a default value for Err<E>", () => {
    const val = unwrapOr(def)(err("oops"))
    expect(val).toBe(def)

    const val2 = unwrapOr(err("oops"), def)
    expect(val2).toBe(def)
  })
})
