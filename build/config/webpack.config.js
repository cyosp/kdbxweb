'use strict';

var path = require('path'),
    webpack = require('webpack'),
    pkg = require('./../../package.json');

var debug = process.argv.indexOf('--debug') > 0;

var TerserPlugin = require('terser-webpack-plugin');
const CreateFileWebpack = require('create-file-webpack');

const banner = 'kdbxweb v' + pkg.version + '⑂CYOSP' + ', (c) ' + new Date().getFullYear() +
    ' ' + pkg.author + ', opensource.org/licenses/' + pkg.license;

const outputDir = 'dist/package/dist';

module.exports = {
    mode: 'production',
    context: path.join(__dirname, '../../lib'),
    entry: './index.js',
    output: {
        path: path.join(__dirname, '../../' + outputDir),
        filename: 'kdbxweb' + (debug ? '' : '.min') + '.js',
        library: 'kdbxweb',
        libraryTarget: 'umd',
        globalObject: 'this'
    },
    module: {},
    resolve: {
        modules: [path.join(__dirname, '../../lib'), path.join(__dirname, '../../node_modules')]
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: banner
        }),
        new CreateFileWebpack({
            path: outputDir + '/..',
            fileName: 'package.json',
            content: '{"name": "kdbxweb", "version": "' + pkg.version + '", "main": "dist/kdbxweb.js"}'
        })
    ],
    node: {
        console: false,
        process: false,
        Buffer: false,
        __filename: false,
        __dirname: false,
        crypto: false,
        zlib: false
    },
    optimization: {
        minimize: !debug,
        minimizer: debug ? [] : [
            new TerserPlugin({
                extractComments: false
            })
        ]
    },
    externals: {
        fs: true,
        path: true,
        xmldom: true,
        crypto: true,
        zlib: true
    },
    performance: {
        hints: false
    }
};
