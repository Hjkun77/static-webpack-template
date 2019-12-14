const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    // https://webpack.js.org/concepts/entry-points/#multi-page-application
    entry: {
        index: './src/resources/scripts/index.js',
        about: './src/resources/scripts/about.js',
        contacts: './src/resources/scripts/contacts.js'
    },

    // https://webpack.js.org/configuration/dev-server/
    devServer: {
        port: 8080,
        open: true
    },

    resolve: {
        alias: {
            Images: path.resolve(__dirname, "src/resources/images"),
            Styles: path.resolve(__dirname, "src/resources/stylesheets"),
        }
    },
    // https://webpack.js.org/concepts/plugins/
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: true,
            chunks: ['index'],
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/about.html',
            inject: true,
            chunks: ['index'],
            filename: 'about.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/contacts.html',
            inject: true,
            chunks: ['index'],
            filename: 'contacts.html'
        })
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                // Now we apply rule for images
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        // Using file-loader for these files
                        loader: "file-loader",
                        options: {
                            name: '[name].[ext]',
                            esModule: false,
                        }
                    }
                ]
            },
            {
                // Apply rule for fonts files
                test: /\.(woff|woff2|ttf|otf|eot)$/,
                use: [
                    {
                        // Using file-loader too
                        loader: "file-loader"
                    }
                ]
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader'
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            }
        ]
    }

};