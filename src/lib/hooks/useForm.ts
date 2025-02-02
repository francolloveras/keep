'use client'

import { useActionState, useEffect, useState } from 'react'

import { Dict } from '@/lib/dictionaries'
import { useDialog } from '@/lib/hooks/useDialog'
import { type Toast, useToast } from '@/lib/hooks/useToast'

type FieldErrorMap = {
  [Group in keyof Dict['forms']['fields']]: {
    [Field in keyof Dict['forms']['fields'][Group]]: 'errors' extends keyof Dict['forms']['fields'][Group][Field]
      ? keyof Dict['forms']['fields'][Group][Field]['errors']
      : never
  }
}

interface FormState<Fields, ToastMessages extends string, Payload> {
  fields?: Partial<Fields>
  errors?: Partial<{
    [K in keyof Fields &
      keyof FieldErrorMap[keyof FieldErrorMap]]: FieldErrorMap[keyof FieldErrorMap][K]
  }>
  payload?: Payload
  actions?: {
    closeDialog?: boolean
    createToast?: Omit<Toast, 'message'> & { message: ToastMessages }
  }
}

interface DefaultBindData {
  id: number
  isCreation: boolean
  uniqueHasChange?: boolean
}

export type FormAction<
  Fields,
  ToastMessages extends string,
  BindData = DefaultBindData,
  Payload = null
> = (
  bindData: BindData,
  prevState: FormState<Fields, ToastMessages, Payload> | undefined,
  formData: FormData
) => Promise<FormState<Fields, ToastMessages, Payload>>

interface UseFormProps<Fields, ToastMessages extends string, BindData, Payload> {
  action: FormAction<Fields, ToastMessages, BindData, Payload>
  toastMessages: Record<ToastMessages, string>
  payload?: BindData
  initialState?: FormState<Fields, ToastMessages, Payload>
}

export function useForm<Fields, ToastMessages extends string, BindData, Payload>({
  action: initialAction,
  payload = {} as BindData,
  initialState,
  toastMessages
}: UseFormProps<Fields, ToastMessages, BindData, Payload>) {
  const boundAction = initialAction.bind(null, payload)

  const [state, action, loading] = useActionState(boundAction, initialState)
  const [fields, setFields] = useState(initialState?.fields)

  const { closeDialog } = useDialog()
  const { createToast } = useToast()

  useEffect(() => {
    if (state?.fields) {
      setFields((prev) => ({
        ...prev,
        ...state.fields
      }))
    }

    if (state?.actions?.closeDialog) {
      closeDialog()
    }

    if (state?.actions?.createToast) {
      createToast({
        ...state.actions.createToast,
        message: toastMessages[state.actions.createToast.message]
      })
    }
  }, [state])

  return {
    ...state,
    loading,
    fields,
    action
  }
}
