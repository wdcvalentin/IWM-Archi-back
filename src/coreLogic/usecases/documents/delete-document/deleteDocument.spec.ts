import { FakeUuidGenerator } from "../../../../adapters/secondary/fakeUuidGenerator"
import { InMemoryDocumentGateway } from "../../../../adapters/secondary/InMemoryDocumentGateway"
import { Document } from "../../../gateways/document"
import { deleteDocument } from "./deleteDocument"

describe('delete a client', () => {
    let documentGateway: InMemoryDocumentGateway
    const document: Document = { id: 'abc123', name: 'devis-client', type: 'devis', clientId: 'abc123' }
    const document2: Document = { id: 'def456', name: 'facture mai', type: 'facture', clientId: 'abc123'  }

    beforeEach(() => {
        const uuidGenerator = new FakeUuidGenerator()
        documentGateway = new InMemoryDocumentGateway(uuidGenerator)
        givenSomeExistingDocuments(document, document2)
    })

    it('should delete an existing document and return the new array of document', async () => {
        const documents = await deleteDocument(document.id, documentGateway)
        expect(documents).toEqual([document2])
    })

    const givenSomeExistingDocuments = (...documents: Array<Document>) => {
        documentGateway.feedWith(...documents)
    }
})