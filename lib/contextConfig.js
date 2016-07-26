var environment = require('./environment');

var neoURL = environment.getOverride('NEO4J_TEST_URL', '');

var isLocal = neoURL.indexOf('localhost') != -1;

module.exports = {
    'testTimeout': isLocal ? 2000 : 30000,
};
