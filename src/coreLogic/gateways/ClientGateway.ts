import { Client } from "../usecases/clients-listing/client";

export interface ClientGateway {
  listAll(): Promise<Array<Client>>
  getById(id: string): Promise<Client>
  create(name: string): Promise<Client>
  update(client: Client): Promise<Client>
}