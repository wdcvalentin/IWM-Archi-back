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
  private documentsData: Array<DocFile> = []
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

  async getById(id: string): Promise<DocFile> {
    const res = this.documentsData.find((p) => p.idDocument === id)
    if (!res) {
      throw new DocumentDoesNotExistsError(id)
    }
    return res
  }

  async upload(documentData: DocFile, clientId: string): Promise<Document> {
    const newId: string = this.uuidGenerator.generate()
    const newDocument = {
      id: newId,
      name: documentData?.name,
      type: 'pdf',
      clientId
    }
    const documentFile: DocFile = {
      ...documentData,
      idDocument: newId
    }
    this.documentsData.push(documentFile)
    this.documents.push(newDocument)
    console.log('this.documentsData', this.documentsData)
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

  async delete(id: string): Promise<Boolean> {
    this.documents = this.documents.filter(d => d.id !== id)
    
    return Promise.resolve(true)
  }
}