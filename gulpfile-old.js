var gulp = require ( "gulp"),
watch = require ("gulp-watch"),
postcss = require ("gulp-postcss"),
autoprefixer = require ("autoprefixer"),
cssvars = require ("postcss-simple-vars"),
nested = require ("postcss-nested"),
browserSync = require ("browser-sync").create (),
cssimport = require ("postcss-import");

gulp.task ('default', function () {
  console.log ('ok on avance');
});


gulp.task ('html', function () {
  console.log ('ok on avance encore');
});

gulp.task ('styles', function () {
  return gulp.src ('./app/assets/styles/styles.css')
  .pipe (postcss ([cssimport, autoprefixer, cssvars, nested]))
  .pipe (gulp.dest('./app/temp/styles'));
});

gulp.task ('watch', function () {
  console.log ('on watch');
 // watch open the browser and points to the webserveur
  browserSync.init({
    notify: true,
    server: {
      baseDir: "app"
    }
  });
  watch('./app/index.html', function() {
    browserSync.reload();
  });
  /*
  watch ('./app/index.html', function () {
    gulp.start ('html');
  });
  */
  watch ('./app/assets/styles/**/**.css', function () {
  /*  gulp.start ('styles');*/
  gulp.start ('cssInject');

  });
});

gulp.task('cssInject', ['styles'], function() {
  return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
});
