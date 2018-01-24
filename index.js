const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const http_port = process.env.HTTP_PORT || 8080;
const walletConnectedVersion = process.env.WALLET_CONNECTED || false;
const validator = require('validator');

const BlockChain = require('./server/blockchain');

const blockchain = new BlockChain();


const app = express();
app.use(bodyParser.json());

app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

if (walletConnectedVersion) {
    app.use(express.static(path.join(__dirname, './wallet/dist')));
} else {
    app.use(express.static(path.join(__dirname, '../client')));
}

app.get('/hosts', (req, res) => {
    res.send(['']);
});


app.get('/blocks', (req, res) => res.send(JSON.stringify(blockchain.chain)));

app.get('/transactions', async(req, res) => {
    const txs = await blockchain.getTransactions();

    res.send(JSON.stringify(txs));
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

app.post('/transfer', async(req, res) => {

    if (!validator.isHash(req.body.from, 'sha256') && !validator.isHash(req.body.to, 'sha256')) {
        res.sendStatus(400);
    }

    if (req.body.to === req.body.from) {
        res.status(400).send('Sender and Address can\'t have the same hash!');
    }

    const balance = await blockchain.getBalance(req.body.from);

    if (balance < req.body.amount) {
        res.status(406).send('Out of balance!');
    }

    const transaction = await blockchain.sendCoins(req.body);

    res.send(JSON.stringify(transaction));
});


app.listen(http_port, () => console.log('Listening http on port: ' + http_port));
