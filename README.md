# parse-bson-objectid

Parse parts of a [MongoDB BSON ObjectId][objectid]:

[objectid]: https://docs.mongodb.org/manual/reference/object-id/

 * `timestamp`: 4-byte timestamp *(Number, big-endian signed integer)*
 * `machine`: 3-byte machine identifier *(Buffer, byte sequence)*
 * `pid`: 2-byte process id *(Number, big-endian unsigned integer)*
 * `counter`: 3-byte counter *(Number, big-endian unsigned integer)*

## Install

[npm: *parse-bson-objectid*](https://www.npmjs.com/package/parse-bson-objectid)

```
npm install parse-bson-objectid
```

## Example

```
> var parse = require("parse-bson-objectid");
> parse("564b86ef165bd87b6e595515")
{ timestamp: 1447790319,
  machine: <Buffer 16 5b d8>,
  pid: 31598,
  counter: 5854485 }
```

## API

```
var parse = require("parse-bson-objectid");
```

### `parse(objectid)`

Parse an `objectid` into individual ObjectID parts. `objectid` can be
given as:

 * A buffer
 * A hex string
 * An instance of ObjectId (any object with `.toHexString()` function)
