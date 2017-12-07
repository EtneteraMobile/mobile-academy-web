/*!
 * gulp
 * $ npm install browser-sync gulp-ruby-sass gulp-autoprefixer gulp-cssnano gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 */

var pkg = require('./package.json');

var gulp = require('gulp'),
  minifyCss = require('gulp-minify-css');
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync').create(),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify');
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');


gulp.task('styles', function() {
  return sass('src/scss/style.scss', { style: 'expanded' })
    .on('error', function (err) {
      console.error('Error!', err.message);
    })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('dist/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});


var script_paths = [
    'node_modules/jquery/dist/jquery.js',
    'node_modules/flickity/dist/flickity.pkgd.js',
    'src/js/**/*.js'
  ];


gulp.task('scripts', function() {
  return gulp.src(script_paths)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});


gulp.task('images', function() {
  return gulp.src('src/img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/img'))
    .pipe(notify({ message: 'Images task complete' }));
});


// Static server
gulp.task('serve', ['watch'], function() {
    browserSync.init({
        proxy: pkg.name + '.lc',
        open: 'external'
    });
});


gulp.task('clean', function() {
    return del(['dist/css', 'dist/js', 'dist/assets/img', '../Firebase/public'], {force: true});
});

gulp.task('build', function() {
  return gulp.src(['dist/**/*', 'fonts/**/*', '*.{html,png,css}'], {base:"."})
  .pipe(gulp.dest('../Firebase/public/preview'))
  .pipe(notify({ message: 'Build task complete' }));
});

gulp.task('default', ['clean'], function() {
  gulp.series('styles', 'scripts', 'images');
});

// Watch task
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('src/scss/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('src/js/**/*.js', ['scripts']);

  // Watch image files
  gulp.watch('src/img/**/*', ['images']);

  // Watch php files
  gulp.watch('*.php').on('change', browserSync.reload);

  // Create LiveReload server
  livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', livereload.changed);


});
