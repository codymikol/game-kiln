const path = require('path');

module.exports = function (config) {
    config.set({
        basePath: path.resolve(__dirname, './'),
        frameworks: ['jasmine'],
        preprocessors: {
            './spec/**/*.js': ['babel', 'webpack'],
        },
        webpack: {},
        webpackMiddleware: {
          stats: 'errors-only',
        },
        exclude: [
            'karma.conf.js',
            'webpack.config.js'
        ],
        files: [
            './spec/**/*.js',
        ],
        reporters: ["spec"],
        port: 9876,
        colors: true,
        logLevel: config.LOG_ERROR,
        autoWatch: false,
        browsers: ['ChromeHeadless'],
        singleRun: false,
        concurrency: Infinity,
        plugins: [
            'karma-babel-preprocessor',
            'karma-jasmine',
            'karma-spec-reporter',
            'karma-chrome-launcher',
            'karma-webpack'
        ]
    })
};
