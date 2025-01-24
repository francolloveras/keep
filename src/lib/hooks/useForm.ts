'use client'

import { useActionState, useEffect, useState } from 'react'

import { INPUTS_ERRORS } from '@/lib/const'
import { useDialog } from '@/lib/hooks/useDialog'
import { type Toast, useToast } from '@/lib/hooks/useToast'

type InputsErrors = (typeof INPUTS_ERRORS)[number]

interface FormState<Fields, Payload> {
  fields?: Partial<Fields>
  errors?: Partial<Record<keyof Fields, InputsErrors>>
  payload?: Payload
  actions?: {
    closeDialog?: boolean
    createToast?: Toast
  }
}

interface DefaultBindData {
  id: number
  isCreation: boolean
  uniqueHasChange?: boolean
}

export type FormAction<Fields, BindData = DefaultBindData, Payload = null> = (
  bindData: BindData,
  prevState: FormState<Fields, Payload> | undefined,
  formData: FormData
) => Promise<FormState<Fields, Payload>>

interface UseFormProps<Fields, BindData, Payload> {
  action: FormAction<Fields, BindData, Payload>
  payload?: BindData
  initialState?: FormState<Fields, Payload>
}

export function useForm<Fields, BindData, Payload>({
  action: initialAction,
  payload = {} as BindData,
  initialState
}: UseFormProps<Fields, BindData, Payload>) {
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
      createToast(state.actions.createToast)
    }
  }, [state])

  return {
    ...state,
    loading,
    fields,
    action
  }
}
