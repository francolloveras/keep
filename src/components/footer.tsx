'use client'

import Link from '@/components/ui/link'
import { useLocale } from '@/lib/hooks/useLocale'

export default function Footer() {
  const { dict } = useLocale()

  return (
    <footer className="flex justify-between px-6 py-2.5 text-sm/6 text-text/80">
      <p className="w-1/3">v1.0.0</p>
      <h4 className="w-1/3 text-center font-medium">&copy; 2025, Franco Lloveras</h4>
      <nav className="flex w-1/3 justify-end gap-x-4">
        <Link href="#" className="transition-colors hover:text-primary">
          {dict.layout.footer.credits}
        </Link>
        <Link href="#" className="transition-colors hover:text-primary">
          {dict.layout.footer.contact}
        </Link>
        <Link href="#" className="transition-colors hover:text-primary">
          {dict.layout.footer.report}
        </Link>
      </nav>
    </footer>
  )
}
