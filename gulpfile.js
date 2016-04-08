var gulp = require('gulp');
var del = require('del');
var webpack = require('webpack-stream');
var webpackConfig = require('./webpack.config.js');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var image = require('gulp-image');
/**
 * Build (Webpack)
 */

gulp.task('clean:build', function() {
    del('./public/js/*')
})

gulp.task('build', ['clean:build', 'sass'], function() {
  return gulp.src('./app/app.js')
    .pipe(webpack(webpackConfig))
    .on('error', function handleError() {
      this.emit('end'); // Recover from errors
    })
    .pipe(gulp.dest('./'));
});

gulp.task('image', function () {
  gulp.src('app/assets/images/*')
    .pipe(image())
    .pipe(gulp.dest('./public/images'));
});

gulp.task('watch:build', function() {
  return gulp.watch('./app/**/*', ['build']);
});

gulp.task('fonts', function() {
    gulp.src('./app/assets/fonts/**/*')
    .pipe(gulp.dest('./public/fonts'));

});

/**
 * Node Server (Express)
 */

gulp.task('serve:node', function(done) {
  nodemon({
    exec: './node_modules/.bin/babel-node ./server.js',
    watch: ['server.js'],
    ext: 'js html'
  });
});

gulp.task('sass', function(){
  return gulp.src('app/scss/styles.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('./public/css'))
});

/**
 * Main tasks
 */

gulp.task('serve', ['serve:node']);
gulp.task('watch', ['serve', 'sass', 'image', 'fonts', 'build', 'watch:build']);
gulp.task('default', ['serve', 'sass']);
