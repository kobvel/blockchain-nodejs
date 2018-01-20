const Block = require('./block');


function createGenesisBlock() {
    return new Block(0, Date.now(), 'Genesis Block', '0');
}

function nextBlock(prevBlock) {
    const index = prevBlock.index + 1;

    return new Block(index, Date.now(), `I'm block ${index}`, prevBlock.hash);
}

const blockchain = [createGenesisBlock()];
const numberOfBlocks = 20;

let prevBlock = blockchain[0];
let i = 0;

while (i < 20) {
    const newBlock = nextBlock(prevBlock);
    blockchain.push(newBlock);
    prevBlock = newBlock;
    console.log(`Block ${newBlock.index} has been added to the blockchain!`)
    console.log(`Hash: ${newBlock.hash}\n`);
    i++;
}

console.log(blockchain);
