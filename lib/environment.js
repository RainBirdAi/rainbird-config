// Unix environment variables are can be the character set `[a-zA-Z0-9_]` so we
// need to replace anything that isn't in that to the underscore character. If
// the variable name starts with a number then prefix it with an underscore.

function shellEscape(name) {
    name = name.replace(/[^a-zA-Z0-9_]/g , '_');

    if (name.match(/^[0-9]/)) {
        name = '_' + name;
    }

    return name;
}

// Convert a string to a unix environment variable name by:
// * Trimming excess space from the provided string and optional stub
// * Prefixing the string with an optional stub, followed by an underscore
// * Replacing invalid characters with an underscore
// * Converting the resultant string to uppercase

function toVariableName(string, stub) {

    var name = '';

    if (stub !== undefined) {
        name = stub.trim();
    }

    if (!name) {
        name = string.trim();
    } else {
        name += '_' + string.trim();
    }

    return shellEscape(name).toUpperCase();
}

// `getOverride` checks the for an environment variable with the given `name`
// returning its value if it's set. Numeric values are automatically converted.
// If no value is found then the given default value will be returned.

function getOverride(name, defaultValue) {
    var value = process.env[name];
    var result = defaultValue;

    if (value !== undefined) {
        if (isNaN(+value)) {
            result = value;
        } else {
            result = +value;
        }

        if (value.toLowerCase() === 'true') {
            result = true;
        }

        if (value.toLowerCase() === 'false') {
            result = false;
        }
    }

    return result;
}

module.exports.toVariableName = toVariableName;
module.exports.getOverride = getOverride;

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

