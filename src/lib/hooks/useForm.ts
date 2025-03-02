'use client'

import { useActionState, useEffect, useState } from 'react'

import { useDialog } from '@/lib/hooks/useDialog'
import { type Toast, useToast } from '@/lib/hooks/useToast'

interface FormState<Fields, ToastMessages extends string, Payload> {
  fields?: Partial<Fields>
  errors?: Partial<Record<string, string>>
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
