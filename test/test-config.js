var expect = require('expect.js');
var conf = require('../config.js');

describe('Config', function() {
    it('should, by, default, return empty configuration', function(done) {
        var result = conf.getConfig();
        expect(result).to.eql({});
        done();
    });

    it('should throw an exception if the base config file does not exist',
        function(done) {
            expect(function() {
                conf.setBaseConfig('bad-path.json');
            }).to.throwException();
            done();
        }
    );

    it('should throw an exception if the base config if not JSON',
        function(done) {
            expect(function() {
                conf.setBaseConfig('./test/data/invalid-base-config.txt');
            }).to.throwException();
            done();
        }
    );

    it('should not error if the environment prefix is undefined',
        function(done) {
            conf.setEnvironmentPrefix(undefined);
            done();
        }
    );

    it('should throw an exception if the config does not exist',
        function(done) {
            expect(function() {
                conf.init('bad-path.json');
            }).to.throwException();
            done();
        }
    );

    it('should throw an exception if the config is not JSON',
        function(done) {
            expect(function() {
                conf.init('./test/data/invalid-config.txt');
            }).to.throwException();
            done();
        }
    );

    it('should construct a correctly merged and overridden config object',
        function(done) {
            conf.setBaseConfig('./test/data/valid-base-config.json');
            conf.init('./test/data/valid-config.json');

            var expected = require('./data/expected-config.json');
            var config = conf.getConfig();
            expect(config).to.eql(expected);
            done();
        }
    );

    it('should allow an environment prefix',
        function(done) {
            conf.setEnvironmentPrefix("PREFIX");
            conf.setBaseConfig('./test/data/valid-base-config.json');
            conf.init('./test/data/valid-config.json');

            var config = conf.getConfig();
            expect(config['string-item1']).to.equal('string-item1-prefix-value');
            done();
        }
    );
});