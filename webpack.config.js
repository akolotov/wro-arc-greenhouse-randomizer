const path = require('path');

module.exports = {
    mode: "development",
    context: path.resolve(__dirname),
    entry: './src/frontend/main.js',
    output: {
        filename: "bundle.js",
        path:  path.resolve(__dirname, "public")
    },
    devtool: "source-map",
    watch: true,
    watchOptions: {
        aggregateTimeout: 1000
    }
};
