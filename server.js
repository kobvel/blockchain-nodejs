const express = require('express');
const bodyParser = require('body-parser');
const Transaction = require('./transaction');
const Blockchain = require('./blockchain');
const Block = require('./block');

const httpPort = '8080';
const minerAddress = "q3nf394hjg-random-miner-address-34nf3i4nflkn3oi";

/**
 * @param  {Blockchain} blockchain
 */
function initServer(blockchain) {
    const chain = blockchain.chain;
    const app = express();
    app.use(bodyParser.json());

    let nodeTransactions = [];

    app.get('/blocks', (req, res) => res.send(JSON.stringify(chain)));
    app.post('/txion', (req, res) => {
        const transaction = req.body;
        nodeTransactions.push(transaction);

        console.log(`
        New transaction
        FROM: ${transaction.from}
        TO: ${transaction.to}
        AMOUNT: ${transaction.amount}
        `);

        res.send("Transaction submission successful\n");
    });

    app.get('/mine', (req, res) => {
        const lastBlock = chain[chain.length - 1];
        const lastProof = lastBlock.data['pow'];
        /*
            Find the proof of work for
            the current block being mined
            Note: The program will hang here until a new
            proof of work is found
        */
        const proof = blockchain.proofOfWork(lastProof)
        /*
            Once we find a valid proof of work,
            we know we can mine a block so
            we reward the miner by adding a transaction
        */
        nodeTransactions.push(new Transaction('network', 'minerAddress', 1));

        // Now we can gather data to create new block
        const newBlockData = {
            pow: proof,
            transactions: nodeTransactions
        };
        const newBlockIndex = lastBlock.index + 1;
        const newBlockTimestamp = Date.now();
        const lastBlockHash = lastBlock.hash;

        // Empty transaction list
        nodeTransactions = [];

        const minedBlock = new Block(newBlockIndex, newBlockTimestamp, newBlockData, lastBlockHash);
        chain.push(minedBlock);

        res.send(JSON.stringify(minedBlock));
    });

    app.listen(httpPort, () => console.log('Listening http on port: ' + httpPort));
}

module.exports = initServer;
