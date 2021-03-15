import express from 'express';
import routers from './routers/export.routers';
import bodyParser from 'body-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import './mongo.config';

const server = express();
server.use(cors());
server.use(express.json());
server.use(bodyParser.json());
server.use(fileUpload());
server.use('/api', routers);

server.use('/assets', express.static('./server/assets/img'));

server.listen(process.env.SERVER_PORT, () => console.log(`Listening on port ${process.env.SERVER_PORT}`));
