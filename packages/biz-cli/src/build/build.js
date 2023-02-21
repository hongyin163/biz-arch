import ora from 'ora';
import rm from 'rimraf';
import { join } from 'path';
import { red, cyan } from 'chalk';
import webpack from 'webpack';
import merge from 'webpack-merge';
import minimist from 'minimist';
import webpackProdConfig from './webpack/webpack.prod.conf';
import buildEntry from './webpack/build-entry';
import config from '../config'

const options = minimist(process.argv.slice(2), {
    default: {
        name: ''
    }
});

const name = options.name;
const entry = buildEntry(name);
const webpackConfig = merge.strategy({
    entry: 'replace'
})(
    webpackProdConfig, {
    entry
})

const { assetsRoot, assetsSubDirectory } = config;
let spinner = ora(`building ${name === '' ? 'all' : name} for production...`);
spinner.start();

rm(join(assetsRoot, assetsSubDirectory), err => {
    if (err) throw err;
    webpack(webpackConfig, (err, stats) => {
        spinner.stop();
        if (err) throw err;
        process.stdout.write(`${stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        })}\n\n`);

        if (stats.hasErrors()) {
            console.log(red('  Build failed with errors.\n'));
            process.exit(1);
        }

        console.log(cyan('  Build complete.\n'));
    });
});
