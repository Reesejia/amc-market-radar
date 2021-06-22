const proxy = require("http-proxy-middleware");
module.exports = function(app) {
    app.use(
        proxy.createProxyMiddleware("/api/radar", {
            target: "http://localhost:5000",
            changeOrigin: true
        })
    );
};