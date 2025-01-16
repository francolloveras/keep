'use client'

import { createContext, useState } from 'react'

import { type Icons } from '@/components/ui/icon'
import ToastWrapper from '@/components/ui/toast-wrapper'
import { useContext } from '@/lib/hooks/useContext'

type CreateToast = (props: Toast) => void
type DeleteToast = (id: string) => void

export interface Toast {
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  icon?: Icons
  visibleTime?: number
  isVisible?: boolean
  action?: {
    label: string
    function: () => void
  }
}

interface ToastWithID extends Toast {
  id: string
}

interface ToastContextValue {
  toasts: ToastWithID[]
  createToast: CreateToast
  deleteToast: DeleteToast
}

export const ToastContext = createContext<ToastContextValue | null>(null)

export function ToastProvider({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const [toasts, setToasts] = useState<ToastWithID[]>([])

  const createToast: CreateToast = ({ visibleTime = 3000, ...rest }) => {
    const id = Math.random().toString(36)

    setToasts((prev) => [...prev, { id, isVisible: true, ...rest }])

    setTimeout(() => deleteToast(id), visibleTime)
  }

  const deleteToast: DeleteToast = (id) => {
    setToasts((prev) =>
      prev.map((toast) => (toast.id === id ? { ...toast, isVisible: false } : toast))
    )

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, 300)
  }

  return (
    <ToastContext.Provider value={{ toasts, createToast, deleteToast }}>
      {children}
      <ToastWrapper />
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)

  return context
}
