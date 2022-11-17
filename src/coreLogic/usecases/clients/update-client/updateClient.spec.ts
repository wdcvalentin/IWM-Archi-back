import { FakeUuidGenerator } from "../../../../adapters/secondary/fakeUuidGenerator"
import { InMemoryClientGateway } from "../../../../adapters/secondary/InMemoryClientsGateway"
import { Client } from "../../../gateways/client"
import { updateClient } from "./updateClient"

describe('Edit a client', () => {
    let clientGateway: InMemoryClientGateway
    const client: Client = { id: 'abc123', name: 'Henri Martin' }
    let res: any
    const updatedClient: Client = { id: 'abc123', name: 'Henriette Martinet' }

    beforeEach(() => {
        const uuidGenerator = new FakeUuidGenerator()
        clientGateway = new InMemoryClientGateway(uuidGenerator)
        givenSomeExistingClients(client)
    })

    it('should edit an existing client', async () => {
        res = await updateClient(updatedClient, clientGateway)
        expect(res).toEqual(updatedClient)
        expect(await clientGateway.getById(client.id)).toEqual(updatedClient)
    })

    const givenSomeExistingClients = (...clients: Array<Client>) => {
        clientGateway.feedWith(...clients)
    }
})