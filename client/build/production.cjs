const TerserPlugin = require('terser-webpack-plugin');
const OptimiseCSSPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const merge = require('webpack-merge');
const base = require('./_base/config.cjs');
const workboxConfig = require('./_base/workbox.cjs');

const CSS_LOADERS = [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
        loader: 'postcss-loader',
        options: {
            config: {
                path: 'client/'
            }
        }
    }
];

module.exports = merge(base, {
    mode: 'production',

    output: {
        filename: '[name]-[contenthash].js',
        chunkFilename: '[name]-[contenthash].js'
    },

    devtool: 'source-map',

    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            automaticNameDelimiter: '-',
            cacheGroups: {
                vendor: {
                    test: (module) => module.context && module.context.includes('node_modules') && !module.context.includes('@ocula'),
                    name: 'vendor',
                    chunks: 'initial',
                    enforce: true
                }
            }
        },
        minimizer: [
            new TerserPlugin(),
            new OptimiseCSSPlugin()
        ]
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: CSS_LOADERS
            },
            {
                test: /\.scss$/,
                use: [].concat(CSS_LOADERS, 'sass-loader'),
                exclude: {
                    test: /node_modules/,
                    not: [
                        /@ocula/
                    ]
                }
            },
            {
                test: /\.sass$/,
                use: [].concat(CSS_LOADERS, 'sass-loader?indentedSyntax'),
                exclude: {
                    test: /node_modules/,
                    not: [
                        /@ocula/
                    ]
                }
            }
        ]
    },

    plugins: [

        new MiniCssExtractPlugin({
            filename: '[name]-[contenthash].css',
            chunkFilename: '[name]-[contenthash].css'
        }),

        new WorkboxPlugin.GenerateSW(workboxConfig)

    ]
});
