'use client'

import { createContext, useEffect, useState } from 'react'

import DialogWrapper from '@/components/ui/dialog-wrapper'
import { useContext } from '@/lib/hooks/useContext'

interface Dialog {
  isOpen: boolean
  content: React.ReactNode | null
}

type OpenDialog = (props: Omit<Dialog, 'isOpen'>) => void

interface DialogContextValue extends Dialog {
  openDialog: OpenDialog
  closeDialog: () => void
}

export const DialogContext = createContext<DialogContextValue | null>(null)

export function DialogProvider({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const defaultState: Dialog = {
    isOpen: false,
    content: null
  }

  const [dialog, setDialog] = useState(defaultState)

  const openDialog: OpenDialog = (props) => {
    setDialog({
      isOpen: true,
      ...props
    })
  }

  const closeDialog = () => {
    setDialog(defaultState)
  }

  useEffect(() => {
    if (dialog.isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [dialog.isOpen])

  return (
    <DialogContext.Provider value={{ ...dialog, openDialog, closeDialog }}>
      {children}
      <DialogWrapper />
    </DialogContext.Provider>
  )
}

export const useDialog = () => {
  const context = useContext(DialogContext)

  return context
}
