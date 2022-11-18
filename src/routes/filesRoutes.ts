import express, { Request, Response } from 'express';
import fs from 'fs';
import { documentGateway } from '../../dependencies';
import { DocFile } from '../coreLogic/gateways/documentData';
import { uploadDocument } from '../coreLogic/usecases/documents/add-document/uploadDocument';
import { getDocumentById } from '../coreLogic/usecases/documents/document-get/getDocument';
import { listDocuments } from '../coreLogic/usecases/documents/documents-listing/listDocuments';
import cors = require('cors')
import fileUpload = require('express-fileupload');

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
// app.use(fileUpload());

let dGateway = documentGateway()

app.get('/', async (req: Request, res: Response) => {
    try {
        const documents = await listDocuments(dGateway)
        res.send(JSON.stringify(documents))
    } catch (error: any) {
        res.status(404).send(error.message)
    }
})

app.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    if (!id) res.status(500).send('No document identification')
    try {
        const document: DocFile = await getDocumentById(id, dGateway)
        // res.send(JSON.stringify(documents))
        var data = fs.readFileSync(`./uploads/${document.name}`);
        res.contentType("application/pdf");
        res.send(data);
    } catch (error: any) {
        res.status(404).send(error.message)
    }
})

app.post('/upload', fileUpload({ createParentPath: true }), async (req: Request, res: Response) => {
    if (!req.body.id) res.status(500).send('No client identification')

    const clientId: string = req.body.id
    const { undefined: file }: DocFile = req.files
    file.mv('./uploads/' + file.name);
    try {
        const document = await uploadDocument(file, clientId, dGateway)
        res.send(JSON.stringify(document))
    } catch (error: any) {
        res.status(404).send(error.message)
    }
})

export default app