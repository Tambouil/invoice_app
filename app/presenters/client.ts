import Client from '#models/client'

export class AllClientsPresenter {
  json(clients: Client[]) {
    return clients.map((client) => client.toJSON())
  }
}

export class SingleClientPresenter {
  json(client: Client) {
    return client.toJSON()
  }
}
