import { FakeUuidGenerator } from "../../../adapters/secondary/fakeUuidGenerator"
import { InMemoryClientGateway } from "../../../adapters/secondary/InMemoryClientsGateway"
import { Client } from "../clients-listing/client"
import { deleteClient } from "./deleteClient"

describe('delete a client', () => {
    let clientGateway: InMemoryClientGateway
    const client: Client = { id: 'abc123', name: 'Henri Martin' }
    const client2: Client = { id: 'def456', name: 'Jacques Chirac' }
    let isDeleted: Boolean = false

    beforeEach(() => {
        const uuidGenerator = new FakeUuidGenerator()
        clientGateway = new InMemoryClientGateway(uuidGenerator)
        givenSomeExistingClients(client, client2)
    })

    it('should edit an existing client', async () => {
        isDeleted = await deleteClient(client.id, clientGateway)
        const allClients = await clientGateway.listAll()
        
        expect(isDeleted).toBe(true)
        expect(allClients).toEqual([client2])
    })

    const givenSomeExistingClients = (...clients: Array<Client>) => {
        clientGateway.feedWith(...clients)
    }
})