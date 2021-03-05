import express from 'express';

const port = 3000;
const server = express();

server.use('/assets', express.static('./dist/assets'));

server.listen(port, () => console.log(`Listening on port ${port}`));
