const path = require('path');

module.exports = {
    mode: "development",
    context: path.resolve(__dirname),
    entry: './src.transpiled/frontend/main.js',
    output: {
        filename: 'bundle.js',
        path:  path.resolve(__dirname, 'public')
    },
    devtool: "source-map"
};
