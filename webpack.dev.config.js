const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        'index': './src/index.js',
        'about': './src/about.js',
        'js_utils': './src/js/js_utils.js',
        'scroll_functions': './src/js/scroll_functions.js',
        'scroll_triggers': './src/js/scroll_triggers.js'
    },
    output: {
        path: path.join(__dirname, './dist'),
        publicPath: '/',
        filename: 'js/[name].js'
    },
    mode: 'production',
    devServer: {
        contentBase: path.resolve(__dirname,'./dist'),
        index: 'index.html',
        port: 9001
      },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images'
                    }
                }]
            },
            {
                // Transpile ES6-8 to ES5
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                // Loads the JavaScript into html template provided.
                test: /\.html$/,
                use: [{loader: 'html-loader'}]
            },
            {
                test: /\.(css$)/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(scss$)/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
          }),
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({
            template: "src/index.html",
            filename: "index.html",
            chunks: ['index']
        }),
        new HtmlWebPackPlugin({
            template: "src/about.html",
            filename: "about.html",
            chunks: ['about']
        }),
    ]
};
