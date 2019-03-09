const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        Kiln: './src/Kiln/standalone/Kiln.js',
        KGame: './src/Kiln/packages/KGame/KGame.js',
        KScreen: './src/Kiln/packages/KScreen/KScreen.js',
        KEntity: './src/Kiln/packages/KEntity/KEntity.js',
        KDraw: './src/Kiln/packages/KDraw/KDraw.js',
        KInput: './src/Kiln/packages/KInput/KInput.js'
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