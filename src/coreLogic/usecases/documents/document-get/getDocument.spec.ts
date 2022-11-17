import { FakeUuidGenerator } from "../../../../adapters/secondary/fakeUuidGenerator"
import { InMemoryDocumentGateway, DocumentDoesNotExistsError } from "../../../../adapters/secondary/InMemoryDocumentGateway"
import { Document } from "../../../gateways/document"
import { getDocument } from "./getDocument"

describe('Get document', () => {
    let documentGateway: InMemoryDocumentGateway
    const document: Document = { id: 'abc123', name: 'devis-client', type: 'devis', clientId: 'abc123' }
    const document2: Document = { id: 'def456', name: 'facture mai', type: 'facture', clientId: 'abc123'  }
  
    beforeEach(() => {
      const uuidGenerator = new FakeUuidGenerator()
      documentGateway = new InMemoryDocumentGateway(uuidGenerator)
      givenSomeExistingClients(document, document2)
    })

    it.each([[document.id, document], [document2.id, document2]])('should return an existing client with id %s', async (id, c) => {
      const res = await getDocument(id, documentGateway)
      expect(res).toEqual(c)
    })
    
    it('should throw an error if the client does not exists', async () => {
      await expect(getDocument('notExisting', documentGateway)).rejects.toThrow(DocumentDoesNotExistsError)
    })

    const givenSomeExistingClients = (...documents: Array<Document>) => {
      documentGateway.feedWith(...documents)
    }
})