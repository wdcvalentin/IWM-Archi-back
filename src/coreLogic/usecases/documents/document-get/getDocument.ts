import { Document } from '../../../gateways/document'
import { DocumentGateway } from '../../../gateways/DocumentGateway'

export const getDocumentById = async (id: string, documentGateway: DocumentGateway): Promise<Document | {}> => {
  return await documentGateway.getById(id)
}
