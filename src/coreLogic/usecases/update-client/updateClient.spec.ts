import { FakeUuidGenerator } from "../../../adapters/secondary/fakeUuidGenerator"
import { InMemoryClientGateway } from "../../../adapters/secondary/InMemoryClientsGateway"
import { Client } from "../clients-listing/client"
import { updateClient } from "./updateClient"

describe('Edit a client', () => {
    let clientGateway: InMemoryClientGateway
    const client: Client = { id: 'abc123', name: 'Henri Martin' }
    let res: any

    beforeEach(() => {
        const uuidGenerator = new FakeUuidGenerator()
        clientGateway = new InMemoryClientGateway(uuidGenerator)
        givenSomeExistingClients(client)
    })

    it('should edit an existing client', async () => {
        const updatedClient: Client = { id: 'abc123', name: 'Henriette Martinet' }
        res = await updateClient(updatedClient, clientGateway)
        expect(res).toEqual(updatedClient)
    })

    const givenSomeExistingClients = (...clients: Array<Client>) => {
        clientGateway.feedWith(...clients)
    }
})