import { Link, usePage } from '@inertiajs/react'
import { cn } from '~/lib/utils'

const navItems = [
  { href: '/quotations', label: 'Devis' },
  { href: '/invoices', label: 'Factures' },
  { href: '/clients', label: 'Clients' },
  { href: '/settings', label: 'Paramètres' },
]

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const { url } = usePage()
  const isActive = url === href

  return (
    <Link
      href={href}
      className={cn(
        'text-sm font-medium text-muted-foreground transition-colors hover:text-primary',
        isActive ? 'text-primary' : ''
      )}
    >
      {children}
    </Link>
  )
}

export function Navigation({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)} {...props}>
      {navItems.map((item) => (
        <NavLink key={item.href} href={item.href}>
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}
