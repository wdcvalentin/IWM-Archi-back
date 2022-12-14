import express, { Express, Request, Response } from 'express';
import clientsRoutes from './src/routes/clientsRoutes.js'
import filesRoutes from './src/routes/filesRoutes.js'
import { listClients } from './src/coreLogic/usecases/clients/clients-listing/listClients';
import { InMemoryClientGateway } from './src/adapters/secondary/InMemoryClientsGateway';

const app: Express = express();
const port = 4000;


let clientGateway: InMemoryClientGateway
app.use('/api/clients', clientsRoutes)
app.use('/api/files', filesRoutes)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
