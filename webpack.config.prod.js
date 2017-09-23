// For info about this file refer to webpack and webpack-hot-middleware documentation
// For info on how we're generating bundles with hashed filenames for cache busting: https://medium.com/@okonetchnikov/long-term-caching-of-static-assets-with-webpack-1ecb139adb95#.w99i89nsz
import webpack from "webpack";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import autoprefixer from "autoprefixer";
import path from "path";

const GLOBALS = {
  "ps.env.NODE_ENV": JSON.stringify("production"),
  __DEV__: false
};

export default {
  resolve: {
    extensions: ["*", ".js", ".jsx", ".json"],
    alias: {
      images: path.resolve(__dirname, "src/images/")
    }
  },
  devtool: "source-map", // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
  entry: {
    js: path.resolve(__dirname, "src/index")
  },
  target: "web", // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "react-json-to-form.min.js",
    library: "reactJsonToForm",
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: {
    'react': 'react',
    'material-ui': 'material-ui',
    'prop-types': 'prop-types'
  },
  plugins: [
    // Tells React to build in prod mode. https://facebook.github.io/react/downloads.html
    new webpack.DefinePlugin(GLOBALS),

    // Generate an external css file with a hash in the filename
    new ExtractTextPlugin("react-form-generator.css"),

    // Minify JS
    new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),

    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      noInfo: true, // set to false to see a list of every file being bundled.
      options: {
        sassLoader: {
          includePaths: [path.resolve(__dirname, "src", "scss")]
        },
        context: "/",
        postcss: () => [autoprefixer]
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/, /\.spec.js$/],
        loader: "babel-loader"
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader:
          "url-loader?limit=10000&mimetype=application/font-woff&name=[name].[ext]"
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        loader:
          "url-loader?limit=10000&mimetype=application/octet-stream&name=[name].[ext]"
      },
      {
        test: /\.svg(\?v=\d+.\d+.\d+)?$/,
        loader:
          "url-loader?limit=10000&mimetype=image/svg+xml&name=[name].[ext]"
      },
      { test: /\.(jpe?g|png|gif)$/i, loader: "file-loader?name=[name].[ext]" },
      { test: /\.ico$/, loader: "file-loader?name=[name].[ext]" },
      {
        test: /(\.css|\.scss|\.sass)$/,
        loader: ExtractTextPlugin.extract(
          "css-loader?sourceMap!postcss-loader!sass-loader?sourceMap"
        )
      }
    ]
  }
};
