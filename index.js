const BlockChain = require('./server/blockchain');
const initServer = require('./server/server');


const blockchain = new BlockChain();


initServer(blockchain);
