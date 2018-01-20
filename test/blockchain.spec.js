const blockchain = require('../blockchain');
const validator = require('validator');


describe("Blockchain helpers", () => {
    it("should create correct Genesis block", () => {
        const sut = blockchain.createGenesisBlock;
        const sutResult = sut();

        const initialIndex = 0;
        const initialData = 'Genesis Block';

        expect(sutResult.index).toBe(initialIndex);
        expect(new Date(sutResult.timestamp) instanceof Date).toBeTruthy();
        expect(sutResult.timestamp).toBeCloseTo(Date.now(), -1);
        expect(sutResult.data).toBe(initialData);
        expect(validator.isHash(sutResult.hash, 'sha256')).toBeTruthy();
    });

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
});
