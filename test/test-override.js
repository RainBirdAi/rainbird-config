var expect = require('expect.js');
var override = require('../lib/override.js');

describe('merge', function() {
    it('should add missing branches to the base config', function (done) {
        var base = {};
        var overriden = { 'key': 'value'};
        var  result = override.merge(base, overriden);
        expect(result).to.eql(overriden);
        done();
    });
});