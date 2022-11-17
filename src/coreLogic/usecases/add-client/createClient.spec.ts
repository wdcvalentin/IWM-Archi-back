import { FakeUuidGenerator } from "../../../adapters/secondary/fakeUuidGenerator"
import { InMemoryClientGateway } from "../../../adapters/secondary/InMemoryClientsGateway"
import { Client } from "../clients-listing/client"
import { createClient } from "./createClient"

describe('Create client', () => {
  describe('Create one client', () => {
    const expectedClient: Client = {
      id: 'abc123',
      name: 'Henri Martin'
    }

    let res: any
    let clientGateway: InMemoryClientGateway
    
    beforeEach(async () => {
      const uuidGenerator = new FakeUuidGenerator()
      clientGateway = new InMemoryClientGateway(uuidGenerator)
      uuidGenerator.setNextUuids('abc123')
      res = await createClient('Henri Martin', clientGateway)
    })

    it('should return the created client', () => {
      expect(res).toEqual(expectedClient)
    })
    
    // it('should save the created client', async () => {
    //   expect(await clientGateway.getById(expectedClient.id)).toEqual(expectedClient)
    // })
  })
})