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
}
  exports.style = style;