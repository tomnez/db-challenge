var gulp        = require('gulp')
  , concat      = require('gulp-concat')
  , stylus      = require('gulp-stylus')
  , watch       = require('gulp-watch')
  , spritesmith = require('gulp.spritesmith')
  , es          = require('event-stream')
  , temp        = require('temp').track()
  , utils       = require('./lib/utils')()
  , path        = require('path')
  , nib         = require('nib');

// STYLUS, SPRITES, NIB -------------------------------------------------- //
gulp.task('sprites', function() {
  utils.createImageArray('./assets/css/spritesrc/', function(err, imageArray) {

    if(err) { return console.error(err); }

    var imgDestPath  = './public/css'
      , stylDestPath = './assets/css';

    var spriteOptions = {
      'engine'      : 'gm', // use graphicsmagick
      'cssName'     : 'sprites.styl',
      'imgName'     : 'sprites.png',
      'algorithm'   : 'binary-tree',
      'cssTemplate' : path.join(__dirname, './templates/sprites.styl.mustache')
    };

    var spriteData = gulp.src(imageArray).pipe(spritesmith(spriteOptions))
      , images = spriteData.img.pipe(gulp.dest(imgDestPath))
      , stylus = spriteData.css.pipe(gulp.dest(stylDestPath));

    return es.merge(images, stylus);
  });
});

gulp.task('nib', ['sprites'], function () {
  gulp.src('./assets/css/main.styl')
    .pipe(stylus({
      errors: true,
      use: [nib()]
    }))
    .pipe(gulp.dest('./public/css'));
});

// CONCAT SCRIPTS -------------------------------------------------------- //
var scripts = [
  './assets/js/main.js',
];

// TODO: add minifier

gulp.task('concat', function() {
  return gulp.src(scripts)
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./public/js'));
});

// WATCH FILES ----------------------------------------------------------- //
gulp.task('watch', function() {
  gulp.watch('./assets/css/*.styl', ['nib']);
  gulp.watch('./assets/css/components/*.styl', ['nib']);
  gulp.watch(scripts, ['concat']);
});

// RUN TASKS ------------------------------------------------------------- //
gulp.task('default', ['sprites', 'nib', 'concat', 'watch']);
