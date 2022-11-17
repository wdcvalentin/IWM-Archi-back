import { ClientGateway } from '../../gateways/ClientGateway'
import { Client } from '../clients-listing/client'

export const deleteClient = async (client: Client, clientGateway: ClientGateway): Promise<Boolean> => {
  return await clientGateway.delete(client)
}