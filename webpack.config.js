const path = require('path');

module.exports = {
    target: 'node',
    mode: 'development',
    devtool: 'eval-source-map',
    context: path.resolve(__dirname, './src'),
    entry: {
        Kiln: './index.js',
    },
    output: {
        library: 'Kiln',
        libraryTarget: 'umd',
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