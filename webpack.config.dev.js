var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var autoprefixer = require("autoprefixer");
var path = require("path");
var DashboardPlugin = require("webpack-dashboard/plugin");

var conf = {
  resolve: {
    extensions: ["*", ".js", ".jsx", ".json"],
    alias: {
      Images: path.resolve(__dirname, "src/images/")
    }
  },
  devtool: "eval-source-map", // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
  entry: [
    // must be first entry to properly set public path
    path.resolve(__dirname, "src/index-dev.js") // Defining path seems necessary for this to work consistently on Windows machines.
  ],
  target: "web", // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
  output: {
    path: path.resolve(__dirname, "dist"), // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: "/",
    filename: "bundle.js"
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"), // Tells React to build in either dev or prod modes. https://facebook.github.io/react/downloads.html (See bottom)
      __DEV__: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(), // Avoid publishing files when compilation failed
    new HtmlWebpackPlugin({
      // Create HTML file that includes references to bundled CSS and JS.
      template: "src/index.ejs",
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      inject: true
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: true,
      noInfo: true, // set to false to see a list of every file being bundled.
      options: {
        sassLoader: {
          includePaths: [path.resolve(__dirname, "src", "scss")]
        },
        context: "/",
        postcss: () => [autoprefixer]
      }
    }),
    new DashboardPlugin()
  ],
  externals: {

  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ["babel-loader"] },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=image/svg+xml"
      },
      { test: /\.(jpe?g|png|gif)$/i, loader: "file-loader?name=[name].[ext]" },
      { test: /\.ico$/, loader: "file-loader?name=[name].[ext]" },
      {
        test: /(\.css|\.scss|\.sass)$/,
        loaders: [
          "style-loader",
          "css-loader?sourceMap",
          "postcss-loader",
          "sass-loader?sourceMap"
        ]
      }
    ]
  }
};
module.exports = conf;
