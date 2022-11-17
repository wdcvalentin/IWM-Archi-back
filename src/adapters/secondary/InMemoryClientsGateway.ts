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
}