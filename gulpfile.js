var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    runSequence = require('run-sequence');
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var stylus = require('gulp-stylus');
var browserSync = require('browser-sync');
gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: "./public"
        }
    });
});
gulp.task('copy-html', function (cb) {
    return gulp.src("src/**/*.html").pipe(gulp.dest('public'));
});
gulp.task('bs-reload', ['copy-html'], function () {
    browserSync.reload();
});
gulp.task('styles', function () {
    // gulp.src(['src/css/**/*.styl']).pipe(plumber({
    //     errorHandler: function (error) {
    //         console.log(error.message);
    //         this.emit('end');
    //     }
    // })).pipe(stylus()).pipe(autoprefixer('last 2 versions')).pipe(gulp.dest('public/css/')).pipe(rename({
    //     suffix: '.min'
    // })).pipe(minifycss()).pipe(gulp.dest('public/css/')).pipe(browserSync.reload({
    //     stream: true
    // }))
});
gulp.task('scripts', function (cb) {
    return gulp.src(['layout', 'site-design'].map(function (name) {
        return 'src/js/' + name + '.js';
    })).pipe(plumber({
        errorHandler: function (error) {
            console.log(error.message);
            this.emit('end');
        }
    })).pipe(jshint()).pipe(jshint.reporter('default')).pipe(concat('main.js')).pipe(babel()).pipe(gulp.dest('public/assets/js/')).pipe(rename({
        suffix: '.min'
    })).pipe(uglify()).pipe(gulp.dest('public/assets/js/')).pipe(browserSync.reload({
        stream: true
    }));
});
gulp.task('default', function (cb) {
    runSequence(['build'], ['browser-sync'], function () {
        gulp.watch("src/css/**/*.scss", ['styles']);
        gulp.watch("src/js/**/*.js", ['scripts']);
        gulp.watch("src/**/*.html", ['bs-reload']);
        cb();
    });
});
gulp.task('build', ['styles', 'scripts'], function () {
    return runSequence(['styles', 'scripts', 'copy-html']);
});