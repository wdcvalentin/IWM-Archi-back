import { Document } from "./document";
import { DocFile } from "./documentData";

export interface DocumentGateway {
  listAll(): Promise<Array<Document>>
  getById(id: string): Promise<DocFile>
  upload(documentData: DocFile, clientId: string): Promise<Document>
  update(document: Document): Promise<Document>
  delete(id: string): Promise<Boolean>
}