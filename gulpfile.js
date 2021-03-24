const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass');
const webpack = require('webpack-stream');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const gcmq = require('gulp-group-css-media-queries');
const autoprefixer = require('autoprefixer');
const rename = require('gulp-rename');
const browsersync = require('browser-sync').create();

function taskScss() {
  return src('scss/*.scss', { sourcemaps: true })
    .pipe(sass({ outputStyle: 'expanded' }))
    //.pipe(gcmq({}))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(rename({ basename: 'app', suffix: '.min' }))
    .pipe(dest('css', { sourcemaps: '.' }));
};

function taskJS() {
  return src(['js/*.js', '!js/*.min.js'], { sourcemaps: true })
    //.pipe(babel({ presets: ['@babel/preset-env'] }))
    //.pipe(terser())
    .pipe(webpack({
      mode: 'production',
      performance: { hints: false },
      module: {
        rules: [
          {
            test: /\.(js)$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
              presets: ['@babel/env'],
              plugins: ['babel-plugin-root-import']
            }
          }
        ]
      }
    })).on('error', function handleError() {
      this.emit('end')
    })
    .pipe(rename({ basename: 'app', suffix: '.min' }))
    .pipe(dest('js', { sourcemaps: '.' }));
};

function taskServer(cb) {
  browsersync.init({
    ui: false,
    notify: false,
    server: {
      baseDir: '.',
    },
    //proxy: 'domain.local'
  });
  cb();
};

function browsersyncReload(cb) {
  browsersync.reload();
  cb();
};

function taskWatch() {
  watch('*.html', browsersyncReload);
  watch('scss/**/*.scss', series(taskScss, browsersyncReload));
  watch('js/**/app.js', series(taskJS, browsersyncReload));
};

exports.taskScss = taskScss;
exports.taskJS = taskJS;
exports.taskServer = taskServer;
exports.taskWatch = taskWatch;

exports.build = parallel(taskScss, taskJS);
exports.default = series(taskScss, taskJS, taskServer, taskWatch);