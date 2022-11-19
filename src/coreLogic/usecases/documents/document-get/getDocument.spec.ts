import { FakeUuidGenerator } from '../../../../adapters/secondary/fakeUuidGenerator'
import { InMemoryDocumentGateway } from '../../../../adapters/secondary/InMemoryDocumentGateway'
import { Client } from '../../../gateways/client'
import { Document } from '../../../gateways/document'
import { getDocumentById } from './getDocument'

describe('Get the real pdf document for front', () => {
  let documentGateway: any
  const client: Client = { id: 'abc123', name: 'Jacques Chirac' }

  beforeEach(() => {
    const uuidGenerator = new FakeUuidGenerator()
    documentGateway = new InMemoryDocumentGateway(uuidGenerator)
  })

  it('should not list the document when it is not available', async () => {
    const doc1: Document = { id: 'abc123', name: 'cours 1', type: 'devis', clientId: client.id }
    const doc2: Document = { id: 'dlkzqgrenjkngiksns', name: 'not a file', type: 'devis', clientId: client.id }
    givenSomeExistingDocuments(doc1)
    const res = await getDocumentById(doc2.id, documentGateway)
    expect(res).toEqual({})
  })

  it('should get the document when it is available', async () => {
    const doc1: Document = { id: 'abc1234', name: 'cours 1', type: 'devis', clientId: client.id }
    givenSomeExistingDocuments(doc1)
    const res = await getDocumentById(doc1.id, documentGateway)
    const expected = {
      clientId: "abc123",
      id: "abc1234",
      name: "cours 1",
      type: "devis",
    }
    expect(res).toEqual(expected)
  })

  const givenSomeExistingDocuments = (...documents: Array<Document>) => {
    documentGateway.feedWith(...documents)
  }
})