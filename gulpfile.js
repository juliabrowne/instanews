var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  browserSync = require('browser-sync'),
  eslint = require('gulp-eslint'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  cssnano = require('gulp-cssnano'),
  rename = require('gulp-rename'),
  prettyError = require('gulp-prettyerror');

//SASS TASKS
gulp.task('sass', function() {
  return gulp
    .src('./sass/style.scss')
    .pipe(prettyError())
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions']
      })
    )
    .pipe(gulp.dest('./build/css'))
    .pipe(cssnano())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./build/css'));
});

//LINTING TASKS
gulp.task('lint', function () {
  return (gulp
    .src('./js/*.js') // attaches lint to file
    .pipe(eslint())
    .pipe(eslint.format())   // outputs the lint results to the console.
    .pipe(eslint.failAfterError())
  );
});

//SCRIPTS
//has one dependency on Lint Task
//lints -> uglifies/minifies
gulp.task('scripts', gulp.series('lint', function() {
  return gulp
    .src('./js/*.js') // these are the files gulp will consume
    .pipe(uglify()) // call uglify function on these files
    .pipe(rename({
      extname: '.min.js'
    })) // this keeps the first part                                     
     // and changes just the                                           
     // extension name at the end                                      
     // after the period
    .pipe(gulp.dest('./build/js'));
})
);

//BROWSERSYNC
//making a browsersync task
//reading a local server to run the refresh
//watches build folder (and html) and reloads
gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch(['build/**/*', '*.html'])
    .on('change', browserSync.reload);
});

//WATCH
//watch function watches JS so it can run scripts
gulp.task('watch', function () {
  gulp.watch('js/*.js', gulp.series('scripts'));
  gulp.watch('sass/**/*.scss', gulp.series('sass'));
});

//DEFAULT
//runs browsersync and watches
//don't need lint because lint already runs on scripts
gulp.task('default', gulp.parallel('browser-sync', 'watch'));