import { describe, expect, it } from "vitest"
import { err, ok } from "./result.js"
import { unwrap } from "./unwrap.js"

describe("Result.unwrap", () => {
  it("unwraps Ok<T>", () => {
    expect(unwrap(ok(5))).toBe(5)
  })

  it("throws unwrapping Err<E>", () => {
    expect(() => unwrap(err("oops"))).toThrow()
  })
})
