import { describe, expect, it } from "vitest"
import { none, some } from "./option.js"
import { unwrap } from "./unwrap.js"

describe("Option.unwrap", () => {
  it("unwraps Some<T>", () => {
    expect(unwrap(some(5))).toBe(5)
  })

  it("throws unwrapping None", () => {
    expect(() => unwrap(none())).toThrow()
  })
})
