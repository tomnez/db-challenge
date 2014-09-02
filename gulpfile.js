var gulp   = require('gulp')
  , concat = require('gulp-concat')
  , stylus = require('gulp-stylus')
  , watch  = require('gulp-watch')
  , nib    = require('nib');

// STYLUS + NIB ---------------------------------------------------------- //
gulp.task('nib', function () {
  gulp.src('./assets/css/main.styl')
    .pipe(stylus({use: [nib()]}))
    .pipe(gulp.dest('./public/css'));
});

// CONCAT SCRIPTS -------------------------------------------------------- //
var scripts = [
  './assets/js/main.js',
];

gulp.task('concat', function() {
  return gulp.src(scripts)
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./public/js'));
});

// WATCH FILES ----------------------------------------------------------- //
gulp.task('watch', function() {
  gulp.watch('./assets/css/*.styl', ['nib']);
  gulp.watch(scripts, ['concat']);
});

// RUN TASKS ------------------------------------------------------------- //
gulp.task('default', ['nib', 'concat', 'watch']);
