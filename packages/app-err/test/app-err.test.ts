import { describe, expect, it } from "vitest"
import { createErrors } from "../src/index.js"

describe("createErrors", () => {
  it("creates errors function", () => {
    const errors = createErrors({
      TestErr: "This is a test error",
      NotFoundErr: "Something was not found",
    })

    expect(errors).toHaveProperty("TestErr")
    expect(errors).toHaveProperty("NotFoundErr")

    const testErr = errors("TestErr")

    expect(testErr).toMatchObject({
      code: "TestErr",
      msg: "This is a test error",
    })

    const notFoundErr = errors("NotFoundErr")

    expect(notFoundErr).toMatchObject({
      code: "NotFoundErr",
      msg: "Something was not found",
    })

    const unknownCode = "UnknownCode"
    expect(() => {
      // @ts-expect-error - ignore type safety for tests
      errors(unknownCode)
    }).toThrowError(unknownCode)

    const wrapped = errors.wrap("TestErr")(new Error("inner"))
    expect(wrapped.code).toBe("TestErr")
    expect(wrapped.cause).toBeInstanceOf(Error)
    expect(wrapped.cause).toHaveProperty("message", "inner")

    expect(() => {
      // @ts-expect-error
      errors.wrap(unknownCode)()
    }).toThrowError(unknownCode)

    const coerced = errors.coerce("NotFoundErr")(testErr)
    expect(coerced.code).toBe("TestErr")
    expect(coerced.cause).toBeUndefined()
    expect(coerced.msg).toBe("This is a test error")

    expect(() => {
      // @ts-expect-error
      errors.coerce(unknownCode)()
    }).toThrowError(unknownCode)

    const coerced2 = errors.coerce("NotFoundErr")(new Error("inner"))
    expect(coerced2.code).toBe("NotFoundErr")
    expect(coerced2.cause).toBeInstanceOf(Error)
    expect(coerced2.cause).toHaveProperty("message", "inner")
  })
})
