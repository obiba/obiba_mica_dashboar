let mix = require('laravel-mix');

const summaryOutPutJs = "obiba-mica-summary-dashboard";
const glob = require("glob");
const summaryFiles = glob.sync("./js/src/summary/**/*.js");
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

mix.options({
  uglify: {},
});
require('laravel-mix-eslint-config');

mix.scripts(summaryFiles, 'js/dist/' + summaryOutPutJs + '.js');

/**
 * Customize webpack config.
 */
const webpackExtraConfig = {
  module: {
    rules: [
      {
        test: /\.(js)$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          failOnWarning: process.env.NODE_ENV === 'production',
        },
      },
    ],
  },
  plugins: [
    // Ensure any style errors are shown on build fails.
    new FriendlyErrorsPlugin({
      clearConsole: false
    })
  ],
};
mix.webpackConfig(webpackExtraConfig);
