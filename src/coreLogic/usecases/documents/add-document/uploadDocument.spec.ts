import { FakeUuidGenerator } from "../../../../adapters/secondary/fakeUuidGenerator"
import { InMemoryDocumentGateway } from "../../../../adapters/secondary/InMemoryDocumentGateway"
import { Document } from "../../../gateways/document"
import { DocFile } from "../../../gateways/documentData"
import { uploadDocument } from "./uploadDocument"
import fs from 'fs'

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
    md5: 'b8c9cfd5ae6a7057af486c0b91b53fb9',
    mv: () => console.log('moving file')
  }
  let documentGateway: InMemoryDocumentGateway
  let res: Document;

  beforeEach(async () => {
    const uuidGenerator = new FakeUuidGenerator()
    documentGateway = new InMemoryDocumentGateway(uuidGenerator)
    uuidGenerator.setNextUuids('abc123')
    res = await uploadDocument(uploadedDocument, 'abc123', documentGateway)
  })

  it('should return the uploaded file', async () => {
    expect(res).toEqual(expectedDocument)
  })

  // it.only('should throw an error if there is no clientId while uploading file', async () => {
  //   const uuidGenerator = new FakeUuidGenerator()
  //   documentGateway = new InMemoryDocumentGateway(uuidGenerator)
  //   expect(await uploadDocument(uploadedDocument, '', documentGateway)).toThrowError()
  // })

  // it('should save the uploaded file', async () => {
  //   expect(fs.existsSync(`./uploads/${res.name}`)).toBe(true)
  // })
})