import { DocFile } from '../../../gateways/documentData'
import { DocumentGateway } from '../../../gateways/DocumentGateway'

export const getDocumentById = async (id: string, documentGateway: DocumentGateway): Promise<DocFile> => {
  return await documentGateway.getById(id)
}
