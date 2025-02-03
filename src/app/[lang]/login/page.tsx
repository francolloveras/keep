import { redirect } from 'next/navigation'

import Form from '@/app/[lang]/login/form'
import { getCurrentSession } from '@/auth'
import Footer from '@/components/footer'
import LocaleSwitcher from '@/components/ui/locale-switcher'
import { PATHS } from '@/lib/const'
import { getDictionary, type Locale } from '@/lib/dictionaries'

export const metadata = {
  title: 'Login'
}

export default async function Login({
  params
}: Readonly<{
  params: Promise<{ lang: Locale }>
}>) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  const { session } = await getCurrentSession()

  // If the user is logged in, redirect to the home page.
  if (session) {
    redirect(PATHS.HOME)
  }

  return (
    <main className="flex min-h-screen flex-col px-2">
      <nav className="ml-auto w-fit p-2 md:p-4">
        <LocaleSwitcher lang={lang} />
      </nav>
      <div className="flex flex-1 items-center justify-center">
        <div className="w-[31.25rem] rounded-md border border-outline px-8 py-5 shadow-md md:px-12 md:py-9">
          <header className="mb-8 md:mb-12">
            <h1 className="text-2xl font-semibold text-text md:text-3xl">{dict.login.title}</h1>
            <p className="text-base">{dict.login.description}</p>
          </header>
          <Form />
        </div>
      </div>
      <Footer />
    </main>
  )
}
