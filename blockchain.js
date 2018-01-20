const Block = require('./block');

function createGenesisBlock() {
    return new Block(0, Date.now(), 'Genesis Block', '0');
}

function nextBlock(prevBlock) {
    const index = prevBlock.index + 1;

    return new Block(index, Date.now(), `I'm block ${index}`, prevBlock.hash);
}

module.exports = {
    createGenesisBlock,
    nextBlock
};
