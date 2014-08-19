var expect = require('expect.js');
var env = require('../lib/environment.js');

// By providing uppercase variable names with no spaces and no prefix we can
// exercise `shellEscape` by proxy.

describe('shellEscape', function() {
    it('should not alter valid variable names', function(done) {
        var name = 'VALID_VARIABLE_NAME';
        expect(env.toVariableName(name)).to.equal(name);
        done();
    });

    it('should replace invalid characters with underscore', function(done) {
        var name = 'THE*2ND!VARIABLE-NAME';
        var expected = 'THE_2ND_VARIABLE_NAME';
        expect(env.toVariableName(name)).to.equal(expected);
        done();
    });

    it('should prefix names starting with a number with underscore',
        function(done) {
            var name = '2TEST';
            var expected = '_2TEST';
            expect(env.toVariableName(name)).to.equal(expected);
            done();
        }
    );
});

describe('toVariableName', function() {
    it('should allow the prefix to be optional', function(done) {
        var name = 'test';
        var expected = 'TEST';
        expect(env.toVariableName(name)).to.equal(expected);
        done();
    });

    it('should use the prefix when given', function(done) {
        var name = 'test';
        var prefix = 'A';
        var expected = 'A_TEST';
        expect(env.toVariableName(name, prefix)).to.equal(expected);
        done();
    });

    it('should trim excess spaces', function(done) {
        var name = '   spaces   ';
        var prefix = '  with ';
        var expected = 'WITH_SPACES';
        expect(env.toVariableName(name, prefix)).to.equal(expected);
        done();
    });
});

describe('getOverride', function() {
    it('should return the value of an environment variable', function() {
        var value = env.getOverride('STRING_ITEM1', '');
        expect(value).to.equal('string-item1-env-value');
    });

    it('should convert numeric values to numbers', function() {
        expect(env.getOverride('FLOAT_ITEM1', '')).to.equal(1.1);
    });

    it('should convert the string "true" to the boolean value true',
        function() {
            var value = env.getOverride('BOOLEAN_TRUE', '');
            expect(value).to.equal(true);
        }
    );

    it('should convert the string "false" to the boolean value false',
        function() {
            var value = env.getOverride('BOOLEAN_FALSE', '');
            expect(value).to.equal(false);
        }
    );

    it('should return the default value if no environment variable is set',
        function() {
            var value = "test";
            expect(env.getOverride('WONT_BE_SET', value)).to.equal(value);
        }
    );
});