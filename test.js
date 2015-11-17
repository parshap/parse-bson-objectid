"use strict";

var parse = require("./");
var create = require("bson").ObjectId.createPk;
var test = require("tape");

test("basic", function(t) {
  var parsed = parse(create());
  t.notEqual(parsed.timestamp, null);
  t.notEqual(parsed.process, null);
  t.notEqual(parsed.counter, null);
  t.equal(typeof parsed.timestamp, "number");
  t.equal(typeof parsed.timestamp, "number");
  t.ok(Buffer.isBuffer(parsed.process));
  t.end();
});

test("counter increases by 1", function(t) {
  var parsed1 = parse(create());
  var parsed2 = parse(create());
  t.equal(parsed1.counter + 1, parsed2.counter);
  t.end();
});

test("process should be same", function(t) {
  var parsed1 = parse(create());
  var parsed2 = parse(create());
  t.ok(parsed1.process.equals(parsed2.process));
  t.end();
});

test("timestamp should be same", function(t) {
  var parsed1 = parse(create());
  var parsed2 = parse(create());
  t.equal(parsed1.timestamp, parsed2.timestamp);
  t.end();
});

test("timestamp increases with time", function(t) {
  var start = Date.now();
  var parsed1 = parse(create());
  setTimeout(function() {
    var dt = Math.floor((Date.now() - start) / 1000);
    var parsed2 = parse(create());
    t.ok(dt > 0);
    t.notEqual(parsed1.timestamp, parsed2.timestamp);
    t.equal(parsed1.timestamp + dt, parsed2.timestamp);
    t.end();
  }, 1100);
});
