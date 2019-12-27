const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/index.js"
  },
  output: {
    filename: "main.js",
    path: path.resolve("dist/client")
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      meta: [
        {viewport: "width=device-width, initial-scale=1.0"},
        {"http-equiv": "X-UA-Compatible", content: "IE=edge"},
        {"charset": "UTF-8"}
      ]
    })
  ]
};
