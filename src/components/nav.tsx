import { User } from '@prisma/client'

import Menu from '@/components/nav-menu'

interface NavProps {
  user: User
}

export default function Nav({ user }: NavProps) {
  return (
    <nav className="flex justify-between px-8 py-4">
      <ul>
        <li>Link 1</li>
      </ul>
      <Menu user={user} />
    </nav>
  )
}
