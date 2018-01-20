const crypto = require('crypto-js');

class Block {
    constructor(index, timestamp, data, previousHash) {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.hashBlock();
    }

    hashBlock() {
        const strToHash = this.index + this.timestamp + this.data + this.previousHash;

        return crypto.SHA256(strToHash).toString();
    }
}

module.exports = Block;
