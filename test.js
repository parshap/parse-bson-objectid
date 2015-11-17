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
  t.equal(typeof parsed.counter, "number");
  t.equal(typeof parsed.pid, "number");
  t.ok(Buffer.isBuffer(parsed.machine));
  t.end();
});

test("counter increases by 1", function(t) {
  var parsed1 = parse(create());
  var parsed2 = parse(create());
  t.equal(parsed1.counter + 1, parsed2.counter);
  t.end();
});

test("machine should be same", function(t) {
  var parsed1 = parse(create());
  var parsed2 = parse(create());
  t.ok(parsed1.machine.equals(parsed2.machine));
  t.end();
});

test("pid should be same", function(t) {
  var parsed1 = parse(create());
  var parsed2 = parse(create());
  t.equal(parsed1.pid, parsed2.pid);
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
