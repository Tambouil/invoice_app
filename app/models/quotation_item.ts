import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Quotation from '#models/quotation'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class QuotationItem extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare quotationId: number

  @column()
  declare description: string

  @column()
  declare quantity: number

  @column()
  declare unitPrice: number

  @column()
  declare tax: number

  @column()
  declare total: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Quotation)
  declare quotation: BelongsTo<typeof Quotation>
}
