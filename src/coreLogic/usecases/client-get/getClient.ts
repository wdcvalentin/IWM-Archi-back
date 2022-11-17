import { ClientGateway } from "../../gateways/ClientGateway"

export const getClient = async(id: string, clientGateway: ClientGateway) => {
  return clientGateway.getById(id)
}