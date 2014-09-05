/*!
 * dirs <https://github.com/jonschlinkert/dirs>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var path = require('path');
var assert = require('assert');
var should = require('should');
var dirs = require('..');

var fixtures = path.join(__dirname, '../node_modules/fixture');
var data = fixtures + '/data';


describe('dirs', function () {
  it('should return an array of directories', function () {
    var actual = dirs(data);
    actual.should.be.an.array;
    assert.equal(actual.length > 1, true);
  });
});
