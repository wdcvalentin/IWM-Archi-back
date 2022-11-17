import { ClientGateway } from '../../gateways/ClientGateway'
import { Client } from '../clients-listing/client'

export const deleteClient = async (id: string, clientGateway: ClientGateway): Promise<Boolean> => {
  return await clientGateway.delete(id)
}