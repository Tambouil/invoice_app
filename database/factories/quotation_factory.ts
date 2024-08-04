import factory from '@adonisjs/lucid/factories'
import Quotation from '#models/quotation'
import { ClientFactory } from '#factories/client_factory'

export const QuotationFactory = factory
  .define(Quotation, async ({ faker }) => {
    const statusOptions = ['draft', 'sent', 'accepted', 'rejected', 'cancelled'] as const
    const status = faker.helpers.arrayElement(statusOptions)

    return {
      quotationNumber: faker.number.int({ min: 1, max: 100 }), // TODO: add a unique constraint on this field becuse a quotation can't have the same number
      amount: faker.number.int({ min: 100, max: 10000 }),
      status: status,
      date: faker.date.past(),
      expirationDate: faker.date.future(),
    }
  })
  .relation('client', () => ClientFactory)
  .build()
