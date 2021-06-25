const JSZip = require('jszip');
const zip = new JSZip();
const RawSource = require('webpack-sources').RawSource;
const path = require('path');
module.exports = class ZipPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('ZipPlugin', (compilation, callback) => {
      let folder = zip.folder(this.options.filename); // 创建新目录，目录名称是传入的参数：filename
      let source = compilation.assets; // 通过 compilation.assets获取模块代码对象
      for (let filename in source) {
        let code = source[filename].source(); // 获取源代码
        folder.file(filename, code);
      }
      zip.generateAsync({ type: 'nodebuffer' }).then((res) => {
        let outputPath = path.join(
          compilation.options.output.path,
          this.options.filename + '.zip'
        ); // 这样得到的是绝对路径，还需要进一步提取相对路径
        let relativePath = path.relative(
          compilation.options.output.path,
          outputPath
        );
        compilation.assets[relativePath] = new RawSource(res);
        callback(); // 回调函数必须在这个 promise 里面调用
      });
    });
  }
};
