var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var uglify= require('gulp-uglify');
var sass= require('gulp-sass');
var concat= require('gulp-concat');

gulp.task('message', function() {
return console.log('Gulp is running ...');
});

//Copy all HTML Files
gulp.task('copyHtml',function(){
  gulp.src('src/*.html')
  .pipe(gulp.dest('dist')); //Destination
});

//Optimize Images

gulp.task('imageMin', function(){
  gulp.src('src/images/*')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/images'));
});


//Minify JS
gulp.task('minify', function(){
  gulp.src('src/js/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('dist/js'));
});

//Compile sass
gulp.task('sass', function(){
  gulp.src('src/sass/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('dist/css'));
});

// Scripts

gulp.task('scripts', function(){
  gulp.src('src/js/*.js')
  .pipe(concat('main.js'))
  .pipe(uglify())
  .pipe(gulp.dest('dist/js'));
});

//One task
gulp.task('default', ['message', 'copyHtml', 'imageMin','sass','scripts']);

gulp.task('watch', function(){
  gulp.watch('src/js/*.js',['scripts']);
  gulp.watch('src/images/*',['imageMin']);
  gulp.watch('src/sass/*.scss',['sass']);
  gulp.watch('src/*.html',['copyHtml']);
});