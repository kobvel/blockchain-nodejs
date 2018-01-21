const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const http_port = process.env.HTTP_PORT || 8080;

/**
 * @param  {Blockchain} blockchain
 */
function initServer(blockchain) {
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

    app.get('/mine', async(req, res) => {
        const minedBlock = await blockchain.mineBlock();

        res.send(JSON.stringify(minedBlock));
    });

    app.listen(http_port, () => console.log('Listening http on port: ' + http_port));

}

module.exports = initServer;
