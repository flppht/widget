module.exports = function override(config) {
  config.output = {
    ...config.output,
    filename: "static/js/widget.js",
    chunkFilename: "static/js/widget.[name].js",
  };

  // config.plugins = config.plugins.map((plugin) => {
  //   if (plugin.constructor.name === "MiniCssExtractPlugin") {
  //     return new MiniCssExtractPlugin({
  //       filename: "static/css/widget.css",
  //       chunkFilename: "static/css/widget.[name].css",
  //     });
  //   }
  //   return plugin;
  // });

  return config;
};
