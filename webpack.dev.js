const webpack = require("webpack")
const merge = require("webpack-merge")
const common = require("./webpack.common")
const NodemonPlugin = require("nodemon-webpack-plugin")
const { version } = require("./package")

const serverPlugins = [
    new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("development")
    })
]

// module.exports = merge.multiple(common, {
//     server: {
//         mode: "development",
//         plugins: plugins.concat(new NodemonPlugin({
//             nodeArgs: ["--inspect=0.0.0.0:1617"]
//         }))
//     }
// })

const plugins = [
    new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("development"),
        "__BUILD__": JSON.stringify(version)
    })
]

// eslint-disable-next-line no-undef
// module.exports = {
    // ...common,
    // mode: "development",
    // plugins: plugins.concat(plugins),
    // watch: true,
    // watchOptions: {
    //     aggregateTimeout: 300,
    //     ignored: /node_modules/
    // }
// }

module.exports = merge.multiple(common, {
    client: {
        mode: "development",
        plugins: plugins.concat(plugins),
        watch: true,
        watchOptions: {
            aggregateTimeout: 300,
            ignored: /node_modules/
        }
    },
    // server: {
    //     mode: "development",
    //     plugins: serverPlugins.concat(new NodemonPlugin({
    //         nodeArgs: ["--inspect=0.0.0.0:1617"]
    //     }))
    // }
})
