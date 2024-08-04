import i18nManager from '@adonisjs/i18n/services/main'
import Quotation from '#models/quotation'

export class AllQuotationsPresenter {
  serialize(quotations: Quotation[]) {
    quotations.sort((a, b) => a.quotationNumber - b.quotationNumber)
    return quotations.map((quotation) => {
      return {
        id: quotation.id,
        quotationNumber: quotation.quotationNumber,
        client: quotation.client.name,
        date: i18nManager.locale('fr').formatDate(quotation.date),
        expirationDate: i18nManager.locale('fr').formatDate(quotation.expirationDate),
        amount: i18nManager.locale('fr').formatCurrency(quotation.amount, { currency: 'EUR' }),
        status: quotation.status,
        note: quotation.note,
      }
    })
  }
}

export class SingleQuotationPresenter {
  serialize(quotation: Quotation) {
    return quotation.toJSON()
  }
}
