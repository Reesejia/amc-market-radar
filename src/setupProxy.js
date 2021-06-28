const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use('/aap/api',
        createProxyMiddleware({
            target: 'https://wm-test310.newtamp.cn/aap/api', // 设置你调用的接口域名和端口号
            changeOrigin: true, // 跨域
            pathRewrite: {
                '^/aap/api': ''
            }
        }))
}