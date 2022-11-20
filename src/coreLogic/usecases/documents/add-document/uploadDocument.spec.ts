import { FakeUuidGenerator } from "../../../../adapters/secondary/fakeUuidGenerator"
import { InMemoryDocumentGateway } from "../../../../adapters/secondary/InMemoryDocumentGateway"
import { Document } from "../../../gateways/document"
import { DocFile } from "../../../gateways/documentData"
import { uploadDocument } from "./uploadDocument"
import request from 'supertest';
import app from '../../../../routes/filesRoutes'
import fileUpload from "express-fileupload"
import fs from 'fs'


describe('Upload document', () => {
  afterAll(async () => {
    fs.rmSync('./uploads', { recursive: true, force: true })
  });

  it('should return 200 when uploading file', async () => {
    const res = await request(app)
      .post('/upload')
      .set('content-type', 'text/html; charset=utf-8')
      .field('id', 'abc123')
      .attach('file', `${__dirname}/test_uploads/data.pdf`)
    expect(res.statusCode).toBe(200);
  })

  it('should return 500 when uploading file with wrong extension', async () => {
    const res = await request(app)
      .post('/upload')
      .set('content-type', 'text/html; charset=utf-8')
      .field('id', 'abc123')
      .attach('file', `${__dirname}/test_uploads/data.jpeg`)
    expect(res.statusCode).toBe(500);
  })

  it('should return 500 when uploading file with no clientId', async () => {
    const res = await request(app)
      .post('/upload')
      .set('content-type', 'text/html; charset=utf-8')
      .attach('file', `${__dirname}/test_uploads/data.pdf`)
    expect(res.statusCode).toBe(500);
  })

  it('should save the uploaded file', async () => {
    expect(fs.existsSync('./uploads/data.pdf')).toBe(true)
  })
})