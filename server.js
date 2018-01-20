const express = require('express');
const bodyParser = require('body-parser');
const Transaction = require('./transaction');

const httpPort = '8080';
const minerAddress = "q3nf394hjg-random-miner-address-34nf3i4nflkn3oi";

/**
 * @param  {Array} chain
 */
function initServer(chain) {
    var app = express();
    app.use(bodyParser.json());

    const nodeTransactions = [];

    app.get('/blocks', (req, res) => res.send(JSON.stringify(chain)));
    app.post('/txion', (req, res) => {
        const transaction = req.body;
        nodeTransactions.push(transaction);

        console.log(`
        New transaction
        --------------------------
        FROM: ${transaction.from}
        TO: ${transaction.to}
        AMOUNT: ${transaction.amount}
        --------------------------
        Transaction Successfull!`);

        res.send();
    });


    app.listen(httpPort, () => console.log('Listening http on port: ' + httpPort));
}

module.exports = initServer;
