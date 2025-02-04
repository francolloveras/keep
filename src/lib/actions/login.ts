'use server'

import bcrypt from 'bcrypt'
import { z, ZodError } from 'zod'

import {
  createSession,
  deleteSessionTokenCookie,
  generateSessionToken,
  invalidateSession,
  setSessionTokenCookie
} from '@/auth'
import { PATHS } from '@/lib/const'
import { FormAction } from '@/lib/hooks/useForm'
import { prisma } from '@/lib/prisma'
import { localeRedirect } from '@/lib/server-utils'
import { formatZodError } from '@/lib/utils'

const loginScheme = z.object({
  username: z.string().min(1, 'minLength'),
  password: z.string().min(1, 'minLength')
})

type LoginFields = z.infer<typeof loginScheme>
type ToastMessages = 'unknown'

export const login: FormAction<LoginFields, ToastMessages> = async (
  bindData,
  prevData,
  formData
) => {
  const fields: Partial<LoginFields> = {
    username: formData.get('username')?.toString(),
    password: formData.get('password')?.toString()
  }

  try {
    const validate = loginScheme.parse(fields)

    const { username, password } = validate

    // Check if the username exists.
    const user = await prisma.user.findUnique({
      where: {
        username
      }
    })

    if (!user) {
      throw Error('Invalid credentials')
    }

    // Check if the password is correct.
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      throw new Error('Invalid credentials')
    }

    // Generate the token, session and set the cookie.
    const token = generateSessionToken()
    const session = await createSession(token, user.id)
    setSessionTokenCookie(token, session.expiresAt)
  } catch (error) {
    // Handle zod errors formatting them.
    if (error instanceof ZodError) {
      return {
        fields,
        errors: formatZodError(error)
      }
    }

    // Handle credentials errors.
    if (error instanceof Error && error.message === 'Invalid credentials') {
      return {
        fields,
        errors: {
          username: 'invalidCredentials',
          password: 'invalidCredentials'
        }
      }
    }

    // Handle unknown errors.
    return {
      fields,
      actions: {
        createToast: {
          type: 'error',
          message: 'unknown'
        }
      }
    }
  }

  // If the previous block is passed, redirect the user to the home page.
  return await localeRedirect(PATHS.HOME)
}

type BindData = { sessionId: string }

export const signout: FormAction<null, ToastMessages, BindData> = async (bindData) => {
  const { sessionId } = bindData

  try {
    await invalidateSession(sessionId)
    await deleteSessionTokenCookie()
  } catch (error) {
    console.log('Error in signout:', error)

    return {
      actions: {
        createToast: {
          type: 'error',
          message: 'unknown'
        }
      }
    }
  }

  // If the previous block is passed, redirect the user to the login page.
  return await localeRedirect(PATHS.LOGIN)
}
