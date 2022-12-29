const TerserWebpackPlugin = require("terser-webpack-plugin");

const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const { Utils } = require("../../webpack.utils.js");
const { Paths } = require("../../../Paths/Paths.js");

const Production = {
  ...Utils.defaults,

  mode: "production",

  entry: {
    index: Paths.paths.absolute.entry.production.index,
  },

  output: {
    ...Utils.defaults.output,
    filename: Paths.combined.production.javascript.index,
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
          },
        },

        terserOptions: {
          compress: true,
        },
      }),

      new BundleAnalyzerPlugin({
        analyzerMode: "disabled",
        generateStatsFile: true,
      }),
    ],
  },

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },

  externals: Utils.externals,

  plugins: Utils.plugins,

  module: {
    rules: Utils.rules,
  },
};

module.exports = Production;
