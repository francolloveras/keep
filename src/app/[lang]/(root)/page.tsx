import { redirect } from 'next/navigation'

import { getCurrentSession } from '@/auth'
import { PATHS } from '@/lib/const'
import { getDictionary, type Locale } from '@/lib/dictionaries/get-dictionaries'

export default async function Home({
  params
}: Readonly<{
  params: Promise<{ lang: Locale }>
}>) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  const { session } = await getCurrentSession()

  if (!session) {
    redirect(PATHS.LOGIN)
  }

  return <main>{dict.home}</main>
}
