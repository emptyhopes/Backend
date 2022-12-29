const EslintWebpackPlugin = require("eslint-webpack-plugin");

const { Utils } = require("../webpack.utils.js");
const { Paths } = require("../../Paths/Paths.js");

const Development = {
  ...Utils.defaults,

  mode: "development",
  devtool: "source-map",

  entry: {
    index: Paths.paths.absolute.entry.development.index,
  },

  output: {
    ...Utils.defaults.output,
    filename: Paths.combined.development.javascript.index,
  },

  externals: Utils.externals,

  plugins: [
    ...Utils.plugins,

    new EslintWebpackPlugin({
      extensions: [".js", ".ts", ".json"],
    }),
  ],

  module: {
    rules: Utils.rules,
  },
};

module.exports = Development;
