'use client'

import { usePathname, useRouter, useSearchParams as nextUseSearchParams } from 'next/navigation'

export const useSearchParams = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = nextUseSearchParams()

  const params = new URLSearchParams(searchParams)

  const get = (name: string) => {
    return searchParams.get(name)
  }

  const getAll = (name: string) => {
    return searchParams.getAll(name)
  }

  const set = (name: string, value: string) => {
    params.set(name, value)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const append = (name: string, value: string) => {
    params.append(name, value)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const remove = (name: string) => {
    params.delete(name)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const removeSpecific = (name: string, value: string) => {
    const newParams = new URLSearchParams()

    params.forEach((val, key) => {
      if (!(key === name && val === value)) {
        newParams.append(key, val)
      }
    })

    router.replace(`${pathname}?${newParams.toString()}`, { scroll: false })
  }

  return {
    searchParams,
    get,
    getAll,
    set,
    append,
    remove,
    removeSpecific
  }
}
