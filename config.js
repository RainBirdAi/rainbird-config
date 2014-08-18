// ## Initial Setup
//
// Setup should be performed before the call to `init`.
//
// Optionally set the location of the base configuration file using
// `setBaseConfig`. The configuration file should be valid JSON.
// If no base configuration file is specified then the empty configuration `{}`
// will be used. The base config file should be used to provide sane defaults
// for configuration values.

function setBaseConfig(path) {
    console.log('path: %s', path);
}

// Optionally set the prefix for environment variables using
// `setEnvironmentPrefix`. When looking for environment variables the name will
// be built with the prefix `PREFIX_`.

function setEnvironmentPrefix(prefix) {
    console.log('prefix: %s', prefix);
}

// Initialise the configuration providing the path to the configuration file.
// Until `init` is called the various get functions will return `{}` or
// `undefined`.

function init(path) {
    console.log('path: %s', path);
}

// Return the entire configuration JSON using `getConfig`. If `init` has not
// been called then `getConfig` will simply return `{}`

function getConfig() {
    return undefined;
}

// Return the value for a given element using `getConfigElement`. A default
// value can be given which will be returned if the element hasn't been set in
// the config. By default `undefined` will be returned if no value is set.

function getConfigElement(element, defaultValue) {
    console.log('element: %s, defaultValue: %s', element, defaultValue);
    return defaultValue;
}

module.exports.setBaseConfig = setBaseConfig;
module.exports.setEnvironmentPrefix = setEnvironmentPrefix;
module.exports.init = init;
module.exports.getConfig = getConfig;
module.exports.getConfigElement = getConfigElement;

// ## License
//
// Copyright (c) 2014, RainBird Technologies <follow@rainbird.ai>
//
// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED 'AS IS' AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.