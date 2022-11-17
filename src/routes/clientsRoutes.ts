import express, { Express, Request, Response } from 'express';
import cors = require('cors')
import { listClients } from '../coreLogic/usecases/clients/clients-listing/listClients';
import { getClient } from '../coreLogic/usecases/clients/client-get/getClient';
import { InMemoryClientGateway } from '../adapters/secondary/InMemoryClientsGateway';
import { createClient } from '../coreLogic/usecases/clients/add-client/createClient';
import { clientGateway } from '../../dependencies';
import { updateClient } from '../coreLogic/usecases/clients/update-client/updateClient';
import { deleteClient } from '../coreLogic/usecases/clients/delete-client/deleteClient';

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

let cGateway = clientGateway()

app.get('/', async (req: Request, res: Response) => {
    try {
        const clients = await listClients(cGateway)
        res.send(JSON.stringify(clients))
    } catch (error: any) {
        res.status(404).send(error.message)
    }
})

app.get('/:id', async (req: any, res) => {
  try {
    const id = req.params.id
      const client = await getClient(id, cGateway)
    res.send(JSON.stringify(client))
  } catch (e: any) {
    res.status(404).send(e.message)
  }
})

app.post('/new', async (req: any, res) => {
  const { name } = req.body
  const client = await createClient(name, cGateway)
  res.send(JSON.stringify(client))
})

app.put('/:id', async (req: any, res) => {
    const { id: clientId } = req.params
    const { name } = req.body

    const client = {
        id: clientId,
        name
    }
    const updatedClient = await updateClient(client, cGateway)
    res.send(JSON.stringify(updatedClient))
})

app.delete('/:id', async (req: any, res) => {
    const { id: clientId } = req.params

    const updatedClient = await deleteClient(clientId, cGateway)
    res.send(JSON.stringify(updatedClient))
})

export default app