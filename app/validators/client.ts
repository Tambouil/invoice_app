import vine from '@vinejs/vine'

export const createClientValidator = vine.compile(
  vine.object({
    name: vine.string(),
    email: vine.string().email(),
    phone: vine.string().mobile().optional(),
    address: vine.string().optional(),
    city: vine.string().optional(),
  })
)
