import { Document } from "./document";

export interface DocumentGateway {
  listAll(): Promise<Array<Document>>
  getById(id: string): Promise<Document>
  upload(name: string, type: string, clientId: string): Promise<Document>
  update(document: Document): Promise<Document>
  delete(id: string): Promise<Boolean>
}