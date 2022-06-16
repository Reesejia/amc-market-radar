const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
    app.use(
        createProxyMiddleware('/aap/api', {
            target: 'https://wm134test2.newtamp.cn/aap/api', // 设置你调用的接口域名和端口号
            // target: 'https://wm-test310.newtamp.cn/aap/api', // 设置你调用的接口域名和端口号
            // target: 'http://10.5.8.154:9080/aap/api', // 设置你调用的接口域名和端口号
            changeOrigin: true, // 跨域
            pathRewrite: {
                '^/aap/api': ''
            }
        })
    )
    app.use(
        createProxyMiddleware("/radar", {
            // target: "https://wm-test310.newtamp.cn/",
            target: "https://wm134test2.newtamp.cn/",
            changeOrigin: true
        })
    )
    app.use(
        createProxyMiddleware("/api/radar", {
            target: "http://10.5.8.252:5000",
            changeOrigin: true
        })
    )
    app.use(
      createProxyMiddleware("/data-api/v1", {
          target: "https://service-wbsnbcc.newbanker.cn/data-api/v1",
          changeOrigin: true,
          pathRewrite: {
            '^/data-api/v1': ''
        }
      })
  )
};
