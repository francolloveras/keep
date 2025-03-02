'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

import Input from '@/components/ui/inputs/input'
import { useLocale } from '@/lib/hooks/useLocale'

export default function SearchInput() {
  const { dict } = useLocale()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const handleSearch = useDebouncedCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const params = new URLSearchParams(searchParams)

    if (value) {
      params.set('search', value)
    } else {
      params.delete('search')
    }

    console.log(params)
    console.log(pathname)

    router.replace(`${pathname}?${params.toString()}`)
  }, 300)

  return (
    <Input
      name="search"
      defaultValue={searchParams.get('search')?.toString()}
      onChange={handleSearch}
      placeholder={dict.components.search}
      wrapper={{
        supportingTextSpace: false
      }}
    />
  )
}
