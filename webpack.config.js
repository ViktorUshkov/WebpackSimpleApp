const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");



module.exports = (env) => {
    const isDev = env.mode === "development";
    return {
        mode: env.mode ?? "development",
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                      MiniCssExtractPlugin.loader,
                      // Translates CSS into CommonJS
                      "css-loader",
                      // Compiles Sass to CSS
                      "sass-loader",
                    ],
                },
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        devtool: isDev && 'source-map',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.[contenthash].js',
            clean: true
        },
        devServer: {
            static: './dist',
            hot: true,
        },
        plugins: [
            new webpack.ProgressPlugin(),
            new MiniCssExtractPlugin(),
            new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') }),
          ],
    }
}