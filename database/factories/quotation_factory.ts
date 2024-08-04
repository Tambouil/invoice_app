import factory from '@adonisjs/lucid/factories'
import Quotation from '#models/quotation'
import { ClientFactory } from '#factories/client_factory'
import { QuotationStatus } from '#types/quotation'

let quotationNumberCounter = 1

export const QuotationFactory = factory
  .define(Quotation, async ({ faker }) => {
    const statusopts = Object.values(QuotationStatus)
    const status = faker.helpers.arrayElement(statusopts)

    return {
      quotationNumber: quotationNumberCounter++,
      amount: faker.number.int({ min: 100, max: 10000 }),
      status: status,
      date: faker.date.past(),
      expirationDate: faker.date.future(),
    }
  })
  .relation('client', () => ClientFactory)
  .build()
