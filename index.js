const BlockChain = require('./blockchain');
const initServer = require('./server');


const blockchain = new BlockChain();


initServer(blockchain);
