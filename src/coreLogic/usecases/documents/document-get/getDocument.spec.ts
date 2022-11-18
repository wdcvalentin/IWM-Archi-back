import { FakeUuidGenerator } from '../../../../adapters/secondary/fakeUuidGenerator'
import { InMemoryDocumentGateway } from '../../../../adapters/secondary/InMemoryDocumentGateway'
import { Client } from '../../../gateways/client'
import { Document } from '../../../gateways/document'
import { DocumentData } from '../../../gateways/documentData'
import { getDocumentById, listDocuments } from './getDocument'

describe('Get the real pdf document for front', () => {
  let documentGateway: any
  const client: Client = { id: 'abc123', name: 'Jacques Chirac' }
  const uploadedDocument: DocumentData = {
    undefined: {
      name: 'data.pdf',
      data: {
        type: 'Buffer',
        data: [1, 2, 3] 
      },
      size: 208494,
      encoding: '7bit',
      tempFilePath: '',
      truncated: false,
      mimetype: 'application/pdf',
      md5: 'b8c9cfd5ae6a7057af486c0b91b53fb9'
    }
  }

  beforeEach(() => {
    const uuidGenerator = new FakeUuidGenerator()
    documentGateway = new InMemoryDocumentGateway(uuidGenerator)
  })
  
  it('should not list the document when it is not available', async () => {
    const res = await listDocuments(documentGateway)
    expect(res).toEqual({})
  })

  it('should list the pdf document when it is available', async () => {
    const doc1: Document = { id: 'abc123', name: 'cours 1', type: 'devis', clientId: client.id }
    await Promise.all([givenSomeExistingDocuments(doc1), givenSomeExistingDocumentsData(uploadedDocument)])
    const res = await getDocumentById(doc1.id, documentGateway)
    expect(res).toEqual(uploadedDocument)
  })

  const givenSomeExistingDocuments = (...documents: Array<Document>) => {
    documentGateway.feedWith(...documents)
  }
  const givenSomeExistingDocumentsData = (...documentsData: Array<DocumentData>) => {
    documentGateway.feedWith(...documentsData)
  }
})