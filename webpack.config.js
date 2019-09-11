const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = function (env) {
    return {
        mode: 'production',
        devtool: 'source-map',
        entry: {
            'main_embedded': path.join(__dirname, 'main_embedded.js'),
            'main_separate': path.join(__dirname, 'main_separate.js'),
        },
        output: {
            path: path.join(__dirname, 'dist'),
            filename: '[name].js',
        },
        module: {
            rules: [
                {
                    test: /\.html$/,
                    use: [
                        { loader: 'text-loader' }
                    ]
                }
            ]
        },
        resolve: {
            extensions: ['.js', '.html']
        },
        resolveLoader: {
            modules: [
                'node_modules'
            ]
        },
        plugins: [],
        optimization: {
            minimize: true,
            namedModules: true,
            namedChunks: true,
            sideEffects: false,
            usedExports: false,
            concatenateModules: false,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        compress: false,
                        mangle: true,
                        warnings: 'verbose'
                    },
                    parallel: true,
                    sourceMap: true
                })
            ]
        }
    };
};
