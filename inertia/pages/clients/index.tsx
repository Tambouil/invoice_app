import { Head, Link } from '@inertiajs/react'
import { buttonVariants } from '~/components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'

import { InferPageProps } from '@adonisjs/inertia/types'
import type ClientController from '#controllers/client_controller'

export default function Clients({ clients }: InferPageProps<ClientController, 'index'>) {
  return (
    <>
      <Head title="Accueil" />
      <main className="container">
        <Link className={buttonVariants({ variant: 'default' })} href="/clients/create">
          Ajouter un client
        </Link>
        <Table>
          <TableCaption className="sr-only">Liste de mes clients</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Téléphone</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </>
  )
}
