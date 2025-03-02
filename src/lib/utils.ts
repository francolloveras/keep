import clsx, { type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ZodError } from 'zod'

export function cx(...args: ClassValue[]) {
  return twMerge(clsx(...args))
}

export const formatZodError = (error: ZodError) => {
  const formattedError: Record<string, string> = {}

  error.errors.forEach((item) => {
    const currentObj: Record<string, string> = formattedError

    item.path.forEach((key, index) => {
      if (index === item.path.length - 1) {
        currentObj[key] = item.message
      } else {
        if (!currentObj[key]) {
          currentObj[key] = ''
        }
      }
    })
  })

  return formattedError
}
