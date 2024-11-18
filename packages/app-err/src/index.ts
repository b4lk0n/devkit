export type AppErr<C = string, M = string> = {
  tag: "AppErr"
  code: C
  msg: M
  cause?: unknown
}

function hasOwn<T extends object, K extends PropertyKey>(
  obj: T,
  key: K,
): obj is T & Record<K, unknown> {
  return Object.hasOwn(obj, key)
}

export function isAppErr<C = string, M = string>(
  err: unknown,
): err is AppErr<C, M> {
  return (
    typeof err === "object" &&
    err !== null &&
    hasOwn(err, "tag") &&
    err.tag === "AppErr"
  )
}

type ErrMapping<T extends string> = {
  [key in T]: string
}

type ErrFn<T extends ErrMapping<string>> = {
  <C extends keyof T>(code: C, cause?: unknown): AppErr<C, T[C]>

  wrap: <C extends keyof T>(code: C) => (cause: unknown) => AppErr<C, T[C]>

  coerce: <C extends Extract<keyof T, string>>(
    code: C,
  ) => (err: unknown) => AppErr<C, T[C]>
} & {
  [TKey in keyof T]: TKey
}

function createError<C = string, M = string>(
  code: C,
  msg: M,
  cause?: unknown,
): AppErr<C, M> {
  return {
    tag: "AppErr",
    code,
    msg,
    cause,
  }
}

export function createErrors<T extends ErrMapping<string>>(
  mapping: T,
): ErrFn<T> {
  const errFn = <C extends keyof T>(
    code: C,
    cause?: unknown,
  ): AppErr<C, T[C]> => {
    const msg = mapping[code]

    if (!msg) {
      throw new Error(`Unknown error code: ${String(code)}`)
    }

    return createError(code, msg, cause)
  }

  errFn.wrap = <C extends keyof T>(code: C) => {
    return (cause: unknown): AppErr<C, T[C]> => {
      const msg = mapping[code]

      if (!msg) {
        throw new Error(`Unknown error code: ${String(code)}`)
      }

      return createError(code, msg, cause)
    }
  }

  errFn.coerce = <C extends keyof T>(code: C) => {
    return (err: unknown): AppErr<C, T[C]> => {
      if (isAppErr<C, T[C]>(err)) {
        return err
      }

      const msg = mapping[code]

      if (!msg) {
        throw new Error(`Unknown error code: ${String(code)}`)
      }

      return createError(code, msg, err)
    }
  }

  for (const [code] of Object.entries(mapping)) {
    // biome-ignore lint/suspicious/noExplicitAny:
    ;(errFn as any)[code] = code
  }

  return errFn as ErrFn<T>
}
