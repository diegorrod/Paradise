var path = require('path');
var HtmlWebpackPlugin =  require('html-webpack-plugin');

module.exports = (env, argv) => {
    const isDevelopment = argv.mode === 'development';
    return ({
        entry : './src/index.js',
        output : {
            path : path.resolve(__dirname , 'build'),
            filename: 'index_bundle.js'
        },
        mode: argv.mode,
        devtool: isDevelopment
            ? '#eval-source-map'
            : 'source-map',
        devServer: {
            stats: {
                children: false,
                maxModules: 0
            },
            port: 3000
        },
        module : {
            rules : [
                {test : /\.(js)$/, use:'babel-loader'},
                {test : /\.css$/, use:['style-loader', 'css-loader']},
                {
                    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }]
                },
                {
                    test: /\.(svg)$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/svg/'
                        }
                    }]
                }
            ],
        },
        plugins : [
            new HtmlWebpackPlugin ({
                template : 'public/index.html'
            })
        ],
        resolve: {
            alias: {
                "/": path.resolve(__dirname, 'src')
            }
        }
    })
}