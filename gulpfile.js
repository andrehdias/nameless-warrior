var gulp        = require('gulp'),
    browserSync = require('browser-sync').create(),
    compass     = require('gulp-compass'),
    concat      = require('gulp-concat'),
    rename      = require('gulp-rename'),
    uglify      = require('gulp-uglify');

//URLs
var siteJS = 'src/js/',
    siteJSDest = 'app/js/',
    gameJS = 'src/js/game/',
    gameJSDest = 'app/game/js/',    
    siteSASS = 'src/sass/',
    siteJSFiles = siteJS+'**/*.js',
    gameJSFiles = gameJS+'**/*.js',
    siteSASSFiles = siteSASS+'**/*.scss';

// Static Server + watching scss/html files
gulp.task('serve', ['compass'], function() {
  //Apache as proxy
  browserSync.init({
    proxy: "http://localhost/nameless-warrior/app/"
  });

  gulp.watch(siteSASSFiles, ['compass']);
  gulp.watch(siteJSFiles, ['scripts:site']);
  gulp.watch(gameJSFiles, ['scripts:game']);
  gulp.watch(["app/*.html", "app/js/**/*.js", "app/game/**/*.js"]).on('change', browserSync.reload);
});

//Generate scripts file for the site
gulp.task('scripts:site', function() {
  return gulp.src([
                siteJS+'lib/boxes.js', 
                siteJS+'lib/forms.js', 
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
                gameJS+'phaser.min.js',
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

// Compile compass into CSS & auto-inject into browsers
gulp.task('compass', function() {
  return gulp.src(siteSASSFiles)
    .pipe(compass({    
      sass: siteSASS,
      css: 'app/css',
      require: ['susy']
    }))
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.stream());
});

gulp.task('default', ['scripts:site', 'scripts:game', 'serve']);