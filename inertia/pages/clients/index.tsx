import { Link } from '@inertiajs/react'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Layout } from '~/layouts/layout'
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
import type ClientController from '#controllers/client_controller'

export default function Clients({ clients }: InferPageProps<ClientController, 'index'>) {
  return (
    <Layout title="Mes clients">
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
    </Layout>
  )
}
