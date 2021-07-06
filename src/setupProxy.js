const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
    app.use(
        createProxyMiddleware('/aap/api', {
            target: 'https://wm-test310.newtamp.cn/aap/api', // 设置你调用的接口域名和端口号
            // target: 'http://10.5.9.229:9080/aap/api', // 设置你调用的接口域名和端口号
            changeOrigin: true, // 跨域
            pathRewrite: {
                '^/aap/api': ''
            }
        })
    )
    app.use(
        createProxyMiddleware("/radar", {
            target: "https://wm-test310.newtamp.cn/",
            changeOrigin: true
        })
    )
    app.use(
        createProxyMiddleware("/api/radar", {
            target: "http://10.5.8.252:5000",
            changeOrigin: true
        })
    )
};
