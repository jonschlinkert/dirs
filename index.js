/*!
 * dirs <https://github.com/jonschlinkert/dirs>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var async = require('async');

module.exports = dirs;

function dirs(cwd, cb) {
  if (arguments.length === 1) {
    throw new Error('dirs async expects a callback function.');
  }

  fs.readdir(cwd, function(err, files) {
    if (err) return cb(err);
    var res = [];

    async.map(files, function(fp, next) {
      fp = path.join(cwd, fp);

      fs.stat(fp, function(err, stats) {
        if (err) return handle(err, next);

        if (stats.isDirectory()) {
          dirs(fp, function (err, files) {
            if (err) return cb(err);
            next(null, res.push.apply(res, files));
          });
          res.push(fp);
        } else {
          next(null, res.push(fp));
        }

      });
    }, function(err) {
      cb(err, res);
    });
  });
}

function handle(err, next) {
  return (err.code !== 'ENOENT') ? next(err) : next();
}

dirs.sync = function dirsSync(dir) {
  var files = fs.readdirSync(dir);
  var len = files.length, i = 0;
  var res = [];

  while (len--) {
    var fp = path.join(dir, files[i++]);
    if (fs.statSync(fp).isDirectory()) {
      res.push.apply(res, dirsSync(fp))
    }
    res.push(fp);
  }
  return res;
};
