const ExtractTextPlugin = require('extract-text-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin');

function makeRuleOneOf(oneOf) {
    return oneOf.map(rule => {
        if (rule.test && rule.test.test && rule.test.test('.tsx')) {
            rule.use[0].options.getCustomTransformers = () => ({
                before: [
                    tsImportPluginFactory([
                        {
                            libraryName: 'antd',
                            libraryDirectory: 'lib',
                            style: true
                        }, {
                            style: false,
                            libraryName: 'lodash',
                            libraryDirectory: null,
                            camel2DashComponentName: false
                        }
                    ])
                ]
            });

            rule.use[0].options.compilerOptions = {
                module: 'es2015'
            };
        }

        return rule;
    });
}

module.exports = function override(config) {
    if (process.env.NODE_ENV === 'development') {
        config.module.rules = config.module.rules.map(rule => {
            const {oneOf} = rule;

            if (oneOf instanceof Array) {
                rule.oneOf = makeRuleOneOf(oneOf);

                return {
                    ...rule,
                    oneOf: [
                        {
                            test: /\.less$/,
                            use: [{
                                loader: 'style-loader'
                            }, {
                                loader: 'css-loader'
                            }, {
                                loader: 'less-loader'
                            }]
                        },
                        ...rule.oneOf
                    ]
                };
            }

            return rule;
        });
    } else {
        config.module.rules = config.module.rules.map(rule => {
            const {oneOf} = rule;

            if (oneOf instanceof Array) {
                rule.oneOf = makeRuleOneOf(oneOf);
            }

            return rule;
        });

        config.module.rules.push({
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                use: [{
                    loader: 'css-loader',
                    options: {
                        minimize: true
                    }
                }, {
                    loader: 'less-loader'
                }]
            })
        });

        config.plugins.forEach(plugin => {
            if (plugin instanceof ExtractTextPlugin) {
                plugin.options.allChunks = true;
            }
        });
    }

    return config;
};


// const ExtractTextPlugin = require('extract-text-webpack-plugin');
//
// module.exports = function override(config) {
//     let existETP = false;
//
//     config.module.rules.push({
//         test: /\.less$/,
//         use: ExtractTextPlugin.extract({
//             use: [{
//                 loader: 'css-loader',
//                 options: {
//                     minimize: true
//                 }
//             }, {
//                 loader: 'less-loader'
//             }]
//         })
//     });
//
//     config.plugins.forEach(plugin => {
//         if (plugin instanceof ExtractTextPlugin) {
//             existETP = true;
//             plugin.options.allChunks = true;
//         }
//     });
//
//     if (!existETP) {
//         config.plugins.push(new ExtractTextPlugin({
//             filename: 'styles.css',
//             allChunks: true
//         }));
//     }
//
//     return config;
// };
