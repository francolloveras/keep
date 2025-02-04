'use client'

import ImportedLink, { LinkProps as ImportedLinkProps } from 'next/link'

import { useLocale } from '@/lib/hooks/useLocale'

type OtherProps = ImportedLinkProps & React.HtmlHTMLAttributes<HTMLAnchorElement>
interface LinkProps extends OtherProps {
  children: React.ReactNode
}

export default function Link({ href, children, ...rest }: LinkProps) {
  const { lang } = useLocale()

  return (
    <ImportedLink href={href} locale={lang} {...rest}>
      {children}
    </ImportedLink>
  )
}
