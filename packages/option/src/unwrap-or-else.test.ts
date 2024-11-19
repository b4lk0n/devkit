import { describe, expect, it } from "vitest"
import { none, some } from "./option.js"
import { unwrapOrElse } from "./unwrap-or-else.js"

describe("Option.unwrapOrElse", () => {
  const def = () => 5

  it("unwraps Some<T>", () => {
    const val = unwrapOrElse(def)(some(2))
    expect(val).toBe(2)

    const val2 = unwrapOrElse(some(2), def)
    expect(val2).toBe(2)
  })

  it("returns a result of a default function for None values", () => {
    const val = unwrapOrElse(def)(none())
    expect(val).toBe(5)

    const val2 = unwrapOrElse(none(), def)
    expect(val2).toBe(5)
  })
})
