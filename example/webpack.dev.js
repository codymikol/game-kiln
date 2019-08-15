const path = require('path');

module.exports = {
    target:'web',
    mode: 'development',
    devtool: 'source-map',
    context: path.resolve(__dirname, './'),
    entry: {
        Game: './index.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist')
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};