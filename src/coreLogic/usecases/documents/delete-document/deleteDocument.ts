import { DocumentGateway } from '../../../gateways/DocumentGateway'
import { Document } from '../../../gateways/document'

export const deleteDocument = async (id: string, documentGateway: DocumentGateway): Promise<Array<Document>> => {
  return documentGateway.delete(id)
}