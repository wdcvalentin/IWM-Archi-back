import express, { Express, Request, Response } from 'express';
import fileUpload from "express-fileupload";
import cors = require('cors')
import { documentGateway } from '../../dependencies';
import { listDocuments } from '../coreLogic/usecases/documents/documents-listing/listDocuments';


const app = express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
// app.use(fileUpload());

let dGateway = documentGateway()

app.get('/', async (req: Request, res: Response) => {
    try {
        const clients = await listDocuments(dGateway)
        res.send(JSON.stringify(clients))
    } catch (error: any) {
        res.status(404).send(error.message)
    }
})

app.post('/upload', fileUpload({ createParentPath: true }), async (req: Request, res: Response) => {
  try {
    const files = req.files
    res.send(files)
      // const clients = await listClients(dGateway)
      // res.send(JSON.stringify(clients))
  } catch (error: any) {
      res.status(404).send(error.message)
  }
})

export default app