'use strict';

var fs = require('fs');
var isDir = require('is-directory');


module.exports = function dirs(dir) {
 return fs.readdirSync(dir)
  .reduce(function(acc, filepath) {
    filepath = [dir, filepath].join('/');

    if (isDir.sync(filepath)) {
      acc = acc.concat(dirs(filepath));
    }

    acc.push(filepath);
    return acc;
  }, []);
};
