var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
// var autoprefixer = require('gulp-autoprefixer');
// var uglify = require('gulp-uglify');
// var saas = require('gulp-saas');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');

gulp.task('css', function () {
    return gulp.src('./public/styles/*.css')
        .pipe(concat('all.css'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('nodemon', () => {
    nodemon({
        script: 'app.js',
        ext: 'js html',
        env: { 'NODE_ENV' : 'development' }
    });
});

gulp.task('browser-sync', ['nodemon'], () => {
    browserSync.init({
        proxy: 'http://localhost:3000',
        port: 8001
    });
});

gulp.task('bs-reload', () => {
    browserSync.reload();
});

gulp.task('serve', ['browser-sync'], () => {
    gulp.watch('public/styles/*.css', ['bs-reload']);
    gulp.watch('views/*.pug', ['bs-reload']);
});