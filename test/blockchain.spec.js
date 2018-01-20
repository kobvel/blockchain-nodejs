const Blockchain = require('../blockchain');
const validator = require('validator');


describe("Blockchain", () => {
    let blockchain;

    beforeEach(() => {
        blockchain = new Blockchain();
    });

    it("should create correct Genesis block", () => {
        const sut = blockchain.createGenesisBlock();

        const initialIndex = 0;
        const initialData = JSON.stringify({
            pow: 9,
            transactions: []
        });

        expect(sut.index).toBe(initialIndex);
        expect(new Date(sut.timestamp) instanceof Date).toBeTruthy();
        expect(sut.timestamp).toBeCloseTo(Date.now(), -1);
        expect(JSON.stringify(sut.data)).toBe(initialData);
        expect(validator.isHash(sut.hash, 'sha256')).toBeTruthy();
    });

    it('should create a chain with the genesis block', () => {
        const sut = blockchain;

        expect(sut.chain).toBeDefined();
        expect(sut.chain.length).toBe(1);
    })

    it("it should generate correct Next block", () => {
        const sut = blockchain.nextBlock;

        const index = 12;
        const lastBlock = {
            index,
            timestamp: Date.now(),
            data: 'I\'m block 12',
            prevHash: 0,
            hash: '6d27a40bd55c5b9dc3bf28f2623f46b12e7171df1a54a3b6f5deacb44dea424c'
        };
        const expectedIndex = index + 1;
        const expectedData = `I'm block ${expectedIndex}`;

        const sutResult = sut(lastBlock);

        expect(sutResult.index).toBe(expectedIndex);
        expect(sutResult.timestamp).toBeCloseTo(Date.now(), -1);
        expect(sutResult.data).toBe(expectedData);
        expect(validator.isHash(sutResult.hash, 'sha256')).toBeTruthy();
    });

    it('should add block to chain', () => {
        const newBlock = {
            index: 1,
            timestamp: Date.now(),
            data: 'I\'m block 12',
            prevHash: 0,
            hash: '6d27a40bd55c5b9dc3bf28f2623f46b12e7171df1a54a3b6f5deacb44dea424c'
        };
        blockchain.addBlock(newBlock);
        const sut = blockchain.chain;

        expect(sut.length).toBe(2);
        expect(sut[sut.length - 1]).toBe(newBlock);
    });

    it('should count proof of work', () => {
        const sut = blockchain.proofOfWork;
        const result = sut(9);

        expect(result).toBe(18);
    });
});
