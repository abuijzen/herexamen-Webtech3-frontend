const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

//scss compilen naar css
function style(){
    //locatie scss, alle bestanden die eindigen op scss nemen
    return gulp.src('./scss/**/*.scss')
    //doorgeven naar sass compiler
    .pipe(sass())
    //de map waarin je de gecompilede css wilt opslaan
    .pipe(gulp.dest('./css'))

    //browsersync
    .pipe(browserSync.stream());
}

//automatisch watchen voor wijzigingen
function watch(){
  browserSync.init({
    //launch server
    server:{
      //base directory
      baseDir: './'
    }
  });
  //veranderingen watchen in elke scss file
  //en de functie style oproepen voor compiling
  gulp.watch('./scss/**/*.scss',style);

  //html en js watchen
  //all html en js files in dezelfde map
  //browser refreshen als er veranderingen zijn
  gulp.watch('./*.html').on('change',browserSync.reload);
  gulp.watch('./js/**/*.js').on('change',browserSync.reload);
}
  
  exports.style = style;
  exports.watch = watch;