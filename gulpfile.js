var gulp        = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass     = require('gulp-sass'),
    concat      = require('gulp-concat'),
    rename      = require('gulp-rename'),
    uglify      = require('gulp-uglify');

//URLs
var siteJS = 'src/site/js/',
    siteJSDest = 'app/js/',
    gameJS = 'src/game/js/',
    gameJSDest = 'app/game/js/',
    siteSASS = 'src/site/sass/',
    siteJSFiles = siteJS+'**/*.js',
    gameJSFiles = gameJS+'**/*.js',
    siteSASSFiles = siteSASS+'**/*.scss';

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {
  //Apache as proxy
  browserSync.init({
    server: {
      baseDir: './app/'
    }
  });

  gulp.watch(siteSASSFiles, ['sass']);
  gulp.watch(siteJSFiles, ['scripts:site']);
  gulp.watch(gameJSFiles, ['scripts:game']);
  gulp.watch(["app/*.html", "app/js/**/*.js", "app/game/js/**/*.js"]).on('change', browserSync.reload);
});

//Generate scripts file for the site
gulp.task('scripts:site', function() {
  return gulp.src([
                siteJS+'zepto.js', 
                siteJS+'lib/utils.js', 
                siteJS+'lib/boxes.js', 
                siteJS+'lib/home.js', 
                siteJS+'app.js'
              ])
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(siteJSDest))
    .pipe(rename('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(siteJSDest));
});

//Generate scripts file for the game
gulp.task('scripts:game', function() {
  return gulp.src([                
                gameJS+'lib/*.js', 
                gameJS+'states/*.js', 
                gameJS+'main.js'
              ])
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(gameJSDest))
    .pipe(rename('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(gameJSDest));
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src(siteSASSFiles)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.stream());
});

gulp.task('default', ['scripts:site', 'scripts:game', 'serve']);