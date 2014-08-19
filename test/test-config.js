var expect = require('expect.js');
var conf = require('../config.js');

describe('Config', function() {
    it('should, by, default, return empty configuration', function(done) {
        var result = conf.getConfig();
        expect(result).to.equal({});
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
                conf.setBaseConfig('data/invalid-base-config.txt');
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
                conf.init('data/invalid-config.txt');
            }).to.throwException();
            done();
        }
    );

    it('should correctly return environment overridden string values',
        function(done) {
            conf.setBaseConfig('data/valid-base-config.json');
            conf.init('data/valid-config.json');

            var validValue = 'string-item1-env-value';
            var element = 'string-item1';
            var config = conf.getConfig();
            var value = conf.getConfig(element);
            expect(config[element]).to.equal(validValue);
            expect(value).to.equal(validValue);
            done();
        }
    );

    it('should correctly return environment overridden boolean values',
        function(done) {
            conf.setBaseConfig('data/valid-base-config.json');
            conf.init('data/valid-config.json');

            var validValue = true;
            var element = 'boolean-item1';
            var config = conf.getConfig();
            var value = conf.getConfig(element);
            expect(config[element]).to.equal(validValue);
            expect(value).to.equal(validValue);
            done();
        }
    );

    it('should correctly return environment overridden int values',
        function(done) {
            conf.setBaseConfig('data/valid-base-config.json');
            conf.init('data/valid-config.json');

            var validValue = 11;
            var element = 'int-item1';
            var config = conf.getConfig();
            var value = conf.getConfig(element);
            expect(config[element]).to.equal(validValue);
            expect(value).to.equal(validValue);
            done();
        }
    );

    it('should correctly return environment overridden float values',
        function(done) {
            conf.setBaseConfig('data/valid-base-config.json');
            conf.init('data/valid-config.json');

            var validValue = 1.1;
            var element = 'float-item1';
            var config = conf.getConfig();
            var value = conf.getConfig(element);
            expect(config[element]).to.equal(validValue);
            expect(value).to.equal(validValue);
            done();
        }
    );

    it('should correctly return environment overridden nested values',
        function(done) {
            conf.setBaseConfig('data/valid-base-config.json');
            conf.init('data/valid-config.json');

            var validValue = 'nested-item1-env-value';
            var config = conf.getConfig();
            var value = conf.getConfig('nested-items.nested-item1');
            expect(config['nested-items']['nested-item1']).to.equal(validValue);
            expect(value).to.equal(validValue);
            done();
        }
    );

    it('should correctly return environment overridden list values',
        function(done) {
            conf.setBaseConfig('data/valid-base-config.json');
            conf.init('data/valid-config.json');

            var validValue = [ "env-list1-item1",
                               "env-list1-item2",
                               "env-list1-item3" ];
            var element = 'list-items1';
            var config = conf.getConfig();
            var value = conf.getConfig(element);
            expect(config[element]).to.equal(validValue);
            expect(value).to.equal(validValue);
            done();
        }
    );

    it('should correctly return overridden string values',
        function(done) {
            conf.setBaseConfig('data/valid-base-config.json');
            conf.init('data/valid-config.json');

            var validValue = 'string-item2-config-value';
            var element = 'string-item2';
            var config = conf.getConfig();
            var value = conf.getConfig(element);
            expect(config[element]).to.equal(validValue);
            expect(value).to.equal(validValue);
            done();
        }
    );

    it('should correctly return overridden boolean values',
        function(done) {
            conf.setBaseConfig('data/valid-base-config.json');
            conf.init('data/valid-config.json');

            var validValue = false;
            var element = 'boolean-item2';
            var config = conf.getConfig();
            var value = conf.getConfig(element);
            expect(config[element]).to.equal(validValue);
            expect(value).to.equal(validValue);
            done();
        }
    );

    it('should correctly return overridden int values',
        function(done) {
            conf.setBaseConfig('data/valid-base-config.json');
            conf.init('data/valid-config.json');

            var validValue = 22;
            var element = 'int-item2';
            var config = conf.getConfig();
            var value = conf.getConfig(element);
            expect(config[element]).to.equal(validValue);
            expect(value).to.equal(validValue);
            done();
        }
    );

    it('should correctly return overridden float values',
        function(done) {
            conf.setBaseConfig('data/valid-base-config.json');
            conf.init('data/valid-config.json');

            var validValue = 2.2;
            var element = 'float-item2';
            var config = conf.getConfig();
            var value = conf.getConfig(element);
            expect(config[element]).to.equal(validValue);
            expect(value).to.equal(validValue);
            done();
        }
    );

    it('should correctly return overridden nested values',
        function(done) {
            conf.setBaseConfig('data/valid-base-config.json');
            conf.init('data/valid-config.json');

            var validValue = 'nested-item2-config-value';
            var config = conf.getConfig();
            var value = conf.getConfig('nested-items.nested-item2');
            expect(config['nested-items']['nested-item2']).to.equal(validValue);
            expect(value).to.equal(validValue);
            done();
        }
    );

    it('should correctly return overridden list values',
        function(done) {
            conf.setBaseConfig('data/valid-base-config.json');
            conf.init('data/valid-config.json');

            var validValue = [ "config-list1-item1",
                               "config-list1-item2",
                               "config-list1-item3" ];
            var element = 'list-items2';
            var config = conf.getConfig();
            var value = conf.getConfig(element);
            expect(config[element]).to.equal(validValue);
            expect(value).to.equal(validValue);
            done();
        }
    );

    it('should correctly return un-overridden string base values',
        function(done) {
            conf.setBaseConfig('data/valid-base-config.json');
            conf.init('data/valid-config.json');

            var validValue = 'string-item3-base-value';
            var element = 'string-item3';
            var config = conf.getConfig();
            var value = conf.getConfig(element);
            expect(config[element]).to.equal(validValue);
            expect(value).to.equal(validValue);
            done();
        }
    );

    it('should correctly return un-overridden boolean base values',
        function(done) {
            conf.setBaseConfig('data/valid-base-config.json');
            conf.init('data/valid-config.json');

            var validValue = true;
            var element = 'boolean-item3';
            var config = conf.getConfig();
            var value = conf.getConfig(element);
            expect(config[element]).to.equal(validValue);
            expect(value).to.equal(validValue);
            done();
        }
    );

    it('should correctly return un-overridden int base values',
        function(done) {
            conf.setBaseConfig('data/valid-base-config.json');
            conf.init('data/valid-config.json');

            var validValue = 33;
            var element = 'int-item3';
            var config = conf.getConfig();
            var value = conf.getConfig(element);
            expect(config[element]).to.equal(validValue);
            expect(value).to.equal(validValue);
            done();
        }
    );

    it('should correctly return un-overridden float base values',
        function(done) {
            conf.setBaseConfig('data/valid-base-config.json');
            conf.init('data/valid-config.json');

            var validValue = 3.3;
            var element = 'float-item3';
            var config = conf.getConfig();
            var value = conf.getConfig(element);
            expect(config[element]).to.equal(validValue);
            expect(value).to.equal(validValue);
            done();
        }
    );

    it('should correctly return un-overridden nested base values',
        function(done) {
            conf.setBaseConfig('data/valid-base-config.json');
            conf.init('data/valid-config.json');

            var validValue = 'nested-item3-base-value';
            var config = conf.getConfig();
            var value = conf.getConfig('nested-items.nested-item3');
            expect(config['nested-items']['nested-item3']).to.equal(validValue);
            expect(value).to.equal(validValue);
            done();
        }
    );

    it('should correctly return un-overridden list base values',
        function(done) {
            conf.setBaseConfig('data/valid-base-config.json');
            conf.init('data/valid-config.json');

            var validValue = [ "base-list1-item1",
                               "base-list1-item2",
                               "base-list1-item3" ];
            var element = 'list-items3';
            var config = conf.getConfig();
            var value = conf.getConfig(element);
            expect(config[element]).to.equal(validValue);
            expect(value).to.equal(validValue);
            done();
        }
    );

    it('should allow an environment prefix',
        function(done) {
            conf.setEnvironmentPrefix("PREFIX");
            conf.setBaseConfig('data/valid-base-config.json');
            conf.init('data/valid-config.json');

            var validValue = 'string-item1-prefix-value';
            var element = 'string-item1';
            var config = conf.getConfig();
            var value = conf.getConfig(element);
            expect(config[element]).to.equal(validValue);
            expect(value).to.equal(validValue);
            done();
        }
    );
});