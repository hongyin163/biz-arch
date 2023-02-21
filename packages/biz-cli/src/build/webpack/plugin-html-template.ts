
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { basename } from 'path';
import config from '../../config';
import paths from '../../paths';

export function getTemplatePlugin(entries) {
    // let { entries } = config;
    const plugins = [], ignores = [];
    Object.keys(entries).forEach((key) => {
        const item = entries[key];
        // let basename = path.basename(item.template);
        const srcPath = paths.src;
        // let relativePath = path.relative(item.template, srcPath);
        const split = item.split || {};
        const chunks = Object.keys(split)
            .map((p) => `${key}-${p}`)
            .concat([key]);

        // console.log(chunks);

        const tplOutput = item.template.replace(srcPath, config.assetsRoot);
        plugins.push(new HtmlWebpackPlugin({
            filename: tplOutput,
            template: item.template,
            inject: true,
            chunks,
            chunksSortMode: 'dependency',
        }));

        ignores.push(basename(item.template));
    });

    plugins.push(new CopyWebpackPlugin([
        {
            from: `${paths.src}/views/`,
            to: `${paths.dist}/views/`,
            ignore: ignores,
        },
    ]));

    return plugins;
}
