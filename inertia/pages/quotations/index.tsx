import { Link } from '@inertiajs/react'
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
import { InferPageProps } from '@adonisjs/inertia/types'
import type QuotationController from '#controllers/quotation_controller'

export default function Quotations({ quotations }: InferPageProps<QuotationController, 'index'>) {
  return (
    <Layout title="Mes devis">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mes devis</h1>
        <Link className={buttonVariants({ variant: 'default' })} href="/quotations/create">
          Créer un devis
        </Link>
      </div>
      <Table>
        <TableCaption>Liste de mes devis</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>N° Devis</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Expiration</TableHead>
            <TableHead>Montant</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {quotations.map((quotation) => (
            <TableRow key={quotation.id}>
              <TableCell>{quotation.quotationNumber}</TableCell>
              <TableCell>{quotation.client}</TableCell>
              <TableCell>{quotation.date}</TableCell>
              <TableCell>{quotation.expirationDate}</TableCell>
              <TableCell>{quotation.amount}</TableCell>
              <TableCell>{quotation.status}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Link
                    href={`/quotations/${quotation.id}`}
                    className={buttonVariants({ variant: 'outline', size: 'sm' })}
                  >
                    Voir
                  </Link>
                  <Link
                    href={`/quotations/${quotation.id}/edit`}
                    className={buttonVariants({ variant: 'outline', size: 'sm' })}
                  >
                    Modifier
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Layout>
  )
}
