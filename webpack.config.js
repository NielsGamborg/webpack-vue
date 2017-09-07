const path = require('path');

module.exports = {
    //entry: './app/index.js',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        proxy: {
            '/spot-service': {
                target: 'http://devel06:8381',
                pathRewrite: { '^/spot-service': '' },
                secure: false
            }
        }
    },
    entry: {
        app: './app/js/index.js',
        helperFunctions: './app/js/helperFunctions.js'
    },
    output: {
        //filename: 'bundle.js',
        filename: './js/[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    }
};