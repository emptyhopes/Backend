const EslintWebpackPlugin = require("eslint-webpack-plugin");

const { sync } = require("cross-spawn");

const { Utils } = require("../webpack.utils.js");
const { Paths } = require("../../Paths/Paths.js");

const Watch = {
  ...Utils.defaults,

  mode: "development",
  devtool: "source-map",

  watch: true,

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
      extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    }),

    {
      apply: (compiler) => {
        compiler.hooks.afterEmit.tap("afterCompile", () => {
          sync("npm", ["run", "development"], { stdio: "inherit" });
          sync("node", ["Build/static/javascript/index.js"], { stdio: "inherit" });
        });
      },
    },
  ],

  module: {
    rules: Utils.rules,
  },
};

module.exports = Watch;
