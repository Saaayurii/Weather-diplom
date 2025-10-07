const path = require('path');

// __dirname уже доступен в CommonJS контексте

// Загрузка переменных окружения из .env файла
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const webpack = require('webpack');

module.exports = {

    stats: 'minimal',

    entry: {
        app: './src/index.ts'
    },

    output: {
        path: path.resolve(__dirname, '../../../public'),
        publicPath: '/',
    },

    performance: {
        hints: false
    },

    resolve: {
        extensions: ['.ts', '.js'],

        alias: {
            'components': path.resolve(__dirname, '../src/components'),
            'constants': path.resolve(__dirname, '../src/constants'),
            'controllers': path.resolve(__dirname, '../src/controllers'),
            'store': path.resolve(__dirname, '../src/store'),
        },

        symlinks: false
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.(ts|js)x?$/,
                loader: 'babel-loader',
                exclude: {
                    test: /node_modules/,
                    not: [
                        /@ocula/,
                        /.*\.vue\.(js|ts)$/
                    ]
                }
            },
            {
                test: /\.(png|jpg|gif|svg|woff|woff2|eot|ttf)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    },

    plugins: [

        new webpack.EnvironmentPlugin({
            'MAPBOX_API_KEY': '',
            'WORLDTIDES_API_KEY': '',
            'OWM_API_KEY': '',
            'GA_TRACKING_ID': '',
            'SENTRY_DSN': '',
        }),

        new webpack.DefinePlugin({
            '__VUE_OPTIONS_API__': false,
            '__VUE_PROD_DEVTOOLS__': false
        }),

        new CleanWebpackPlugin(),

        new VueLoaderPlugin(),

        new HtmlWebpackPlugin({
            title: 'Ocula',
            template: './src/index.ejs'
        }),

        // FaviconsWebpackPlugin отключен из-за проблем с sharp в Docker
        // new FaviconsWebpackPlugin({
        //     logo: './src/assets/images/logo/logo-512.svg',
        //     favicons: {
        //         appName: 'Ocula',
        //         appShortName: 'Ocula',
        //         appDescription: 'The open-source, progressive weather app',
        //         developerName: 'Andrew Courtice',
        //         display: 'standalone',
        //         background: '#FFFFFF',
        //         theme_color: '#FFFFFF',
        //         appleStatusBarStyle: 'default',
        //         start_url: '/?source=pwa',
        //         scope: '/',
        //         icons: {
        //             android: true,
        //             appleIcon: true,
        //             appleStartup: true,
        //             favicons: true,
        //             firefox: true,
        //             windows: true
        //         }
        //     }
        // }),

        new CopyWebpackPlugin([
            './src/static'
        ])

    ]
};
