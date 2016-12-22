var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var envify = require('envify'); // used to make production version
var collapse = require('bundle-collapser/plugin');
var babelify = require('babelify'); // transpiling ES6
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');

var Config = {
	debug: false,
	fullPaths: false,
	ENV: 'production'
};

gulp.task('default', function() {
  var bundler = watchify(browserify({
    entries: ['./src/app.jsx'],
    //transform: [reactify],
	//transform: [['babelify', {presets: ['es2015', 'react']}]],
	//transform: [[reactify], ['envify', {'global': true, '_': 'purge', NODE_ENV: 'production'}]], 
	transform: [['babelify', {presets: ['es2015', 'react']}], ['envify', {'global': true, '_': 'purge', NODE_ENV: 'production'}]],
    extensions: ['.jsx'],
    debug: Config.debug,
    cache: {},
    packageCache: {},
    fullPaths: Config.fullPaths
  }));

function cssStuff(){
  return gulp.src(['./src/css/bootstrap.min.css', './src/css/main.css'])
	.pipe(concat('main.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('css'));
}

function build(file) {
	cssStuff();
    if (file) gutil.log('Recompiling ' + file);
    return bundler
	  .plugin(collapse)// convert bundle paths to IDs to save bytes in browserify bundles
      .bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('main.js'))
      .pipe(buffer()) // <----- convert from streaming to buffered vinyl file object
      .pipe(uglify()) // now gulp-uglify works
      .pipe(gulp.dest('./'));
  }
  
  build();
  
  bundler.on('update', build);
});
