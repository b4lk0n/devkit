import { describe, expect, it, test } from "vitest"
import { fromNullable } from "./from-nullable.js"
import { isNone } from "./option.js"
import { unwrap } from "./unwrap.js"

describe("Option.fromNullable", () => {
  it("creates None from nullables", () => {
    const opt = fromNullable(null)
    expect(isNone(opt)).toBe(true)
  })

  const nonNullish = [0, -1, 5, false, Number.NaN, "", "hello"]
  test.each(nonNullish)("creates Some<T> from %p", (val) => {
    const opt = fromNullable(val)
    expect(unwrap(opt)).toBe(val)

    const opt2 = fromNullable(undefined)
    expect(unwrap(opt2)).toBe(undefined)
  })
})
