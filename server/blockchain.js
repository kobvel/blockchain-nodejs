const Block = require('./block');
const axios = require('axios');

class BlockChain {

    constructor() {
        // create blockchain array with the first genesis block
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, Date.now(), {
            pow: 9,
            transactions: []
        }, '0');
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
        while (!(incrementor % 9 === 0 && incrementor % lastProof === 0)) {
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

    consensus(host, peers) {
        // Get the blocks from other nodes
        const otherChains = this.findNewChains(host, peers);
        console.log(`Found other ${otherChains} chains`);
        // If our chain isn't longest, then we store the longest chain
        let longest_chain = this.chain;

        for (let chain of otherChains) {
            if (longest_chain.length < chain.length) {
                console.log('Replacing with the other node');
                longest_chain = chain;
            }
        }

        // longest_chain = chain;
        // If the longest chain isn't ours, then we stop mining and set
        // our chain to the longest one
        this.chain = longest_chain;
    }

    findNewChains(host, peers) {
        // Get the blockchains of every other node
        const otherChains = [];
        console.log('Searching peer nodes...');

        for (let peer of peers) {
            const getBlocks = async peer => {
                try {
                    const response = await axios.get(`http://${host}:${peer}/blocks`);
                    otherChains.push(response.data);
                } catch (error) {
                    console.log(`Unable to get blocks from the network ${host}:${peer} \n`, error);
                }
            };
            getBlocks(peer);
        }

        return otherChains;
    }

}

module.exports = BlockChain;
