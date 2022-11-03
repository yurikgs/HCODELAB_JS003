const path = require("path")

module.exports = {
    entry: "./assets/scripts/index.ts",
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: { // Determina como os m´doulos serão criados no webpack
        rules: [{
            test: /\.ts$/,
            use: "ts-loader",
            exclude: /node_modules/
        }],
    },
    mode: "development",
    output: {
        filename: "bundle.js"
    },
    devServer: {
        static: {
            directory: path.join(__dirname)
        },
        port: 3000
    }

}