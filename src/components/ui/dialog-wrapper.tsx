'use client'

import { useEffect } from 'react'

import Icon from '@/components/ui/icon'
import { useDialog } from '@/lib/hooks/useDialog'

export default function DialogWrapper() {
  const { isOpen, title, content, closeDialog } = useDialog()

  useEffect(() => {
    const onClickEvent = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        return closeDialog()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', onClickEvent)
    }

    return () => {
      document.removeEventListener('keydown', onClickEvent)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div role="dialog" className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-11/12 max-w-md rounded-md border border-outline bg-background shadow-md transition-transform">
        <div className="flex items-center justify-between border-b border-outline p-4">
          <h3 className="text-xl font-medium text-text">{title}</h3>
          <button
            onClick={closeDialog}
            className="rounded-md px-1.5 py-1 text-text hover:bg-current-shadow"
          >
            <Icon icon="faXmark" className="mt-0.5 size-5" />
          </button>
        </div>
        <div className="p-4">{content}</div>
      </div>
    </div>
  )
}
