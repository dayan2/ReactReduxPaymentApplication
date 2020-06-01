const path = require("path")
const webpack = require("webpack")
const webpackCommon = require("webpack")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const nodeExternals = require("webpack-node-externals")
const ReplaceInFileWebpackPlugin = require("replace-in-file-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const autoprefixer = require("autoprefixer")
var HtmlWebpackPlugin = require('html-webpack-plugin');

const serverPath = path.join(__dirname, "dist")
const publicPath = path.join(__dirname, "static")
const srcPath = path.join(__dirname, "src")
const {name, version} = require("./package")


const appConfigs = require("rc")("service", { // Defaults
    "service": name,
    version,
    enableClientCache: true,
    clientCacheExpirationTime: 604800000
})

const allowedConfigs = [
    "service",
    "version",
    "apiEndpoint",
    "contentServiceEndpoint",
    "contentServiceBasicAuth",
    "enableClientCache",
    "clientCacheExpirationTime",
    "contentServiceProjectCode"
]

const cssRule = {
    test: /\.css$/,
    use: [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                publicPath
            }
        },
        {
            loader: "css-loader",
            options: {
                modules: false,
                sourceMap: true
            }
        }
    ]
}

const scssRule = {
    test: /\.scss$/,
    use: [{
        loader: MiniCssExtractPlugin.loader,
        options: {
            publicPath
        }
    }, {
        loader: "css-loader",
        options: {
            modules: false,
            sourceMap: true,
            importLoaders: 2
        }
    }, "postcss-loader", "sass-loader"]
}

const sassRule = {
    test: /\.sass$/,
    use: [{
        loader: MiniCssExtractPlugin.loader,
        options: {
            publicPath
        }
    }, {
        loader: "css-loader",
        options: {
            modules: false,
            sourceMap: true,
            importLoaders: 2
        }
    }, "postcss-loader", "sass-loader"]
}

const lessRule = {
    test: /\.less$/,
    use: [
        {loader: MiniCssExtractPlugin.loader, options: {publicPath}},
        {loader: "css-loader", options: {importLoaders: 1}},
        {loader: "less-loader", options: {javascriptEnabled: true}}
    ]
}

module.exports = {
    server: {
        name: "server",
        entry: "./server/server.js",
        target: "node",
        output: {
            path: serverPath,
            filename: "server.generated.js",
            libraryTarget: "commonjs2"
        },
        watchOptions: {
            ignored: /node_modules/
        },
        externals: [nodeExternals()],
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ["@babel/preset-env", {
                                targets: {
                                    node: "9.5"
                                }
                            }]////"@babel/preset-react"
                        ],
                        plugins: ["@babel/plugin-proposal-object-rest-spread", "@babel/plugin-proposal-class-properties"]
                    },
                    exclude: [/node_modules/]
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),//["./dist/*"]
            new ReplaceInFileWebpackPlugin([
                {
                    dir: serverPath,
                    files: ["server.generated.js"],
                    rules: [
                        {
                            search: "#version",
                            replace: (process.env.npm_package_version !== "") ? `${process.env.npm_package_version}+build.${+new Date()}` : +new Date()
                        }
                    ]
                }
            ])
        ]
    },
    client: {
        entry: {
            "bundle": [
                // activate HMR for React
                "react-hot-loader/patch",
                "./src/index"
            ]
        },
        target: "web",
        output: {
            path: path.join(__dirname, "dist"),
            filename: '[name].js',
        },

        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    use: ['babel-loader',],
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader?modules',],
                },
                {
                    test: /\.scss$/, use: ['style-loader', 'css-loader', {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    }]
                },
                {
                    test: /\.svg$/,
                    loader: 'svg-inline-loader'
                }
            ],
        },

        devtool: "source-map",
        devServer: {
            open: true, //opens the browser auto when it starts
            contentBase: path.join(__dirname, "dist"),
            port: 4000,
            hot: true,
            index: 'index.html',
            progress: true, //progress in console
            publicPath: "/", //this says where my bundle file is at(same folder)
            proxy: {
                '/api': 'http://localhost:2222'
            },
            onListening: function(server) {
                const port = server.listeningApp.address().port;
                console.log('Listening on port:', port);
            }
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin({
                template: './dist/index.html'
            })
        ]
    }
}
