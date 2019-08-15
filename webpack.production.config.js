const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    target: 'node',
    mode: 'production',
    optimization: {
        usedExports: true
    },
    context: path.resolve(__dirname, './src'),
    entry: {
        Kiln: './index.js',
    },
    plugins: [
        new CompressionPlugin()
    ],
    output: {
        library: 'Kiln',
        libraryTarget: 'commonjs2',
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