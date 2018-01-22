const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const http_port = process.env.HTTP_PORT || 8080;
const validator = require('validator');

const BlockChain = require('./server/blockchain');

const blockchain = new BlockChain();


const app = express();
app.use(bodyParser.json());

let nodeTransactions = [];

app.use(express.static(path.join(__dirname, '../client')));
app.get('/blocks', (req, res) => res.send(JSON.stringify(blockchain.chain)));

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

app.post('/mine', async(req, res) => {
    if (!req.body.wallet) {
        res.sendStatus(400);
    }
    const minedBlock = await blockchain.mineBlock(req.body.wallet);

    res.send(JSON.stringify(minedBlock));
});

app.get('/balance/:address', async(req, res) => {
    const senderAddress = req.params.address;

    if (!validator.isHash(senderAddress, 'sha256')) {
        console.log(senderAddress)
        res.sendStatus(400);
    }

    const balance = await blockchain.getBalance(senderAddress);

    res.send(JSON.stringify(balance));
});

app.listen(http_port, () => console.log('Listening http on port: ' + http_port));
