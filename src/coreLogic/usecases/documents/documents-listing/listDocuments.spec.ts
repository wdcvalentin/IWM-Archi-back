import { listDocuments } from './listDocuments'
import { Document } from '../../../gateways/document'
import { DocumentGateway } from '../../../gateways/DocumentGateway'
import { FakeUuidGenerator } from '../../../../adapters/secondary/fakeUuidGenerator'
import { Client } from '../../../gateways/client'
import { InMemoryDocumentGateway } from '../../../../adapters/secondary/InMemoryDocumentGateway'

describe('List documents', () => {
  let documentGateway: any
  const client: Client = { id: 'abc123', name: 'Jacques Chirac' }
  
  beforeEach(() => {
    const uuidGenerator = new FakeUuidGenerator()
    documentGateway = new InMemoryDocumentGateway(uuidGenerator)
  })
  
  it('should not list any document when no one is available', async () => {
    const res = await listDocuments(documentGateway)
    expect(res).toEqual([])
  })

  it('should list all documents when there is available documents', async () => {
    const doc1: Document = { id: 'abc123', name: 'cours 1', type: 'devis', clientId: client.id }
    const doc2: Document = { id: 'de456', name: 'cours 2', type: 'facture', clientId: client.id }
    givenSomeExistingDocuments(doc1, doc2)

    const res = await listDocuments(documentGateway)
    expect(res).toEqual([doc1, doc2])
  })

  const givenSomeExistingDocuments = (...documents: Array<Document>) => {
    documentGateway.feedWith(...documents)
  }
})