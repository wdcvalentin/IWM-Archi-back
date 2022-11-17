import { ClientGateway } from '../../../gateways/ClientGateway'
import { Client } from '../../../gateways/client'

export const listClients = async (clientGateway: ClientGateway): Promise<Array<Client>> => {
  return await clientGateway.listAll()
}
