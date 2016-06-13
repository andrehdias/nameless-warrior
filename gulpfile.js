var gulp        = require('gulp'),
    browserSync = require('browser-sync').create(),
    compass     = require('gulp-compass'),
    concat      = require('gulp-concat'),
    rename      = require('gulp-rename'),
    uglify      = require('gulp-uglify');
    siteJS = 'src/js/',
    gameJS = 'src/game/js/',
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


gulp.task('scripts:site', function() {
  var files = [
                siteJS+'lib/boxes.js', 
                siteJS+'lib/forms.js', 
                siteJS+'app.js'
              ];

  return gulp.src(files)
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(siteJS))
    .pipe(rename('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(siteJS));
});

gulp.task('scripts:game', function() {
  return gulp.src(gameJSFiles)
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(gameJS))
    .pipe(rename('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(gameJS));
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