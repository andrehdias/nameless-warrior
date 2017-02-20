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
    path        = require('path'),
    buffer      = require('gulp-buffer'),
    source      = require('vinyl-source-stream'),
    buffer      = require('gulp-buffer'),
    exorcist    = require('exorcist'),
    babelify    = require('babelify'),
    browserify  = require('browserify'),
    config      = require('./nwarrior.json'); //JSON with directories configuration


// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {
  browserSync.init({
    server: {
      baseDir: config.dirs.baseDir
    },
    notify: {
      styles: {
          top: 'auto',
          bottom: '10px',
          right: '10px'
      }
    },
    open: false
  });

  gulp.watch(config.dirs.SASSFiles, ['sass']);
  gulp.watch(config.dirs.JSFiles, ['scripts']);
  gulp.watch(["app/**/*.html", "app/js/**/*.js"]).on('change', browserSync.reload);
});


//Generate scripts file for the site
gulp.task('scripts', function() {
  return browserify({
            paths: [config.dirs.JS],
            entries: path.join(config.dirs.JS, 'index.js'),
            debug: true,
            transform: [
                [
                    babelify, {
                        presets: ["es2015"]
                    }
                ]
            ]
          })
          .transform(babelify)
          .bundle().on('error', function(error) {
            console.log(error.message);
            this.emit('end');
          })
          .pipe(exorcist(path.join(config.dirs.JSDest, 'scripts.js.map')))
          .pipe(source('scripts.js'))
          .pipe(buffer())
          .pipe(uglify())
          .pipe(gulp.dest(config.dirs.JSDest));
});


// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src(path.join(config.dirs.SASS, 'styles.scss'))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest(config.dirs.CSSDest))
    .pipe(browserSync.stream());
});

gulp.task('default', ['scripts', 'serve']);
