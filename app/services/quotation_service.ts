import Quotation from '#models/quotation'
import QuotationItem from '#models/quotation_item'
import { QuotationPayload } from '#types/quotation'

export class QuotationService {
  async create(payload: QuotationPayload): Promise<Quotation> {
    const amount = this.calculateTotalAmount(payload.items)
    const quotationNumber = await this.generateQuotationNumber()

    const quotation = await Quotation.create({
      clientId: payload.clientId,
      date: payload.date,
      expirationDate: payload.expirationDate,
      status: payload.status,
      note: payload.note,
      amount,
      quotationNumber,
    })

    await this.createQuotationItems(quotation, payload.items)

    return quotation
  }

  private calculateTotalAmount(items: QuotationPayload['items']): number {
    return items.reduce((sum, item) => {
      return sum + item.quantity * item.unitPrice * (1 + (item.tax || 0) / 100)
    }, 0)
  }

  private async generateQuotationNumber(): Promise<number> {
    const totalQuotations = await Quotation.query().count('* as total')
    return (totalQuotations[0].$extras.total as number) + 1
  }

  private async createQuotationItems(quotation: Quotation, items: QuotationPayload['items']) {
    await Promise.all(
      items.map((item) =>
        QuotationItem.create({
          quotationId: quotation.id,
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          tax: item.tax || 0,
          total: item.quantity * item.unitPrice * (1 + (item.tax || 0) / 100),
        })
      )
    )
  }
}
