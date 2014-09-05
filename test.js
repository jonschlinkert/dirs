/*!
 * dirs <https://github.com/jonschlinkert/dirs>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var assert = require('assert');
var should = require('should');
var isDirectory = require('is-directory');
var dirs = require('./');

function isDir (fp) {
  return isDirectory.sync(fp);
}
function isFile (fp) {
  return !isDir(fp);
}
function matches (re) {
  return function(filepath) {
    return re.test(filepath);
  }
}

describe('dirs', function () {
  it('should return an array of directories and files', function () {
    var actual = dirs('fixtures');
    actual.should.be.an.array;
    assert.equal(actual.length > 1, true);
  });

  it('should list directories', function () {
    var actual = dirs('fixtures').filter(isDir);
    actual.should.be.an.array;
    assert.equal(actual.length > 1, true);
    assert.equal(actual.filter(matches(/\.js/)).length === 0, true);
  });

  it('should list files', function () {
    var actual = dirs('fixtures').filter(isFile);
    actual.should.be.an.array;
    assert.equal(actual.length > 1, true);
    assert.equal(actual.filter(matches(/\.js/)).length > 1, true);
  });
});
