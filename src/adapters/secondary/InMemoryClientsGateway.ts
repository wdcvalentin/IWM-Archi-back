import { ClientGateway } from '../../coreLogic/gateways/ClientGateway'
import { UuidGenerator } from '../../coreLogic/gateways/uuidGenerator'
import { Client } from '../../coreLogic/usecases/clients-listing/client'

export class ClientDoesNotExistsError extends Error {
  constructor(id: string) {
    super(`Client ${id} does not exists`)
  }
}

export class InMemoryClientGateway implements ClientGateway {
  private clients: Array<Client> = []
  private uuidGenerator: UuidGenerator

  constructor(uuidGenerator: UuidGenerator) {
    this.uuidGenerator = uuidGenerator
  }

  feedWith(...clients: Array<Client>) {
    this.clients = clients
  }

  async listAll(): Promise<Array<Client>> {
    return Promise.resolve(this.clients)
  }

  async getById(id: string): Promise<Client> {
    const res = this.clients.find((p) => p.id === id)
    if (!res) {
      throw new ClientDoesNotExistsError(id)
    }
    return res
  }

  async create(name: string): Promise<Client> {
    const newClient = {
      id: this.uuidGenerator.generate(),
      name
    }
    this.clients.push(newClient)
    return Promise.resolve(newClient)
  }

  async update(client: Client): Promise<Client> {
    const index = this.clients.findIndex((c => c.id === client.id))
    this.clients[index] = client

    return Promise.resolve(client)
  }

  async delete(id: string): Promise<Boolean> {
    this.clients = this.clients.filter(c => c.id !== id)
    
    return Promise.resolve(true)
  }
}