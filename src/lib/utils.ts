// TODO FIX EXPLICIT ANY TYPES
/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx, { type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ZodError } from 'zod'

export function cx(...args: ClassValue[]) {
  return twMerge(clsx(...args))
}

export type ObjectError<T> = {
  [K in keyof T]?: T[K] extends object
    ? T[K] extends Array<any>
      ? { [index: number]: ObjectError<T[K][number]> }
      : ObjectError<T[K]>
    : string
}

export const formatZodError = <T>(error: ZodError<T>) => {
  const formattedError: ObjectError<T> = {}

  error.errors.forEach((item) => {
    let currentObj: ObjectError<T> = formattedError
    item.path.forEach((key, index) => {
      if (index === item.path.length - 1) {
        currentObj[key as keyof T] = item.message as any
      } else {
        if (!currentObj[key as keyof T]) {
          currentObj[key as keyof T] = {} as ObjectError<T[keyof T]> as any
        }
        currentObj = currentObj[key as keyof T] as ObjectError<T[keyof T]> as any
      }
    })
  })

  return formattedError
}
