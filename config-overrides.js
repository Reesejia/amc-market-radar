const {override, addWebpackAlias} = require('customize-cra')
const path = require('path');
const resove = dir => path.join(__dirname, '.', dir)
module.exports = {
    webpack: (config) =>{
        config.output.library = 'amc-dashbi';
        config.output.libraryTarget = 'umd';
        config.output.jsonpFunction = `webpackJsonp_amc-dashbi`;
        config.output.globalObject = 'window';
        config.resolve.alias = {
          '@': path.resolve(__dirname,'./src')
        }
        // config.output.publicPath =
        return config
    },
   devServer: (configFunction) =>{
    return function (proxy, allowedHost) {
        const config = configFunction(proxy,allowedHost);
        config.headers = {
            "Access-Control-Allow-Origin": "*"
        }
        return config;
    }
   }
}
