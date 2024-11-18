import { describe, expect, it } from "vitest"
import { err, ok } from "./result.js"
import { unwrapOrElse } from "./unwrap-or-else.js"

describe("Result.unwrapOrElse", () => {
  const def = () => 5

  it("unwraps Ok<T>", () => {
    const val = unwrapOrElse(def)(ok(2))
    expect(val).toBe(2)

    const val2 = unwrapOrElse(ok(2), def)
    expect(val2).toBe(2)
  })

  it("returns a result of a default function for Err<E>", () => {
    const val = unwrapOrElse(def)(err("oops"))
    expect(val).toBe(5)

    const val2 = unwrapOrElse(err("oops"), def)
    expect(val2).toBe(5)
  })
})
