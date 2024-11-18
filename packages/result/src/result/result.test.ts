import { describe, expect, it } from "vitest"
import { err, isErr, isOk, ok } from "./result.js"

describe("Result.err", () => {
  it("creates an Err result", () => {
    const e = err("error")

    expect(isOk(e)).toBe(false)
    expect(isErr(e)).toBe(true)

    expect(e).toEqual({
      tag: "Err",
      err: "error",
    })
  })
})

describe("Result.ok", () => {
  it("creates an Ok result", () => {
    const s = ok("success")

    expect(isOk(s)).toBe(true)
    expect(isErr(s)).toBe(false)

    expect(s).toEqual({
      tag: "Ok",
      data: "success",
    })
  })
})
