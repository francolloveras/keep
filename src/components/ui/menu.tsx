'use client'

import { type Methods, type Positions, useModal } from '@/lib/hooks/useModal'
import { cx } from '@/lib/utils'

interface MenuProps {
  id: string
  label: React.ReactNode
  className?: string
  position?: Positions
  method?: Methods
  children: React.ReactNode
}

export default function Menu({
  id,
  label,
  className,
  position,
  method = 'click',
  children
}: MenuProps) {
  const { modalRef, triggerRef, openModal, closeModal } = useModal(id, position, method)

  const handleClick = () => {
    openModal(children)
  }

  const handleMouseEnter = () => {
    if (method !== 'hover') return

    openModal(children)
  }

  const handleMouseLeave = (event: React.MouseEvent) => {
    if (method !== 'hover') return

    if (modalRef.current?.contains(event.relatedTarget as Node)) return

    closeModal()
  }

  return (
    <button
      ref={triggerRef}
      className={cx(className, 'w-full')}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {label}
    </button>
  )
}
