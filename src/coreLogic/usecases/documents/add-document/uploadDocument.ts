import { Document } from '../../../gateways/document'
import { DocFile } from '../../../gateways/documentData'
import { DocumentGateway } from '../../../gateways/DocumentGateway'

export const uploadDocument = async (
  file: DocFile,
  clientId: string,
  documentGateway: DocumentGateway
): Promise<Document> => {
  if (!clientId) {
    throw Error('empty clientId')
  }

  return await documentGateway.upload(file, clientId)
}