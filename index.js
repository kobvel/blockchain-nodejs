const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const http_port = process.env.HTTP_PORT || 8080;

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
        res.status(500).send('No wallet address!');
    }
    const minedBlock = await blockchain.mineBlock(req.body.wallet);

    res.send(JSON.stringify(minedBlock));
});

app.listen(http_port, () => console.log('Listening http on port: ' + http_port));
