rainbird-config
===============

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
```json

The value of `foo.bar` will be `foobar` and the value of `a.b` will be `c`.

Assuming a variable prefix of `CONFIG`, setting the following:

```bash
export CONFIG_A_B=environment
```

would result in the value of `foo.bar` remaining as `foobar` and the value of
`a.b` being `environment`.