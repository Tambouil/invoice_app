import { ClientFactory } from '#database/factories/client_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class ClientSeeder extends BaseSeeder {
  async run() {
    await ClientFactory.with('quotations', 2).createMany(8)
  }
}
