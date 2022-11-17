import { ClientGateway } from '../../gateways/ClientGateway'
import { Client } from '../clients-listing/client'

export const updateClient = async (client: Client, clientGateway: ClientGateway): Promise<Client> => {
  return await clientGateway.update(client)
}