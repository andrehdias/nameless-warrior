/**
* Project Gulpfile with Gulp tasks to generate JS, CSS and static server for development
*
**/

var gulp        = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass        = require('gulp-sass'),
    concat      = require('gulp-concat'),
    rename      = require('gulp-rename'),
    uglify      = require('gulp-uglify'),
    config      = require('./nwarrior.json'); //JSON with directories configuration


// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {
  browserSync.init({
    server: {
      baseDir: config.dirs.baseDir
    },
    open: false
  });

  gulp.watch(config.dirs.siteSASSFiles, ['sass']);
  gulp.watch(config.dirs.siteJSFiles, ['scripts:site']);
  gulp.watch(config.dirs.gameJSFiles, ['scripts:game']);
  gulp.watch(["app/*.html", "app/js/**/*.js"]).on('change', browserSync.reload);
});


//Generate scripts file for the site
gulp.task('scripts:site', function() {
  return gulp.src([
                config.dirs.siteJS+'zepto.js',
                config.dirs.siteJS+'lib/*.js'
              ])
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(config.dirs.siteJSDest));
});


//Generate scripts file for the game
gulp.task('scripts:game', function() {
  return gulp.src([
                config.dirs.gameJS+'lib/*.js',
                config.dirs.gameJS+'states/*.js',
                config.dirs.gameJS+'main.js'
              ])
    .pipe(concat('gameScripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(config.dirs.gameJSDest));
});


// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src(config.dirs.siteSASSFiles)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.stream());
});

gulp.task('default', ['scripts:site', 'scripts:game', 'serve']);
