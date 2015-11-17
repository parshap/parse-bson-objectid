"use strict";

// Return a buffer
function normalizeInput(objectid) {
  if (objectid == null) {
    throw new Error("Input required");
  }
  if (Buffer.isBuffer(objectid)) {
    return objectid;
  }
  else if (typeof objectid === "string") {
    return new Buffer(objectid, "hex");
  }
  else if (typeof objectid.toHexString === "function") {
    return new Buffer(objectid.toHexString(), "hex");
  }
  else {
    throw new Error("Invalid input type");
  }
}

module.exports = function(objectid) {
  var buffer = normalizeInput(objectid);
  return {
    timestamp: buffer.readInt32BE(0),
    machine: buffer.slice(4, 4 + 3),
    pid: buffer.readUIntBE(7, 2),
    counter: buffer.readUIntBE(9, 3),
  };
};
