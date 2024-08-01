import { test } from '@japa/runner'
import Client from '#models/client'

test.group('Clients', () => {
  test('create a new client', async ({ assert }) => {
    const clientData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+33612345678',
    }

    const client = await Client.create(clientData)

    assert.instanceOf(client, Client)
    assert.equal(client.name, clientData.name)
    assert.equal(client.email, clientData.email)
    assert.equal(client.phone, clientData.phone)
    assert.exists(client.id)
    assert.exists(client.createdAt)
    assert.exists(client.updatedAt)
  })

  test('list clients', async ({ assert }) => {
    await Client.create({ name: 'Test Client', email: 'test@example.com', phone: '+33600000000' })

    const clients = await Client.all()

    assert.isArray(clients)
    assert.isAtLeast(clients.length, 1)
    assert.instanceOf(clients[0], Client)
  })

  test('update a client', async ({ assert }) => {
    const client = await Client.create({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+33612345678',
    })

    const updatedData = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '+33612345679',
    }

    client.merge(updatedData)
    await client.save()

    const updatedClient = await Client.findOrFail(client.id)

    assert.instanceOf(updatedClient, Client)
    assert.equal(updatedClient.name, updatedData.name)
    assert.equal(updatedClient.email, updatedData.email)
    assert.equal(updatedClient.phone, updatedData.phone)
  })

  test('delete a client', async ({ assert }) => {
    const client = await Client.create({
      name: 'To Delete',
      email: 'delete@example.com',
      phone: '+33600000000',
    })

    await client.delete()

    const deletedClient = await Client.find(client.id)
    assert.isNull(deletedClient)
  })
})
