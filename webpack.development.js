const EslintWebpackPlugin = require("eslint-webpack-plugin");

const { Utils } = require("./webpack.utils.js");

module.exports = {
  ...Utils.defaults,

  mode: "development",
  devtool: "source-map",

  output: {
    ...Utils.defaults.output,
    filename: Utils.combined.development.javascript.index
  },

  plugins: [
    new EslintWebpackPlugin({
      extensions: [".js", ".ts", ".json"]
    })
  ]
};
