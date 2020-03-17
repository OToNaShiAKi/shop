module.exports = {
    publicPath: '/shop',
    devServer: {
        proxy: {
            '/pay': {
                target: "http://localhost:3000/web/xlmc",
                changeOrigin: true,
                pathRewrite: {
                    '^/pay': ''
                }
            }
        }
    }
}