const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const app = express();
const controller = require('./Controller/controller');

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/merkle');
  console.log('Successfully connected with server');
}

app.use(express.json());
app.use('/', router);

router
  .post('/set/:address/:password', controller.setWhitelistAddress)
  .get('/getProof/:address', controller.getMerkleProofForAddress);

app.listen(8888);
