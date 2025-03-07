import { redirect } from 'next/navigation'

import { getCurrentSession } from '@/auth'
import Footer from '@/components/footer'
import Nav from '@/components/nav'
import { PATHS } from '@/lib/const'

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const { session, user } = await getCurrentSession()

  // If the user is not logged in, redirect to the login page.
  if (!session) {
    redirect(PATHS.LOGIN)
  }

  return (
    <>
      <Nav user={user} session={session} />
      <main className="mx-auto flex w-8/12 flex-1 py-6">{children}</main>
      <Footer />
    </>
  )
}
