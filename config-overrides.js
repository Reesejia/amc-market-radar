const {addWebpackAlias, override} = require('customize-cra')
const path = require('path');
const resove = dir => path.join(__dirname, '.', dir)
module.exports = override(
  addWebpackAlias({
    ['@']: resove('src')
  })
)
