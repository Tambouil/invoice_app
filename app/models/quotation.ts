import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import QuotationItem from '#models/quotation_item'
import Client from '#models/client'
import { QuotationStatus } from '#types/quotation'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Quotation extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare clientId: number

  @column()
  declare quotationNumber: number

  @column()
  declare date: Date

  @column()
  declare expirationDate: Date

  @column()
  declare amount: number

  @column()
  declare status: QuotationStatus

  @column()
  declare note: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Client)
  declare client: BelongsTo<typeof Client>

  @hasMany(() => QuotationItem)
  declare items: HasMany<typeof QuotationItem>
}
