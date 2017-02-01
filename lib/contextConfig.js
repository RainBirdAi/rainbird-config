var environment = require('./environment');

var isLocal = neoURL.indexOf('localhost') != -1;

module.exports = {
    'testTimeout': isLocal ? 2000 : 35000,
};
