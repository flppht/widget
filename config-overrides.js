const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = function override(config) {
  config.output = {
    ...config.output,
    filename: "static/js/widget.[name].js",
    // filename: "static/js/widget.js",
    // chunkFilename: "static/js/widget.[name].js",
    // path: "/modal_script/build",
    // pathinfo: false,
    // publicPath: "/",
    // globalObject: "this",
  };

  config.plugins = config.plugins.map((plugin) => {
    if (plugin.constructor.name === "MiniCssExtractPlugin") {
      return new MiniCssExtractPlugin({
        filename: "static/css/widget.css",
        chunkFilename: "static/css/widget.[name].css",
      });
    }
    return plugin;
  });

  // config.module.rules.push({
  //   test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
  //   loader: "file-loader",
  //   options: {
  //     name: "static/media/[name].[hash:8].[ext]",
  //   },
  // });

  return config;
};
