import { Link } from '@inertiajs/react'
import { Navigation } from '~/components/navigation'

export function Header() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4">
        <Link className="flex items-center justify-between" href="/">
          <div className="flex items-center">
            <img
              className="h-8 w-auto sm:h-10"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="logo"
            />
            <span className="ml-3 text-xl font-bold tracking-tight sm:text-2xl">FacturEasy</span>
          </div>
        </Link>
        <Navigation className="mx-6" />
      </div>
    </header>
  )
}
