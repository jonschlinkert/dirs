function filter (dir, filters) {
  return traverse(dir).forEach(function (filepath) {
    return true
  });
}
var dirs = function(dir) {
  return filter(dir).filter(isDir);
};

var files = function(dir) {
  return filter(dir).filter(isFile);
};

function filemap(dirs) {
 return dirs.reduce(function(filemap, filename) {
    filemap[filename] = filename;
    return filemap;
  }, {});
}

function filelist(dir) {
 return fs
  .readdirSync(dir).filter(function(filename) {
    return !(/^index.js$/).test(filename);
  })
  .reduce(function(filemap, filename) {
    filemap.push(filename);
    return filemap;
  }, []);
}

// https://github.com/Roland1975/db-importer/blob/5572cc9487cf3eabd384c298f89135c7b56e18e6/vdj-to-traktor/lib/index.js

var folder = path.join(__dirname, 'importDb');

module.exports = fs
.readdirSync(folder)
.reduce(function(obj, file) {
  obj[file.replace(/\.js$/,'')] = require(path.join(folder, file));
  return obj;
}, {});



module.exports = fs.readdirSync(__dirname + '/../wrappers')
  .filter(function (file) {
    return file.match(/\.js$/)
  })
  .reduce(function (acc, file) {
    var name = file.replace(/\.js$/, '');
    acc[name] = fs.readFileSync(__dirname + '/../wrappers/' + file, 'utf8');
    return acc;
  }, {});


// https://github.com/fleetster/call-center/blob/ef3c44f77879eba91b205e5e89f4eb5ec887c404/backend/src/Mongoose/mocks/index.js
module.exports = require('fs').readdirSync(__dirname)
  .reduce(function (mockData, file) {

    var mockName = file.split('.mock')[0];

    if (mockName === 'index.js') {
      return mockData;
    }

    mockData[mockName] = require(__dirname + '\/' + file);

    return mockData;

  }, {});