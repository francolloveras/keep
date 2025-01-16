import { redirect } from 'next/navigation'

import { getCurrentSession } from '@/auth'
import { PATHS } from '@/lib/const'

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const { session } = await getCurrentSession()

  if (!session) {
    redirect(PATHS.LOGIN)
  }

  return <div>{children}</div>
}
