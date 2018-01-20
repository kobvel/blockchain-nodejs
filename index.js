const blockchain = require('./blockchain');

const chain = [blockchain.createGenesisBlock()];
const numberOfBlocks = 20;

let prevBlock = chain[0];
let i = 0;

while (i < numberOfBlocks) {
    const newBlock = blockchain.nextBlock(prevBlock);
    chain.push(newBlock);
    prevBlock = newBlock;
    console.log(`Block ${newBlock.index} has been added to the blockchain!`)
    console.log(`Hash: ${newBlock.hash}\n`);
    i++;
}

console.log(chain);
