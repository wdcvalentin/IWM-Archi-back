import { DocumentGateway } from '../../../gateways/DocumentGateway'
import { Document } from '../../../gateways/document'

export const listDocuments = async (documentGateway: DocumentGateway): Promise<Array<Document>> => {
  return await documentGateway.listAll()
}
