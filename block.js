const crypto = require('crypto-js');

class Block {
    /**
     * @param  {number} index
     * @param  {number} timestamp
     * @param  {Object} data
     * @param  {string} prevHash
     */
    constructor(index, timestamp, data, prevHash) {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.prevHash = prevHash;
        this.hash = this.hashBlock();
    }

    hashBlock() {
        const strToHash = this.index + this.timestamp + this.data + this.prevHash;

        return crypto.SHA256(strToHash).toString();
    }
}

module.exports = Block;
