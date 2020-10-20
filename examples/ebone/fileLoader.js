const globby = require('globby');
const is = require('is-type-of');
const path = require('path');
const fs = require('fs');

const defaultOptions = {
  directory: process.cwd(),
  ignore: ['node_modules'],
};
class FileLoader {
  constructor(options = {}) {
    this.options = Object.assign({}, defaultOptions, options);
    console.log(this.options);
  }

  parse() {
    // https://www.npmjs.com/package/globby
    let patterns = this.options.match;
    let directory = this.options.directory;
    let ignore = this.options.ignore;
    if (ignore) {
      ignore = ignore.map((ele) => '!' + ele);
      patterns = patterns.concat(ignore);
    }
    const paths = globby.sync(patterns, {
      // https://github.com/mrmlnc/fast-glob#options-3
      cwd: directory,
    });

    const items = [];
    for (const filepath of paths) {
      const fullpath = path.join(directory, filepath);
      if (!fs.statSync(fullpath).isFile()) {
        continue;
      }
      // model/a.js => [a]
      // model/child/c.js => [child,c]
      const properties = filepath.substring(0, filepath.lastIndexOf('.')).split('/');

      // 'c:\\eminoda_workspace\\Ebone.js\\examples\\ebone\\model' => [model]
      // model.child.c
      const pathName = directory.split(/[/\\]/).slice(-1)[0] + '.' + properties.join('.');

      let exports = loadFile(fullpath);

      if (this.options.inject && is.function(exports)) {
        exports = exports(this.options.inject);
      }

      items.push({ fullpath, properties, exports });
    }
    return items;
  }

  load() {
    const items = this.parse();
    const target = this.options.target;
    for (const item of items) {
      item.properties.reduce((target, property, index) => {
        let result;
        if (index == item.properties.length - 1) {
          result = item.exports;
        } else {
          // result = target.a || {}
          result = target[property] || {};
        }
        // target.a = target.a || {}
        target[property] = result;
        return result;
      }, target);
    }
    return target;
  }
}

function loadFile(fullpath) {
  const extname = path.extname(fullpath);
  if (extname && extname !== '.js') {
    return fs.readFileSync(fullpath);
  }
  return require(fullpath);
}
const fileLoaderIns = new FileLoader({
  directory: path.resolve(__dirname, './model'),
  match: ['**/*.js', '**/*.txt'],
  inject: {
    none: 'hello! I"m inject params',
  },
  target: {},
});

const result = fileLoaderIns.load();
console.log(result);

// console.log(JSON.parse(result.d.toString()).user);
