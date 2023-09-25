const { whitelistedAddresses } = require('../Model/collection');
const { MerkleTree } = require('merkletreejs');
const SHA256 = require('crypto-js/sha256');
require('dotenv').config()

exports.setWhitelistAddress = async function (req, res) {
  const password = req.params.password;
  console.log(`password given in parameter: ${password}`);
  if (password !== process.env.PASS) {
    return res.status(403).send('Incorrect password!');
  }
  const addresses = new whitelistedAddresses({ address: req.params.address });
  await addresses.save();
  res.status(200).send("Successfully set address in database.");
};

exports.getMerkleProofForAddress = async function (req, res) {
  const address = req.params.address;
  console.log(`the parameter is this address: ${address}`, '\n');
  const allAddress = await whitelistedAddresses.find();
  const addresses = allAddress.map((doc) => doc.address);
  console.log(`all addresses in database are: ${addresses}`, '\n');
  //res.send(addresses)
  const leaves = addresses.map((x) => SHA256(x));
  console.log(`Leaves are: ${leaves}`, '\n');
  const tree = new MerkleTree(leaves, SHA256);
  console.log(`the tree is: ${tree}`, '\n');
  const root = tree.getHexRoot();
  console.log(`root is : ${root}`, '\n');
  const leaf = SHA256(address);
  console.log(`leaf is: ${leaf}`, '\n');
  const proof = tree.getProof(leaf);
  console.log(`proof is: ${JSON.stringify(proof)}`, '\n');
  console.log(`LET'S VERIFY`, '\n');
  console.log(tree.verify(proof, leaf, root));
  res.send(proof);
};
