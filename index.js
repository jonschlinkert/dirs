var fs = require('fs');

var dirs = module.exports = function(dir) {
 return fs.readdirSync(dir)
  .reduce(function(filemap, filepath) {
    filepath = [dir, filepath].join('/');
    if (dirs.isDir(filepath)) {
      filemap = filemap.concat(dirs(filepath));
    }
    filemap.push(filepath);
    return filemap;
  }, []);
};

dirs.isDir = function(filepath) {
  var stat = fs.statSync(filepath);
  return stat && stat.isDirectory();
};
