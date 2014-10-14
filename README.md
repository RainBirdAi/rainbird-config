# rainbird-config

[ ![Codeship Status for RainBirdAi/rainbird-config](https://www.codeship.io/projects/32aaf590-35a4-0132-af7d-4e5daa8e92bc/status)](https://www.codeship.io/projects/41121)

`rainbird-config` allows a base JSON configuration file to be overridden with 
values from a supplied JSON configuration file and/or from values set in 
environment variables.

Values set in the base configuration file can be overridden by values set in the
supplied configuration configuration file. Values that do not exist in the base
configuration files can also be set in the supplied configuration file, with the
final configuration being the superset of both files. Values set in either
configuration file can be overridden via environment variables. Environment
variables cannot be used to specify configuration options that have not already
been specified in the configuration files.

For a given base configuration file of:

```json
{
    "foo": {
        "bar": baz
    },
    "a": {
        "b": c
    }
}
```

The value of `foo.bar` will be `baz` and the value of `a.b` will be `c`.

For a given supplied base configuration file of:

```json
{
    "foo": {
        "bar": foobar
    }
}
```

The value of `foo.bar` will be `foobar` and the value of `a.b` will be `c`.

Assuming a variable prefix of `CONFIG`, setting the following:

```bash
export CONFIG_A_B=environment
```

would result in the value of `foo.bar` remaining as `foobar` and the value of
`a.b` being `environment`.

## Environment Variables

### Boolean values

Setting an environment variable to the string "true" or "false" will
automatically be converted to `true` or `false` in the resultant config
object.

### Numeric values

Environment variables with valid numeric values (both integer and floating 
point) will be converted from strings to a number in the resultant config
object.

### List values

List values need to be overridden an element at a time, it is not possible to
override an entire list from the environment. Elements are accessed by appending
an underscore and the index to the variable name. Thus for the JSON:

```json
{
    "list": ["a", "b", "c"]
}
```

You would override each element using:

```bash
export LIST_0=A
export LIST_1=B
export LIST_2=C
```

### Naming Conventions

Environment variables are named by taking the JSON path of the data and 
replacing the dots with underscores. Invalid characters are also replaced with
underscores. Variables starting with a number are preceded by an underscore. An
optional prefix can be used to namespace variables.

Given the JSON:

```json
{
    "foo": "bar",
    "a": { "b": "c" },
    "1": "one",
    "list": [ "a", "b", "c"]
}
```

Valid overrides with no prefix would be:

```bash
export FOO=BAR
export A_B=C
export _1=ONE
export LIST_0=A
export LIST_1=B
export LIST_2=C
```

With a prefix of "env" the overrides would be:

```bash
export ENV_FOO=BAR
export ENV_A_B=C
export ENV_1=ONE
export ENV_LIST_0=A
export ENV_LIST_1=B
export ENV_LIST_2=C
```

# Usage

```javascript
var configuration=require('rainbird-config')

configuration.setEnvironmentPrefix("PREFIX");
configuration.setBaseConfig('./config/base-config.json');
configuration.init('./config/production-config.json');

var config = conf.getConfig();
```

# Testing

```bash
npm install -g jshint
npm install -g mocha
npm install -g istanbul
npm test
```

# License

Copyright (c) 2014, RainBird Technologies <follow@rainbird.ai>

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
