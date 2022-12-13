const TerserWebpackPlugin = require("terser-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const { Utils } = require("./webpack.utils.js");

module.exports = {
  ...Utils.defaults,

  mode: "production",

  output: {
    ...Utils.defaults.output,
    filename: Utils.combined.production.javascript.index
  },

  optimization: {
    ...Utils.defaults.optimization,

    minimize: true,

    minimizer: [
      new TerserWebpackPlugin({
        extractComments: {
          condition: true,

          filename: (file) => {
            return `${file.filename}.LICENSE.txt${file.query}`;
          },

          banner: (file) => {
            return `License information can be found in ${file}`;
          }
        },

        terserOptions: {
          compress: true
        }
      })
    ]
  },

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },

  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "disabled",
      generateStatsFile: true
    })
  ]
};
