var expect = require('chai').expect;
var override = require('../lib/override.js');

describe('merge', function() {
    it('should add missing branches to the base config', function (done) {
        var base = {};
        var overridden = { 'key': 'value'};
        var  result = override.merge(base, overridden);
        expect(result).to.eql(overridden);
        done();
    });
});