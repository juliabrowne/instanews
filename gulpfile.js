
// Modules you need!
var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  browserSync = require('browser-sync').create(),
  eslint = require("gulp-eslint");


// Linting tasks
gulp.task("lint", function () {
  return (gulp
    .src("./js-folder/*.js") // attaches lint to file
    .pipe(eslint())
    .pipe(eslint.format())     // outputs the lint results to the console.
    .pipe(eslint.failAfterError())
  );
});


// SCRIPTS
// has one dependency on Lint Task
// lints -> uglifies/minifies
gulp.task("scripts", gulp.series("lint", function() {
  return gulp
    .src("./js-folder/*.js") // these are the files gulp will consume
    .pipe(uglify()) // call uglify function on these files
    .pipe(rename({
      extname: ".min.js"
    })) // this keeps the first part                                     
     // and changes just the                                           
     // extension name at the end                                      
     // after the period
    .pipe(gulp.dest("./build/js-folder"));
})
);

// BROWSERSYNC
// making a browsersync task
// reading a local server to run the refresh
// watches build folder (and html) and reloads
gulp.task("browser-sync", function () {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch(["build/js-folder/*.js", "*.html"])
    .on("change", browserSync.reload);
});

// watch function watches JS so it can run scripts
gulp.task("watch", function () {
  gulp.watch("js-folder/*.js", gulp.series("scripts"))
});

// default: runs browsersync and watches
// don't need lint because lint already runs on scripts
gulp.task("default", gulp.parallel("browser-sync", "watch"));



