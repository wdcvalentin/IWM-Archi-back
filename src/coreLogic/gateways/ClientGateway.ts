import { Client } from "./client";

export interface ClientGateway {
  listAll(): Promise<Array<Client>>
  getById(id: string): Promise<Client>
  create(name: string): Promise<Client>
  update(client: Client): Promise<Client>
  delete(id: string): Promise<Boolean>
}