import { describe, expect, it } from "vitest"
import { isNone, isSome, none, some } from "./option.js"

describe("Option.none", () => {
  it("creates a None value", () => {
    const opt = none()

    expect(isNone(opt)).toBe(true)
    expect(isSome(opt)).toBe(false)

    expect(opt).toEqual({
      tag: "None",
    })
  })
})

describe("Option.some", () => {
  it("creates a Some value", () => {
    const opt = some("has value")

    expect(isNone(opt)).toBe(false)
    expect(isSome(opt)).toBe(true)

    expect(opt).toEqual({
      tag: "Some",
      data: "has value",
    })
  })
})
