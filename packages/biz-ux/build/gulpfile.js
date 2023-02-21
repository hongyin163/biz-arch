const gulp = require('gulp');
const less = require('gulp-less');
const babel = require('gulp-babel');
const paths = require('./paths');
// const path = require('path');
// const through2 = require('through2');
const rimraf = require('rimraf');
const ts = require('gulp-typescript');
const tsConfig = require('./getTsConfig')();
const babelConfig = require('./getBabelConfig');
// console.log(tsConfig)
const tsDefaultReporter = ts.reporter.defaultReporter();
const nullReporter = ts.reporter.nullReporter();
const esDir = paths.es();
const libDir = paths.lib();
const tmpDir = paths.tmp();


function clear(cb) {
    rimraf.sync(esDir);
    rimraf.sync(libDir);
    cb();
};

/**
 * 输出 TS 类型信息
 * @param {boolean} es 是否es模块
 */
function emitDeclaration() {
    return gulp.src([
        paths.src('**/*.ts'),
        paths.src('**/*.tsx'),
        paths.src('**/*.js'),
        paths.src('**/*.jsx'),
        `!${paths.src('*/style/**/*')}`,
        `!${paths.src('*/__test__')}`,
        `!${paths.src('*/demo/**/*')}`,
    ])
        .pipe(ts(tsConfig, nullReporter))
        .on('error', () => { })
        .pipe(gulp.dest(esDir))
        .pipe(gulp.dest(libDir))
};


function compileLess() {
    return gulp.src([
        paths.src('*/style/index.less'),
        paths.src('style/index.less'),
        `!${paths.src('style/*/**/*')}`
    ])
        .pipe(less({
            relativeUrls: true,
            // paths: [path.resolve(__dirname,'../src/components/style/')],
            javascriptEnabled: true,
            ieCompat: true
        }))
        .pipe(gulp.dest(esDir))
        .pipe(gulp.dest(libDir));
}


function compileTsToJs(es) {
    const distDir = es === true ? esDir : libDir;
    const modules = es === true ? false : 'commonjs';
    return function tsToJs() {
        return gulp.src([
            paths.src('**/*.ts'),
            paths.src('**/*.tsx'),
            paths.src('**/*.js'),
            paths.src('**/*.jsx'),
            `!${paths.src('*/__test__')}`,
            `!${paths.src('style/**/*')}`,
            `!${paths.src('*/demo/**/*')}`,
            `!${paths.src('node_modules/**/*')}`,
        ])
            .pipe(babel(babelConfig(modules)))
            .pipe(gulp.dest(distDir));
    }
}


function syncLess() {
    return gulp.src([
        paths.src('**/*.less'),
    ])
        .pipe(gulp.dest(libDir))
        .pipe(gulp.dest(esDir))
}

function syncStaticFile() {
    return gulp.src([
        paths.src('**/*.@(png|jpg|jpeg|gif|svg)'),
        paths.src('**/fonts/*'),
    ])
        .pipe(gulp.dest(libDir))
        .pipe(gulp.dest(esDir))
}


gulp.task('compileTs', gulp.parallel([compileTsToJs(true), compileTsToJs(false)]));

gulp.task('buildLess', gulp.parallel([compileLess, syncLess, syncStaticFile]));

gulp.task('emitTsDeclaration', emitDeclaration);

gulp.task('default', gulp.series([
    clear,
    'compileTs',
    'buildLess',
    'emitTsDeclaration',
]));
