import factory from '@adonisjs/lucid/factories'
import Client from '#models/client'
import { QuotationFactory } from '#factories/quotation_factory'

export const ClientFactory = factory
  .define(Client, async ({ faker }) => {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
    }
  })
  .relation('quotations', () => QuotationFactory)
  .build()
