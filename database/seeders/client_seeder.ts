import { ClientFactory } from '#database/factories/client_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class ClientSeeder extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await ClientFactory.createMany(10)
  }
}
