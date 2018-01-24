var expect  = require('chai').expect;
const Transaction = require('../server/transaction');
const _ = require('underscore');

describe("Transaction", () => {
    let sut;
    let testData = {
        from: 'from wallet',
        to: 'to Wallet',
        amount: 22
    }

    beforeEach(() => {
        sut = new Transaction(testData.from, testData.to, testData.amount);
    });

    describe("constructor", () => {
        it('should be created with properties: index, timestamp, data, prevHash, hash', () => {
            const props = [
                'from',
                'to',
                'amount',
                'timestamp'
            ];

            props.forEach(prop => expect(_.has(sut, prop)).to.be.true);
            expect(sut.from).to.be.equal(testData.from);
            expect(sut.to).to.be.equal(testData.to);
            expect(sut.amount).to.be.equal(testData.amount);
        });
    });
});
