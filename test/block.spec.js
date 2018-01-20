const Block = require('../block');

describe("Block specs", function () {
    describe("Genesis block", function () {
        it("should create genesis block", function () {
            console.log(new Block(0, "0", 1465154705, "my genesis block!!", "816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7"));
            // expect(new Block(0, "0", 1465154705, "my genesis block!!", "816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7"))
        });
    });
});
