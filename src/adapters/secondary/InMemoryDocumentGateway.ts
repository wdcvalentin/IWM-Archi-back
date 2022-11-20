import fileUpload from 'express-fileupload'
import { Document } from '../../coreLogic/gateways/document'
import { DocFile } from '../../coreLogic/gateways/documentData'
import { DocumentGateway } from '../../coreLogic/gateways/DocumentGateway'
import { UuidGenerator } from '../../coreLogic/gateways/uuidGenerator'

export class DocumentDoesNotExistsError extends Error {
  constructor(id: string) {
    super(`Document ${id} does not exists`)
  }
}

export class InMemoryDocumentGateway implements DocumentGateway {
  private documents: Array<Document> = []
  private uuidGenerator: UuidGenerator

  constructor(uuidGenerator: UuidGenerator) {
    this.uuidGenerator = uuidGenerator
  }

  feedWith(...documents: Array<Document>) {
    this.documents = documents
  }

  async listAll(): Promise<Array<Document>> {
    return Promise.resolve(this.documents)
  }

  async getById(id: string): Promise<Document | {}> {
    const res = this.documents.find((p) => p.id === id)
    if (!res) {
      return {}
    }
    return res
  }

  async upload(documentData: fileUpload.UploadedFile | undefined | null, clientId: string): Promise<Document> {
    const newDocument = {
      id: this.uuidGenerator.generate(),
      name: documentData?.name,
      type: 'pdf',
      clientId
    }
    documentData?.mv('./uploads/' + documentData.name);
    this.documents.push(newDocument)
    return Promise.resolve(newDocument)
  }

  async update(document: Document): Promise<Document> {
    const index = this.documents.findIndex((d => d.id === document.id))
    if (!index) {
        throw new DocumentDoesNotExistsError(document.id)
    }
    this.documents[index] = document

    return Promise.resolve(document)
  }

  async delete(id: string): Promise<Array<Document>> {
    this.documents = this.documents.filter(d => d.id !== id)
    return Promise.resolve(this.documents)
  }
}