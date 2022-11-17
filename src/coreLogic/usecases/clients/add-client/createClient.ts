import { ClientGateway } from '../../../gateways/ClientGateway'
import { Client } from '../../../gateways/client'

export const createClient = async (name: string, clientGateway: ClientGateway): Promise<Client> => {
  return await clientGateway.create(name)
}