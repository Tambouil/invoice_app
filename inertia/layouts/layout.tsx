import { Head } from '@inertiajs/react'
import { Header } from '~/components/header'

interface LayoutProps {
  title: string
  children?: React.ReactNode
}

export function Layout({ title, children }: LayoutProps) {
  return (
    <>
      <Head title={title} />
      <main className="container space-y-6">
        <Header />
        {children}
      </main>
    </>
  )
}
