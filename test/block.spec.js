var expect  = require('chai').expect;
const Block = require('../server/block');
const _ = require('underscore');
const validator = require('validator');

describe("Block", () => {
    describe("constructor", () => {
        it('should be created with properties: index, timestamp, data, prevHash, hash', () => {
            const sut = new Block(12, Date.now(), 'My data', 0);
            const props = [
                'index',
                'timestamp',
                'data',
                'prevHash',
                'hash'
            ];

            props.forEach(prop => expect(_.has(sut, prop)).to.be.true);

            // Chech if hash property is a sha256 hash value
            expect(validator.isHash(sut.hash, 'sha256')).to.be.true;
        });
    });
});
