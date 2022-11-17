import { Client } from "../usecases/clients-listing/client";

export interface ClientGateway {
  listAll(): Promise<Array<Client>>
}