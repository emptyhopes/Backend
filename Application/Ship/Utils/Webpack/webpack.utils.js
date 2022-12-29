const WebpackNodeExternals = require("webpack-node-externals");

const { Paths } = require("../Paths/Paths.js");

class Utils extends null {
  static alias = {
    "@": Paths.GetAbsolutePath(Paths.root),
  };

  static extensions = [".json", ".js", ".ts"];

  static externals = [WebpackNodeExternals()];

  static rules = [
    {
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: this.JavascriptLoader(),
    },
    {
      test: /\.ts$/,
      exclude: /(node_modules)/,
      use: this.JavascriptLoader(),
    },
  ];

  static plugins = [];

  static defaults = {
    context: Paths.paths.absolute.context,

    target: "node",

    output: {
      path: Paths.paths.absolute.output,
      clean: true,
    },

    resolve: {
      alias: this.alias,
      extensions: this.extensions,
    },

    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            name: "vendor",
            test: /node_modules/,
            chunks: "all",
            enforce: true,
          },
        },
      },
    },
  };

  static JavascriptLoader() {
    const loader = {
      loader: "babel-loader",
      options: { babelrc: true },
    };

    return loader;
  }
}

module.exports = { Utils };
