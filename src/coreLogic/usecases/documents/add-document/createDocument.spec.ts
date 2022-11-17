import { FakeUuidGenerator } from "../../../../adapters/secondary/fakeUuidGenerator"
import { InMemoryClientGateway } from "../../../../adapters/secondary/InMemoryClientsGateway"
import { InMemoryDocumentGateway } from "../../../../adapters/secondary/InMemoryDocumentGateway"
import { Document } from "../../../gateways/document"
import { createDocument } from "./createDocument"

describe('Upload document', () => {
  const expectedDocument: Document = {
    id: 'abc123',
    name: 'Henri Martin',
    type: 'pdf',
    clientId: 'abc123'
  }

  let res: any
  let documentGateway: InMemoryDocumentGateway

  beforeEach(async () => {
    const uuidGenerator = new FakeUuidGenerator()
    documentGateway = new InMemoryDocumentGateway(uuidGenerator)
    uuidGenerator.setNextUuids('abc123')
    res = await createDocument(expectedDocument.id, expectedDocument.name, expectedDocument.type, documentGateway)
  })

  it('should return the uploaded file', () => {
    expect(res).toEqual(expectedDocument)
  })

  it('should save the created client', async () => {
    expect(await documentGateway.getById(expectedDocument.id)).toEqual(expectedDocument)
  })
})