import { listClients } from './listClients'
import { Client } from './client'
import { ClientGateway } from '../../gateways/ClientGateway'
import { FakeUuidGenerator } from '../../../adapters/secondary/fakeUuidGenerator'
import { InMemoryClientGateway } from '../../../adapters/secondary/InMemoryClientsGateway'

describe('List clients', () => {
    let clientGateway: any
    
    beforeEach(() => {
      const uuidGenerator = new FakeUuidGenerator()
      clientGateway = new InMemoryClientGateway(uuidGenerator)
    })
    
    it('should not list any client when no one is available', async () => {
      const res = await listClients(clientGateway)
      expect(res).toEqual([])
    })

    it('should list all clients when there is available clients', async () => {
        const client1: Client = { id: 'abc123', name: 'Jacques Chirac' }
        const client2: Client = { id: 'de456', name: 'Leopold Durant' }
        givenSomeExistingClients(client1, client2)

        const res = await listClients(clientGateway)
        expect(res).toEqual([client1, client2])
    })
    const givenSomeExistingClients = (...clients: Array<Client>) => {
        clientGateway.feedWith(...clients)
    }
})