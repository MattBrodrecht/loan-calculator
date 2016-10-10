"use strict";

const gulp = require('gulp');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const runSequence = require('run-sequence');
const del = require('del');
const environments = require('gulp-environments');


const appPath = './app';
const buildPath = './public';
const development = environments.development;
const production = environments.production;


gulp.task('clean', () => {
    return del([`${buildPath}/js`, `${buildPath}/css`]);
});

gulp.task(`browserSync`, () => {
    return browserSync.init({
        server: {
            baseDir: './public'
        }
    });
});

gulp.task(`bs-reload`, () => {
    browserSync.reload();
});

gulp.task(`js`, () => {
    let path = `${buildPath}/js`;

    let options = {
        entries: `${appPath}/js/App.js`,
        debug: true
    };

    return browserify(options)
        .transform('babelify', {presets: [`es2015`, `react`]})
        .bundle()
        .on('error', function (err) {
            console.error(`Browserify error: ${err}`);
            this.emit('end');
        })
        .pipe(source('bundle.js'))
        .pipe(production(buffer()))
        .pipe(production(uglify()))
        .pipe(gulp.dest(path))
        .pipe(development(browserSync.reload({
            stream: true
        })));
});

gulp.task(`sass`, () => {
    let dest = `${buildPath}/css`;

    return gulp.src(`${appPath}/scss/*.scss`)
        .pipe(development(sourcemaps.init()))
        .pipe(sass({outputStyle: `compressed`}))
        .pipe(autoprefixer())
        .pipe(development(sourcemaps.write()))
        .pipe(gulp.dest(dest))
        .pipe(development(browserSync.reload({
            stream: true
        })));
});

gulp.task(`watch`, () => {
    gulp.watch([`${appPath}/js/**/*.js`], [`build`]);
    gulp.watch([`${appPath}/scss/**/*.scss`], [`sass`]);
    gulp.watch([`${buildPath}/index.html`], [`bs-reload`]);
});

gulp.task(`build`, (callback) => {
    runSequence('clean', ['js','sass'], callback);
});

gulp.task(`deploy`, () => {
  environments.current(production);
  runSequence(`build`);
});

gulp.task(`default`, () => {
  environments.current(development);
  runSequence(`build`, [`browserSync`], `watch`);
});
