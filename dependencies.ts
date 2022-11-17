import { RealUuidGenerator } from './src/adapters/secondary/realUuidGenerator'
import { InMemoryClientGateway } from './src/adapters/secondary/InMemoryClientsGateway'
import { ClientGateway } from './src/coreLogic/gateways/ClientGateway'

export const clientGateway = (): ClientGateway => {
//   return new JsonServerProductGateway()
  const client1 = { id: 'abc123', name: 'Martin Matin' }
  const client2 = { id: 'def456', name: 'Emmanuel Macron' }

  const uuidGenerator = new RealUuidGenerator()
  const gateway = new InMemoryClientGateway(uuidGenerator)
  gateway.feedWith(client1, client2)

  return gateway
}