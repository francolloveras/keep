import { getDictionary, type Locale } from '@/lib/dictionaries'

export default async function Home({
  params
}: Readonly<{
  params: Promise<{ lang: Locale }>
}>) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return <main>{dict.home}</main>
}
