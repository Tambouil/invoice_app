import { type FormEvent, useState } from 'react'
import { Link, useForm } from '@inertiajs/react'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Layout } from '~/layouts/layout'
import { Button, buttonVariants } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { DatePicker } from '~/components/date_picker'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import QuotationController from '#controllers/quotation_controller'
import { QuotationItemPayload, QuotationStatus } from '#types/quotation'

export default function QuotationForm({ clients }: InferPageProps<QuotationController, 'create'>) {
  const { data, setData, post, processing, errors, reset } = useForm<{
    clientId: number
    date: string
    expirationDate: string
    status: string
    note: string
    items: QuotationItemPayload[]
  }>({
    clientId: 1,
    date: new Date().toISOString().split('T')[0],
    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: QuotationStatus.DRAFT,
    note: '',
    items: [{ description: '', quantity: 1, unitPrice: 10, tax: 0 } as QuotationItemPayload],
  })

  const [total, setTotal] = useState(0)

  const addItem = () => {
    setData('items', [...data.items, { description: '', quantity: 1, unitPrice: 0, tax: 0 }])
  }

  const updateItem = (index: number, field: keyof QuotationItemPayload, value: string | number) => {
    const newItems = [...data.items]
    newItems[index] = { ...newItems[index], [field]: value }
    setData('items', newItems)
    calculateTotal(newItems)
  }

  const removeItem = (index: number) => {
    const newItems = data.items.filter((_, i) => i !== index)
    setData('items', newItems)
    calculateTotal(newItems)
  }

  const calculateTotal = (items: QuotationItemPayload[]) => {
    const newTotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
    setTotal(newTotal)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    post('/quotations', {
      onSuccess() {
        reset()
      },
    })
  }

  return (
    <Layout title="Créer un devis">
      <div className="flex justify-center">
        {clients.length === 0 ? (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aucun client</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">Vous n'avez pas encore ajouté de client.</p>
              <p className="text-xs text-muted-foreground">
                Ajoutez votre premier client pour commencer à gérer vos devis.
              </p>
              <div className="mt-4">
                <Link className={buttonVariants({ variant: 'default' })} href="/clients/create">
                  Ajouter un client
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8 max-w-7xl">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 py-1">
                  Client
                </p>
                <Select
                  defaultValue={data.clientId.toString()}
                  value={data.clientId.toString()}
                  onValueChange={(value) => setData('clientId', Number(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un client" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id.toString()}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.clientId && <p className="text-red-500 text-sm">{errors.clientId}</p>}
              </div>
              <div>
                <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 py-1">
                  Date du devis
                </p>
                <DatePicker date={data.date} setDate={(date) => setData('date', date)} />
                {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
              </div>
              <div>
                <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 py-1">
                  Date d'expiration
                </p>
                <DatePicker
                  date={data.expirationDate}
                  setDate={(date) => setData('expirationDate', date)}
                />
                {errors.expirationDate && (
                  <p className="text-red-500 text-sm">{errors.expirationDate}</p>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Éléments du devis</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-5 gap-4 font-medium text-sm">
                  <div>Description</div>
                  <div>Quantité</div>
                  <div>Prix unitaire</div>
                  <div>Total</div>
                  <div>Action</div>
                </div>

                {data.items.map((item, index) => (
                  <div key={index} className="grid grid-cols-5 gap-4 items-start">
                    <div>
                      <Input
                        placeholder="Description"
                        value={item.description}
                        onChange={(e) => updateItem(index, 'description', e.target.value)}
                      />
                      {(errors as any)[`items.${index}.description`] && (
                        <p className="text-red-500 text-sm mt-1">
                          {(errors as any)[`items.${index}.description`]}
                        </p>
                      )}
                    </div>

                    <div>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          updateItem(
                            index,
                            'quantity',
                            e.target.value === '' ? '' : Number(e.target.value)
                          )
                        }
                        min="1"
                      />
                      {(errors as any)[`items.${index}.quantity`] && (
                        <p className="text-red-500 text-sm mt-1">
                          {(errors as any)[`items.${index}.quantity`]}
                        </p>
                      )}
                    </div>

                    <div>
                      <Input
                        type="number"
                        value={item.unitPrice}
                        onChange={(e) =>
                          updateItem(
                            index,
                            'unitPrice',
                            e.target.value === '' ? '' : Number(e.target.value)
                          )
                        }
                        min="0"
                      />
                      {(errors as any)[`items.${index}.unitPrice`] && (
                        <p className="text-red-500 text-sm mt-1">
                          {(errors as any)[`items.${index}.unitPrice`]}
                        </p>
                      )}
                    </div>

                    <div className="pt-2">{(item.quantity * item.unitPrice).toFixed(2)} €</div>

                    {index > 0 && (
                      <div>
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => removeItem(index)}
                        >
                          Supprimer
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <Button type="button" onClick={addItem} className="mt-4">
                Ajouter une ligne
              </Button>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-lg font-medium">Total: {total.toFixed(2)} €</p>
              <Button type="submit" disabled={processing}>
                Enregistrer le devis
              </Button>
            </div>
          </form>
        )}
      </div>
    </Layout>
  )
}
