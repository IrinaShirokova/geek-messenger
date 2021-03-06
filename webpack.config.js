const path = require("path");
const webpack = require('webpack');

module.exports = {
   mode: "development",
   entry: {
       app: './index.js',
   },
   context: path.resolve(__dirname, "src"),
   output: {
       path: path.resolve(__dirname, "static", "build"),
       filename: 'app.js',
   },
   module: {
    rules: [
        {
            test: /\.(js|jsx|sass|scss|json)$/,
            include: path.resolve(__dirname, "src"),
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: {
              presets: ['@babel/env', '@babel/react'],
              plugins: [
                            [
                                "@babel/plugin-proposal-class-properties",
                                {
                                    "loose": true
                                }
                            ]
                        ]
            }
        },
        {
            test: /\.css$/,
            loader: 'style-loader!css-loader',
        },
    ],
    },
    resolve: {
        modules: [`${__dirname}/src`, 'node_modules'],
        extensions: ['.js', '.jsx', ',.scss', '.sass', '.json'],
     },
     devServer: {
        port: 8080,
        historyApiFallback: {
            index: 'index.html'
        }
     },
};