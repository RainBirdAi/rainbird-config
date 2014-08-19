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

module.exports.toVariableName = toVariableName;

