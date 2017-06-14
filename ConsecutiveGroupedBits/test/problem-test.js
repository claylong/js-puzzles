/* global it, describe */

var assert = require('assert');
var problem = require('../problem.js');

describe('ConsecutiveGroupedBits', () => {

    function assertKnownByMatching(s, num) {
        it(`should return ${num} when the input is '${s}'`, () => {
            assert.equal(num, problem.countUsingMatchingLogic(s));
        });
    }

    function assertKnownByMath(s, num) {
        it(`should return ${num} when the input is '${s}'`, () => {
            assert.equal(num, problem.countUsingMath(s));
        });
    }

    describe('countUsingMatchingLogic()', () => {
        assertKnownByMatching('', 0);
        assertKnownByMatching('00110', 3);
        assertKnownByMatching('10101', 4);
        assertKnownByMatching('10001', 2);
        assertKnownByMatching('00110011', 6);
        assertKnownByMatching('001100110', 7);
        assertKnownByMatching('0010011', 4);
        assertKnownByMatching('000111', 3);
    });

    describe('countUsingMath()', () => {
        assertKnownByMath('', 0);
        assertKnownByMath('00110', 3);
        assertKnownByMath('10101', 4);
        assertKnownByMath('10001', 2);
        assertKnownByMath('00110011', 6);
        assertKnownByMath('001100110', 7);
        assertKnownByMath('0010011', 4);
        assertKnownByMath('000111', 3);
    });
});