const path = require("path");
const ZipPlugin = require('./plugins/zip-plugin');

module.exports = {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
  plugins: [new ZipPlugin({
      filename: 'offline'
  })],
};