module.exports = {
    entry: "./public/assets/scripts/index.ts",
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
    // mode: "production",
    output: {
        filename: "bundle.js",
        // path: path.join(__dirname, "/public/")
    },
}