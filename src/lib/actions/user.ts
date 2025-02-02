'use server'

import { revalidatePath } from 'next/cache'
import { z, ZodError } from 'zod'

import { getCurrentSession } from '@/auth'
import { PATHS } from '@/lib/const'
import { FormAction } from '@/lib/hooks/useForm'
import { prisma } from '@/lib/prisma'
import { formatZodError } from '@/lib/utils'

const userScheme = z.object({
  username: z
    .string()
    .min(1, 'minLength')
    .refine((value) => value.trim().toLowerCase(), 'minLength'),
  name: z
    .string()
    .min(1, 'minLength')
    .refine((value) => value.trim(), 'minLength'),
  email: z
    .string()
    .min(1, 'minLength')
    .email('invalid')
    .refine((value) => value.trim(), 'minLength')
})

type UserFields = z.infer<typeof userScheme>
type ToastMessages = 'notSession' | 'success' | 'unknown'

export const updateUserInfo: FormAction<UserFields, ToastMessages> = async (
  bindData,
  prevData,
  formData
) => {
  const fields: Partial<UserFields> = {
    username: formData.get('username')?.toString(),
    name: formData.get('name')?.toString(),
    email: formData.get('email')?.toString()
  }

  try {
    const validate = userScheme.parse(fields)

    const { user } = await getCurrentSession()

    if (!user) {
      return {
        fields,
        actions: {
          createToast: {
            type: 'error',
            message: 'notSession'
          }
        }
      }
    }

    await prisma.user.update({
      data: validate,
      where: {
        id: user.id
      }
    })

    revalidatePath(PATHS.HOME)

    return {
      fields,
      actions: {
        createToast: {
          type: 'success',
          message: 'success'
        }
      }
    }
  } catch (error) {
    // Handle zod errors formatting them.
    if (error instanceof ZodError) {
      return {
        fields,
        errors: formatZodError(error)
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
}
