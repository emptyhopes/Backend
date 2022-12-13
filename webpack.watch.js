const EslintWebpackPlugin = require("eslint-webpack-plugin");

const { sync } = require("cross-spawn");

const { Utils } = require("./webpack.utils.js");

module.exports = {
  ...Utils.defaults,

  mode: "development",
  devtool: "source-map",

  watch: true,

  output: {
    ...Utils.defaults.output,
    filename: Utils.combined.development.javascript.index
  },

  plugins: [
    new EslintWebpackPlugin({
      extensions: [".js", ".ts", ".json"]
    }),

    {
      apply: (compiler) => {
        compiler.hooks.afterEmit.tap("afterCompile", () => {
          sync("node", ["Build/Javascript/index.js"], { stdio: "inherit" });
        });
      }
    }
  ]
};
