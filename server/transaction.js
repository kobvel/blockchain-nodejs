class Transaction {

    /**
     * @param  {string} from hash address of an sender
     * @param  {string} to hash address of the wallet
     * @param  {number} amount
     */
    constructor(from, to, amount) {
        this.from = from;
        this.to = to;
        this.amount = amount;
        this.timestamp = Date.now();
    }
}

module.exports = Transaction;
