import { DocumentGateway } from "../../../gateways/DocumentGateway"

export const getDocument = async(id: string, documentGateway: DocumentGateway) => {
  return documentGateway.getById(id)
}