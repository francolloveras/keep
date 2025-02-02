'use client'

import { useEffect } from 'react'

import { useDialog } from '@/lib/hooks/useDialog'

export default function DialogWrapper() {
  const { isOpen, content, closeDialog } = useDialog()

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
      <div className="min-w-[32rem] rounded-md border border-outline bg-background p-6 shadow-lg shadow-black/5 transition-transform">
        {content}
      </div>
    </div>
  )
}
