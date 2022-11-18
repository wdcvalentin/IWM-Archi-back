import { FakeUuidGenerator } from "../../../../adapters/secondary/fakeUuidGenerator"
import { InMemoryDocumentGateway } from "../../../../adapters/secondary/InMemoryDocumentGateway"
import { Document } from "../../../gateways/document"
import { DocFile } from "../../../gateways/documentData"
import { uploadDocument } from "./uploadDocument"

describe('Upload document', () => {
  const expectedDocument: Document = {
    id: 'abc123',
    name: 'data.pdf',
    type: 'pdf',
    clientId: 'abc123'
  }

  const uploadedDocument: DocFile = {
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
  let documentGateway: InMemoryDocumentGateway

  it('should return the uploaded file', async () => {
    const uuidGenerator = new FakeUuidGenerator()
    documentGateway = new InMemoryDocumentGateway(uuidGenerator)
    uuidGenerator.setNextUuids('abc123')
    let res: Document = await uploadDocument(uploadedDocument, 'abc123', documentGateway)
    expect(res).toEqual(expectedDocument)
  })

  it('should throw an error 500 if there is no clientId when uploaded file', async () => {
    let res: Document = await uploadDocument(uploadedDocument, 'abc123', documentGateway)
    expect(res).toThrowError()
  })

  it('should save the created client', async () => {
    expect(await documentGateway.getById(expectedDocument.id)).toEqual(expectedDocument)
  })
})