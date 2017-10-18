const test = require('tape');
const assertDiskspace = require('./');

test('code runs', function (t) {
  t.plan(4);

  assertDiskspace('1', function (err, truth) {
    t.ok(truth > 0, 'returns bytes over expected value');
    t.notOk(err);
  });
  assertDiskspace('/', '1', function (err, truth) {
    t.ok(truth > 0, 'lets you specify which file');
    t.notOk(err);
  });
});

test('internals', function (t) {
  t.plan(6);

  assertDiskspace.doAssert({
    available: 123
  }, '1kb', function (err, data) {
    t.ok(err, 'errors when theres not enough space');
    t.equals(err.required, 901, 'puts the missing byes needed as a prop in the err');
  });
  assertDiskspace.doAssert({
    available: 1024
  }, '1kb', function (err, data) {
    t.notOk(err, 'allows having exactly enough');
    t.equals(data, 0, 'returns excess bytes');
  });
  assertDiskspace.doAssert({
    available: 3210
  }, '1kb', function (err, data) {
    t.notOk(err, 'does not return errors when there is enough space');
    t.equals(data, 2186, 'returns excess bytes');
  });
});
