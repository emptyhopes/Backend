const { resolve } = require("path");

class Paths extends null {
  static root = process.cwd();

  static paths = {
    absolute: {
      context: resolve(this.root),
      application: resolve(this.root, "Application"),
      output: resolve(this.root, "Build", "static"),
      entry: {
        development: {
          index: resolve(this.root, "Application", "Ship", "Utils", "Application", "Development", "index.ts"),
        },
        production: {
          index: resolve(this.root, "Application", "Ship", "Utils", "Application", "Production", "index.ts"),
        },
      },
    },

    relative: {
      javascript: {
        development: {
          index: "javascript",
        },
        production: {
          index: "javascript",
        },
      },
    },
  };

  static filenames = {
    development: {
      javascript: {
        index: "[name].js",
      },
    },
    production: {
      javascript: {
        index: "[name].[contenthash].js",
      },
    },
  };

  static combined = {
    development: {
      javascript: {
        index: this.paths.relative.javascript.development.index + "/" + this.filenames.development.javascript.index,
      },
    },
    production: {
      javascript: {
        index: this.paths.relative.javascript.production.index + "/" + this.filenames.production.javascript.index,
      },
    },
  };

  static GetAbsolutePath() {
    return resolve(...arguments);
  }
}

module.exports = { Paths };
