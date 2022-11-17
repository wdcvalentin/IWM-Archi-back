import { DocumentGateway } from '../../coreLogic/gateways/DocumentGateway'
import { UuidGenerator } from '../../coreLogic/gateways/uuidGenerator'
import { Document } from '../../coreLogic/gateways/document'

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

  async getById(id: string): Promise<Document> {
    const res = this.documents.find((p) => p.id === id)
    if (!res) {
      throw new DocumentDoesNotExistsError(id)
    }
    return res
  }

  async upload(name: string, type: string, clientId: string): Promise<Document> {
    const newDocument = {
      id: this.uuidGenerator.generate(),
      name,
      type, 
      clientId
    }
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

  async delete(id: string): Promise<Boolean> {
    this.documents = this.documents.filter(d => d.id !== id)
    
    return Promise.resolve(true)
  }
}