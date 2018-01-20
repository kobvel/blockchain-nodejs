const Block = require('./block');

function createGenesisBlock() {
    return new Block(0, Date.now(), 'Genesis Block', '0');
}

function nextBlock(prevBlock) {
    const index = prevBlock.index + 1;

    return new Block(index, Date.now(), `I'm block ${index}`, prevBlock.hash);
}

function proofOfWork(lastProof) {
    // Create a variable that we will use to find
    // our next proof of work
    let incrementor = lastProof + 1
    // Keep incrementing the incrementor until
    // it's equal to a number divisible by 9
    // and the proof of work of the previous
    // block in the chain
    while (incrementor % 9 == 0 && incrementor % lastProof === 0) {
        incrementor += 1
    }
    // Once that number is found,
    // we can return it as a proof
    // of our work
    return incrementor
}

module.exports = {
    createGenesisBlock,
    nextBlock,
    proofOfWork
};
