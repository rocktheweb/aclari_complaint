const path = require("path");

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => {

    let prod = env !== undefined && env.production === true;

    return {
        
        devtool: prod ? 'source-map' : 'eval-cheap-module-source-map',

        entry: {
            complaints: "./src/js/complaints.js",
            form: "./src/js/form.js"
        },
    
        output: {
            path: path.resolve(__dirname, "dist/"),
            filename: prod ? "js/[name].[chunkhash].js" : "js/[name].js"
        },

        optimization: {
            splitChunks: {
                chunks: 'all'
            }
        },

        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            index: 'form.html'
        },
    
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        'css-loader',
                    ],
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        { loader: prod ? MiniCssExtractPlugin.loader : 'style-loader' },
                        { loader: 'css-loader', options: { sourceMap: true } },
                        { loader: 'resolve-url-loader', options: { sourceMap: true } },
                        { loader: 'postcss-loader', options: { sourceMap: true } },
                        { loader: 'sass-loader', options: { sourceMap: true } }
                    ],
                },
                {
                    test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 2000,
                            outputPath: 'images',
                            esModule: false,
                        }
                    }
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [
                        'file-loader',
                    ],
                },
            ]
        },
    
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                filename: 'complaints.html',
                template: './src/templates/complaints.html',
                chunks: ['complaints']
            }),
            new HtmlWebpackPlugin({
                filename: 'form.html',
                template: './src/templates/form.html',
                chunks: ['form']
            }),
            new MiniCssExtractPlugin({
                filename: prod ? 'css/[name].[hash].css' : 'css/[name].css' 
            }),
        ],
    
    };
}
