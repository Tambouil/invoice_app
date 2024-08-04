import vine from '@vinejs/vine'
import { QuotationStatus } from '#types/quotation'

export const createQuotationValidator = vine.compile(
  vine.object({
    clientId: vine.number().positive(),
    date: vine.date({ formats: 'YYYY-MM-DD' }),
    expirationDate: vine.date({ formats: 'YYYY-MM-DD' }),
    status: vine.enum(Object.values(QuotationStatus)),
    note: vine.string().optional(),
    items: vine.array(
      vine.object({
        description: vine.string().trim().minLength(1),
        quantity: vine.number().positive(),
        unitPrice: vine.number().positive(),
        tax: vine.number().optional(),
      })
    ),
  })
)
