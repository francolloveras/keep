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
    <div role="dialog" className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-11/12 max-w-md rounded-md border border-zinc-800 bg-zinc-900 shadow-lg transition-transform">
        <div className="flex items-center justify-between border-b border-zinc-800 p-4">
          <h3 className="text-xl font-medium text-zinc-300">{title}</h3>
          <button onClick={closeDialog} className="text-zinc-500 hover:text-zinc-100">
            <Icon icon="faXmark" className="size-5" />
          </button>
        </div>
        <div className="p-4">{content}</div>
      </div>
    </div>
  )
}
