import { ClientGateway } from '../../../gateways/ClientGateway'
import { Client } from '../../../gateways/client'

export const updateClient = async (client: Client, clientGateway: ClientGateway): Promise<Client> => {
  return await clientGateway.update(client)
}