const expect = require('chai').expect;
const sinon = require('sinon');
require('chai').use(require('sinon-chai'));

const Blockchain = require('../server/blockchain');
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

        expect(sut.index).to.be.equal(initialIndex);
        expect(new Date(sut.timestamp) instanceof Date).to.be.true;
        expect(sut.timestamp).to.be.closeTo(Date.now(), 5);
        expect(JSON.stringify(sut.data)).to.be.equal(initialData);
        expect(validator.isHash(sut.hash, 'sha256')).to.be.true;
    });

    it('should create a chain with the genesis block', () => {
        const sut = blockchain;

        expect(sut.chain).to.not.be.undefined;
        expect(sut.chain.length).to.be.equal(1);
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

        expect(sutResult.index).to.be.equal(expectedIndex);
        expect(sutResult.timestamp).to.be.closeTo(Date.now(), 1);
        expect(sutResult.data).to.be.equal(expectedData);
        expect(validator.isHash(sutResult.hash, 'sha256')).to.be.true;
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

        expect(sut.length).to.be.equal(2);
        expect(sut[sut.length - 1]).to.be.equal(newBlock);
    });

    it('should count proof of work', () => {
        const sut = blockchain.proofOfWork;
        const result = sut(9);

        expect(result).to.be.equal(18);
    });

    describe('sendCoins', () => {
        const testData = {
            from: 'Mike',
            to: 'Lora',
            amount: 12
        }

        it('should increase transactions length by two', async() => {
            const lastBlock = blockchain.chain[blockchain.chain.length - 1];
            const txLengthBefore = lastBlock.data.transactions.length

            await blockchain.sendCoins(testData);

            const newBlock = blockchain.chain[blockchain.chain.length - 1];
            const txLengthAfter = newBlock.data.transactions.length;

            expect(txLengthBefore).to.be.equal(txLengthAfter - 2);
        });

        it('should return correct transaction', async() => {
            const sut = await blockchain.sendCoins(testData);

            expect(sut.timestamp).to.be.closeTo(Date.now(), 1);
            expect(sut.from).to.be.equal(testData.from);
            expect(sut.to).to.be.equal(testData.to);
            expect(sut.amount).to.be.equal(testData.amount);
        });
    })

    describe('getTransactions', () => {
        it('consensus should be called', () => {
            sinon.spy(blockchain, 'consensus')

            blockchain.getTransactions();
            expect(blockchain.consensus).calledOnce;
        })
        it('should return transactions on getTransactions call', async() => {
            const transactions = blockchain.chain[blockchain.chain.length - 1].data.transactions;
            const sut = await blockchain.getTransactions();

            expect(sut).to.be.equal(transactions);
        })
    })

});
