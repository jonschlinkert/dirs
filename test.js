/*!
 * dirs <https://github.com/jonschlinkert/dirs>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

/* deps:mocha */
var assert = require('assert');
var dirs = require('./');

describe('dirs', function () {
  it('should throw an error when the callback is missing:', function () {
    try {
      dirs('foo');
    } catch (err) {
      assert(/dirs async expects a callback function/i.test(err));
    }
  });

  it('should return an array of directories and files', function (done) {
    dirs('fixtures', function (err, files) {
      assert(Array.isArray(files));
      assert(files.length > 1);
      done();
    });
  });

  it('should list directories', function (done) {
    dirs('fixtures', function (err, files) {
      assert(Array.isArray(files));
      assert(files.length > 1);
      assert(files.indexOf('fixtures/one') !== -1);
      done();
    });
  });

  it('should list files', function (done) {
    dirs('fixtures', function (err, files) {
      assert(Array.isArray(files));
      assert(files.length > 1);
      assert(files.indexOf('fixtures/a.js') !== -1);
      done();
    });
  });
});

describe('dirs sync', function () {
  it('should return an array of directories and files', function () {
    var files = dirs.sync('fixtures');
    assert(Array.isArray(files));
    assert(files.length > 1);
  });

  it('should list directories', function () {
    var files = dirs.sync('fixtures');
    assert(Array.isArray(files));
    assert(files.length > 1);
    assert(files.indexOf('fixtures/one') !== -1);
  });

  it('should list files', function () {
    var files = dirs.sync('fixtures');
    assert(Array.isArray(files));
    assert(files.length > 1);
    assert(files.indexOf('fixtures/a.js') !== -1);
  });
});
