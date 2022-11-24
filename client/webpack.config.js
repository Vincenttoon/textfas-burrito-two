const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: "production",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    // creates js bundle to home all of our store all of our js functions into one script
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    // Injects service worker into application for offline app usage
    plugins: [
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),
      // targets what template to create with Webpack and titles it
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "JATE",
      }),
      // parameters for webpack manifest to create local application
      new WebpackPwaManifest({
        fingerprints: false,
        name: "Just Another Text Editor",
        short_name: "JATE",
        description: "Edit texts with this editor",
        background_color: "#DFDFDF",
        theme_color: "#DFDFDF",
        start_url: "./",
        publicPath: "./",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),
    ],

    module: {
      rules: [
        // loads css script into application
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        // regex to accept different image types
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/icons",
        },
        // takes new JS and node modules and converts them for loading on older browsers without modern js functionality
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};