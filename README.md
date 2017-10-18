# require-diskspace
Assert your disk space requirements in order to function.

Special thanks to [sindresorhus](https://github.com/sindresorhus) for making the only good [`df`](https://www.npmjs.com/package/@sindresorhus/df) wrapper out there

## Installation
`npm i require-diskspace`

## Usage
```js
const requireDiskspace = require('require-diskspace');

// make sure there's enough space on the default drive
requireDiskspace('1mb', function (err, extraSpace) {
  // check err, err.required is the number of extra bytes needed
  // extraSpace is number of bytes *over* the requirement met
});

// check a specific mount point
requireDiskspace('/path/to/something', '1mb', function (err, extraSpace) {
  // same deal
});
```

# Contributing
```
npm run test
```

# License
MIT
