'use strict';

var path = require('path'),
    walk = require('fs-walk');

var entry = [];

walk.walkSync('test', function(basedir, filename, stat) {
    if (stat.isFile() && path.extname(filename) === '.js') {
        entry.push(path.join(basedir, filename).replace('test', '.'));
    }
});

module.exports = {
    mode: 'production',
    context: path.join(__dirname, '../../test'),
    entry: entry,
    output: {
        path: path.join(__dirname, '../../dist'),
        filename: 'kdbxweb.test.js',
        libraryTarget: 'umd',
        globalObject: 'this'
    },
    module: {
        rules: [{
            test: /argon2-asm/,
            loader: 'exports-loader?Module'
        }]
    },
    resolve: {
        modules: [path.join(__dirname, '../../lib'), path.join(__dirname, '../../node_modules')]
    },
    node: {
        console: false,
        process: false,
        Buffer: false,
        __filename: false,
        __dirname: false,
        crypto: false,
        zlib: false
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
