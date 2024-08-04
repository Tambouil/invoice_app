import { inject } from '@adonisjs/core'
import { AllQuotationsPresenter, SingleQuotationPresenter } from '#presenters/quotation'
import { createQuotationValidator } from '#validators/quotation'
import { QuotationService } from '#services/quotation_service'
import Quotation from '#models/quotation'
import Client from '#models/client'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class QuotationController {
  constructor(
    private allQuotationsPresenter: AllQuotationsPresenter,
    private singleQuotationPresenter: SingleQuotationPresenter,
    private quotationService: QuotationService
  ) {}
  async index({ inertia }: HttpContext) {
    const quotations = await Quotation.query().preload('client')
    return inertia.render('quotations/index', {
      quotations: this.allQuotationsPresenter.serialize(quotations),
    })
  }

  async create({ inertia }: HttpContext) {
    const clients = await Client.query().preload('quotations')
    return inertia.render('quotations/create', { clients })
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createQuotationValidator)
    await this.quotationService.create(payload)
    return response.redirect().back()
  }

  async show({ response, params }: HttpContext) {
    const quotation = await Quotation.findOrFail(params.id)
    return response.json(this.singleQuotationPresenter.serialize(quotation))
  }

  async update({ response, params }: HttpContext) {
    const quotation = await Quotation.findOrFail(params.id)
    await quotation.save()
    return response.json(this.singleQuotationPresenter.serialize(quotation))
  }

  async destroy({ response, params }: HttpContext) {
    const quotation = await Quotation.findOrFail(params.id)
    await quotation.delete()
    return response.json({ message: 'Quotation deleted' })
  }
}
