import factory from '@adonisjs/lucid/factories'
import QuotationItem from '#models/quotation_item'
import { QuotationFactory } from '#factories/quotation_factory'

export const QuotationItemFactory = factory
  .define(QuotationItem, async ({ faker }) => {
    return {
      description: faker.lorem.sentence(),
      quantity: faker.number.int({ min: 1, max: 10 }),
      unitPrice: faker.number.int({ min: 100, max: 10000 }),
      tax: faker.number.int({ min: 0, max: 100 }),
      total: faker.number.int({ min: 100, max: 10000 }),
    }
  })
  .relation('quotation', () => QuotationFactory)
  .build()
