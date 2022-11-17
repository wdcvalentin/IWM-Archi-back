import { RealUuidGenerator } from './src/adapters/secondary/realUuidGenerator'
import { InMemoryClientGateway } from './src/adapters/secondary/InMemoryClientsGateway'
import { InMemoryDocumentGateway } from './src/adapters/secondary/InMemoryDocumentGateway'
import { DocumentGateway } from './src/coreLogic/gateways/DocumentGateway'
import { ClientGateway } from './src/coreLogic/gateways/ClientGateway'
import { Document } from './src/coreLogic/gateways/document'

export const clientGateway = (): ClientGateway => {
//   return new JsonServerProductGateway()
  const client1 = { id: 'abc123', name: 'Martin Matin' }
  const client2 = { id: 'def456', name: 'Emmanuel Macron' }

  const uuidGenerator = new RealUuidGenerator()
  const gateway = new InMemoryClientGateway(uuidGenerator)
  gateway.feedWith(client1, client2)

  return gateway
}

export const documentGateway = (): DocumentGateway => {
    const client1 = { id: 'abc123', name: 'Martin Matin' }
    const client2 = { id: 'def456', name: 'Emmanuel Macron' }
    const doc1: Document = { id: 'abc123', name: 'cours 1', type: 'devis', clientId: client1.id }
    const doc2: Document = { id: 'de456', name: 'cours 2', type: 'facture', clientId: client2.id }
    const uuidGenerator = new RealUuidGenerator()
    const gateway = new InMemoryDocumentGateway(uuidGenerator)
    gateway.feedWith(doc1, doc2)
  
    return gateway
  }