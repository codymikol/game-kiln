const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    mode: 'production',
    optimization: {
        usedExports: true
    },
    context: path.resolve(__dirname, './src'),
    entry: {
        Kiln: './Kiln/standalone/Kiln.js',
    },
    plugins: [
        new CompressionPlugin()
    ],
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