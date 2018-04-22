/*
* All Tasks:
* -SASS -> CSS
* -JS minify
* -CSS minify
* -Images minify
* -Autoprefixer
* -Copy font/HTML/SASS files over to dist folder
*
* BroswerSync / Watch Task:
* -SASS -> CSS
* -JS minify
* -CSS minify
* -HTML changes
*
*/

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

// SASS -> CSS -> CSS minify
gulp.task('sass', function(){
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass()) // Convert sass to CSS!!
    .on('error', function(err) {
      console.log(err.message);
      this.emit('end') // Prevents 'gulp watch' from suddenly stopping
    })
    .pipe(gulp.dest('app/css'));
});

// JS minify
gulp.task('js-minify', function(){
  return gulp.src('app/js/**/*.js')
    .pipe(uglify())
    .on('error', function(err) {
      console.log(err.message);
      this.emit('end') // Prevents 'gulp watch' from suddenly stopping
    })
    .pipe(gulp.dest('dist/js'))
});

// CSS minify
gulp.task('css-minify', function(){
	return gulp.src('app/css/**/*.css')
		.pipe(cssnano())
		.pipe(gulp.dest('app/css'));
});

// Images minify
gulp.task('images-minify', function(){
  return gulp.src('app/images/**/*.+(png|gif|svg)')
	  .pipe(imagemin())
	  .pipe(gulp.dest('dist/images'))
});

// autoprefixer
gulp.task('autoprefixer', () =>
    gulp.src('app/css/**/*.css')
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(gulp.dest('dist/css'))
);

// Copy font files over to dist folder
gulp.task('fonts-copy', function() {
    return gulp.src(['app/fonts/**/*'])
			.pipe(gulp.dest('dist/fonts/'));
});

// Copy HTML over to dist folder
gulp.task('html-copy', function () {
	gulp.src('app/**/*.html')
		.pipe(gulp.dest('dist'));
});

// Copy SASS over to dist folder
gulp.task('sass-copy', function () {
	gulp.src('app/**/*.scss')
		.pipe(gulp.dest('dist'));
});

// Task for Delivering Finalized Files
gulp.task('release-time', [
	'sass',
	'autoprefixer',
	'css-minify',
	'js-minify',
	'images-minify',
	'html-copy',
	'sass-copy',
	'fonts-copy'
]);

// BroswerSync with HTML + Stylesheets + Javascript
gulp.task('browsersync', ['sass'], function() {
  browserSync.init({
      server: "./app"
  });

  gulp.watch("app/scss/**/*.scss", ['sass'])
  	.on('change', browserSync.reload);
  gulp.watch("app/css/**/*.css", ['css-minify'])
  	.on('change', browserSync.reload);
  gulp.watch("app/**/*.html")
  	.on('change', browserSync.reload);
  gulp.watch('app/js/**/*.js')
  	.on('change', browserSync.reload);
});

// Watcher
gulp.task('watch', function(){
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/css/**/*.css', ['css-minify']);
});


