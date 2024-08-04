export const QuotationStatus = {
  DRAFT: 'draft',
  SENT: 'sent',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
  CANCELLED: 'cancelled',
} as const

export type QuotationStatus = (typeof QuotationStatus)[keyof typeof QuotationStatus]

export interface QuotationItemPayload {
  description: string
  quantity: number
  unitPrice: number
  tax?: number
}

export interface QuotationPayload {
  clientId: number
  date: Date
  expirationDate: Date
  status: QuotationStatus
  note?: string
  items: QuotationItemPayload[]
}
