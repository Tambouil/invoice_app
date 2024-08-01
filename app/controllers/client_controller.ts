import { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { createClientValidator } from '#validators/client'
import Client from '#models/client'
import { AllClientsPresenter, SingleClientPresenter } from '#presenters/presenter'

@inject()
export default class ClientController {
  constructor(
    private allClientsPresenter: AllClientsPresenter,
    private singleClientPresenter: SingleClientPresenter
  ) {}
  async index({ inertia }: HttpContext) {
    const clients = await Client.all()
    return inertia.render('clients/index', { clients: this.allClientsPresenter.json(clients) })
  }

  async create({ inertia }: HttpContext) {
    return inertia.render('clients/create')
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createClientValidator)
    await Client.create(payload)
    return response.redirect().back()
  }

  async show({ response, params }: HttpContext) {
    const client = await Client.findOrFail(params.id)
    return response.json(this.singleClientPresenter.json(client))
  }

  async update({ response, params }: HttpContext) {
    const client = await Client.findOrFail(params.id)
    await client.save()
    return response.json(this.singleClientPresenter.json(client))
  }

  async destroy({ response, params }: HttpContext) {
    const client = await Client.findOrFail(params.id)
    await client.delete()
    return response.json({ message: 'Client deleted' })
  }
}
