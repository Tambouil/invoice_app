import { Head, Link } from '@inertiajs/react'
import { buttonVariants } from '~/components/ui/button'

export default function Home() {
  return (
    <>
      <Head title="Accueil" />
      <main className="container">
        <Link className={buttonVariants({ variant: 'default' })} href="/clients">
          Ajouter un client
        </Link>
      </main>
    </>
  )
}
