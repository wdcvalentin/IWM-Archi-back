import { DocumentGateway } from '../../../gateways/DocumentGateway'
import { Document } from '../../../gateways/document'

export const createDocument = async (name: string, type: string, clientId: string, documentGateway: DocumentGateway): Promise<Document> => {
  return await documentGateway.upload(name, type, clientId)
}