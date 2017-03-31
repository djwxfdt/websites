const webpack = require('webpack')

const isPublish = process.env.NODE_ENV === 'production'

const path = require('path')

var plugins = []

plugins.push(new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify(process.env.node_env)
}))

let config = {
    entry: {
        index: path.join(path.resolve('./assets/js'), 'index.js')
    },
    output: {
        path: path.resolve('./public/js'),
        chunkFilename: 'chunk/[chunkhash:8].chunk.js',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
        loaders: [],
        rules: [
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    }, {
                        loader: "css-loader" // translates CSS into CommonJS
                    }, {
                        loader: "less-loader" // compiles Less to CSS
                    }
                ]
            }
        ]
    },
    plugins: plugins
}

if (!isPublish) {
    config.watch = true
    config.devtool = 'source-map'
    config.cache = true
}

module.exports = config
