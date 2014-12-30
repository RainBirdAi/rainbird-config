var env = require('./environment.js');

// Recursively descend through the configuration object replacing values that
// have been set in the environment. This has the side effect of turning:
//
// ```json
// {
//     "list": [ "a", "b", "c"]
// }
// ```
//
// into:
//
// ```json
// {
//     "list" {
//         "0": "a",
//         "1": "b",
//         "2": "c"
//     }
// }
// ```

function getOverrides(object, prefix, stub) {
    var overrides = {};

    if (stub === undefined) {
        stub = '';
    } else {
        stub = stub + '_';
    }

    for (var index in object) {
        /* istanbul ignore else */
        if (object.hasOwnProperty(index)) {
            var path = stub + index;
            var value = object[index];
            var name = env.toVariableName(path, prefix);

            if (value !== null && typeof(value) == 'object') {
                overrides[index] = getOverrides(value, prefix, path);
            } else {
                overrides[index] = env.getOverride(name, value);
            }
        }
    }

    return overrides;
}

// Merge two objects `base` and `override` by traversing the `override` object
// and setting any values found in `base`.

function merge(base, override) {
    var merged = base;
    for (var index in override) {
        /* istanbul ignore else */
        if (override.hasOwnProperty(index)) {
            var value = override[index];
            var branch = base[index];

            if (branch === undefined) {
                branch = {};
            }

            if (value !== null && typeof(value) == 'object') {
                merged[index] = merge(branch, value);
            } else {
                merged[index] = value;
            }
        }
    }

    return merged;
}

module.exports.getOverrides = getOverrides;
module.exports.merge = merge;

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