const path = require('path');

module.exports = {
    entry: "./src/linter.ts",
    mode: "production",
    output: {
        filename: "linter.js",
        path: path.resolve(__dirname, 'build')
    },
    resolve: {
        extensions: [".ts"]
    },
    module: {
        rules: [{ test: /\.ts$/, loader: "ts-loader" }]
    }
}