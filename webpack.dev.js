const path = require("path")
const { merge } = require("webpack-merge")
const config = require("./webpack.config")

module.exports = merge (config, {
    mode: "development",
    devServer: {
        static: {
            directory: path.join(__dirname, "/public")
        },
        port: 3000
    }

})