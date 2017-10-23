const gulp     = require('gulp')
, inline       = require('gulp-inline')
, minifyJS     = require('gulp-minify')
, minifyCSS    = require('gulp-minify-css')
, autoprefixer = require('gulp-autoprefixer')
, runSequence  = require('run-sequence');

gulp.task('inline', () => {
  return gulp.src('./frontend/index.html')
  .pipe(inline({
    base: './frontend',
    js: minifyJS,
    css: [minifyCSS, autoprefixer({ browsers:['last 2 versions'] })]
  }))
  .pipe(gulp.dest('./frontend/build/'));
});
  
gulp.task('copyOthers', () => {
  return gulp.src(['./frontend/*.*', '!./frontend/index.html', '!./frontend/styles.css', '!./frontend/functions.js', '!./frontend/main.js'])
    .pipe(gulp.dest('./frontend/build/'));
});

gulp.task('default', () => {
  runSequence('inline', 'copyOthers', () => {
    console.log('\nPRODUCTION BUILD IS READY.\n');
  });
});