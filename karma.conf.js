const path = require('path');

module.exports = function(config) {
  config.set({
    basePath: path.resolve(__dirname, './'),
    frameworks: ['jasmine'],
    preprocessors: {
      './spec/**/*.js': ['babel']
    },
    exclude: [
        'karma.conf.js',
        'webpack.config.js'
    ],
    files: [
      './dist/Kiln.bundle.js',
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
  })
};
