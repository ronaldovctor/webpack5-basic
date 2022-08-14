const webpack = require('webpack')
const modeDev = process.env.NODE_ENV !== 'production'
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    // mode: 'production',
    // mode: 'development',
    mode: modeDev ? 'development' : 'production',
    entry: './src/principal.js',
    output: {
        filename: 'principal.js',
        path: `${__dirname}/public`
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "estilo.css"
        })
    ],
    module: {
        rules: [
            {
                test: /\.s?[ac]ss$/,
                use : [
                    MiniCssExtractPlugin.loader,
                    //'style-loader', // Adiciona CSS a DOM injetando a tag <style>
                    'css-loader', // Interpreta @import, url()...
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                type: 'asset/resource'
            }
        ]
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true
            }),
            new CssMinimizerPlugin({})
        ]
    },
    devServer: {
        static: {
            directory: './public'
        },
        port: 9000
    }
}