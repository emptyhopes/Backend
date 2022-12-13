const { resolve } = require("path");

const WebpackNodeExternals = require("webpack-node-externals");

class Utils extends null {
  static root = process.cwd();

  static paths = {
    absolute: {
      context: resolve(this.root),
      application: resolve(this.root, "Application"),
      output: resolve(this.root, "Build"),
      entry: {
        index: resolve(this.root, "index.ts")
      }
    },

    relative: {
      javascript: "Javascript"
    }
  };

  static filenames = {
    development: {
      javascript: {
        index: "[name].js"
      }
    },
    production: {
      javascript: {
        index: "[name].[contenthash].js"
      }
    }
  };

  static alias = {
    "@Application": this.GetAbsolutePath(this.root, "Application"),
    "@Configs": this.GetAbsolutePath(this.root, "Configs"),

    "@Containers": this.GetAbsolutePath(this.root, "Application", "Containers"),
    "@Ship": this.GetAbsolutePath(this.root, "Application", "Ship")
  };

  static extensions = [".js", ".ts", ".json"];

  static combined = {
    development: {
      javascript: {
        index: this.paths.relative.javascript + "/" + this.filenames.development.javascript.index
      }
    },
    production: {
      javascript: {
        index: this.paths.relative.javascript + "/" + this.filenames.production.javascript.index
      }
    }
  };

  static defaults = {
    target: "node",

    context: this.paths.absolute.context,

    entry: {
      index: this.paths.absolute.entry.index
    },

    output: {
      path: this.paths.absolute.output,
      clean: true
    },

    resolve: {
      alias: this.alias,
      extensions: this.extensions
    },

    externals: [WebpackNodeExternals()],

    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            name: "vendor",
            test: /node_modules/,
            chunks: "all",
            enforce: true
          }
        }
      }
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: Utils.JavascriptLoader()
        },
        {
          test: /\.ts$/,
          exclude: /(node_modules)/,
          use: Utils.JavascriptLoader()
        }
      ]
    }
  };

  static GetAbsolutePath() {
    return resolve(...arguments);
  }

  static JavascriptLoader() {
    const loader = {
      loader: "babel-loader",
      options: { babelrc: true }
    };

    return loader;
  }
}

module.exports = { Utils };
