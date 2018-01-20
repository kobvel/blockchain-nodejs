const Block = require('./block');

class BlockChain {

    constructor() {
        // create blockchain array with the first genesis block
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, Date.now(), { pow: 9, transactions: [] }, '0');
    }

    nextBlock(prevBlock) {
        const index = prevBlock.index + 1;

        return new Block(index, Date.now(), `I'm block ${index}`, prevBlock.hash);
    }

    proofOfWork(lastProof) {
        // Create a variable that we will use to find
        // our next proof of work
        let incrementor = lastProof + 1;
        // Keep incrementing the incrementor until
        // it's equal to a number divisible by 9
        // and the proof of work of the previous
        // block in the chain
        while (incrementor % 9 !== 0 && incrementor % lastProof !== 0) {
            incrementor += 1;
        }
        // Once that number is found,
        // we can return it as a proof
        // of our work
        return incrementor;
    }

    addBlock(block) {
        this.chain.push(block);
    }

}

module.exports = BlockChain;
