const df = require('@sindresorhus/df');
const bytes = require('bytes');

assertDiskspace.doAssert = doAssert;

module.exports = assertDiskspace;

function assertDiskspace (file, size, callback) {
  if (arguments.length < 3) {
    callback = size;
    size = file;
    file = '/';
  }
  df.file(file).then(function (data) {
    doAssert(data, size, callback);
  })
  .catch(callback);
}

function doAssert (output, size, callback) {
  var byteSize = bytes(size);

  if (output.available >= byteSize) {
    return callback(null, output.available - byteSize);
  }
  var required = byteSize - output.available;
  var err = new Error('Disk does not have enough space (missing ' + required + ' bytes)');
  err.required = required;
  return callback(err);
}
