import { Head, useForm } from '@inertiajs/react'
import type { FormEvent } from 'react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Separator } from '~/components/ui/separator'

export default function CreateClient() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
  })

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    post('/clients', {
      onSuccess() {
        reset()
      },
    })
  }

  return (
    <>
      <Head title="Ajouter un client" />
      <div className="space-y-6 p-6 pb-16">
        <div className="space-y-0.5">
          <h1 className="text-2xl font-bold tracking-tight">Ajouter un client</h1>
          <p className="text-muted-foreground">Ajoutez un nouveau client à votre liste</p>
        </div>
        <Separator className="my-6" />
        <div className="flex justify-center">
          <div className="flex-1 lg:max-w-2xl w-full">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Informations du client</h3>
                <p className="text-sm text-muted-foreground">
                  Entrez les détails du nouveau client
                </p>
              </div>
              <Separator />
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="block text-sm font-medium">
                      Nom
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      className="w-full"
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                    />
                    {errors.name && (
                      <span className="text-red-500 text-sm mt-1 font-medium block">
                        {errors.name}
                      </span>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="block text-sm font-medium">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      className="w-full"
                      value={data.email}
                      onChange={(e) => setData('email', e.target.value)}
                    />
                    {errors.email && (
                      <span className="text-red-500 text-sm mt-1 font-medium block">
                        {errors.email}
                      </span>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="block text-sm font-medium">
                      Téléphone
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      className="w-full"
                      value={data.phone}
                      onChange={(e) => setData('phone', e.target.value)}
                    />
                    {errors.phone && (
                      <span className="text-red-500 text-sm mt-1 font-medium block">
                        {errors.phone}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="block text-sm font-medium">
                      Adresse
                    </Label>
                    <Input
                      id="address"
                      type="text"
                      className="w-full"
                      value={data.address}
                      onChange={(e) => setData('address', e.target.value)}
                    />
                    {errors.address && (
                      <span className="text-red-500 text-sm mt-1 font-medium block">
                        {errors.address}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city" className="block text-sm font-medium">
                      Ville
                    </Label>
                    <Input
                      id="city"
                      type="text"
                      className="w-full"
                      value={data.city}
                      onChange={(e) => setData('city', e.target.value)}
                    />
                    {errors.city && (
                      <span className="text-red-500 text-sm mt-1 font-medium block">
                        {errors.city}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="submit" disabled={processing}>
                    Ajouter le client
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
