import { FakeUuidGenerator } from "../../../adapters/secondary/fakeUuidGenerator"
import { ClientDoesNotExistsError, InMemoryClientGateway } from "../../../adapters/secondary/InMemoryClientsGateway"
import { Client } from "../clients-listing/client"
import { getClient } from "./getClient"

describe('Get client', () => {
    let clientGateway: InMemoryClientGateway
    const client: Client = { id: 'abc123', name: 'Henri Martin' }
    const client2: Client = { id: 'def456', name: 'Jacques Chirac' }
  
    beforeEach(() => {
      const uuidGenerator = new FakeUuidGenerator()
      clientGateway = new InMemoryClientGateway(uuidGenerator)
      givenSomeExistingClients(client, client2)
    })

    it.each([[client.id, client], [client2.id, client2]])('should return an existing client with id %s', async (id, c) => {
      const res = await getClient(id, clientGateway)
      expect(res).toEqual(c)
    })
    
    it('should throw an error if the client does not exists', async () => {
      await expect(getClient('notExisting', clientGateway)).rejects.toThrow(ClientDoesNotExistsError)
    })

    const givenSomeExistingClients = (...clients: Array<Client>) => {
        clientGateway.feedWith(...clients)
    }
})