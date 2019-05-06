"use strict";

let gulp = require('gulp'),
    scss = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    pug = require('gulp-pug'),
    plumber = require('gulp-plumber'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    browserSync = require('browser-sync').create();

// Browser-sync
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "build"
        }
    });
    gulp.watch('src/pug/*.pug', ['html']);
    gulp.watch('src/sass/*.scss', ['scss']);
    gulp.watch('src/js/*.js', ['js']);
    gulp.watch('src/img/*.*', ['img']);

});

// HTML
// gulp.task('html', function() {
//     gulp.src('src/*.html')
//     .pipe(gulp.dest('build'))
// });

// Чистка папки продакшена
gulp.task('clean', function (cb) {
  cleaner(build, cb);
});

//JADE
gulp.task('html', function() {
  gulp.src('src/pug/*.pug')
    .pipe(plumber())
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('build'));
});

// Сжатие javascript
gulp.task('js', function() {
  return gulp.src('src/js/*.js')
    .pipe(plumber())
    .pipe(uglyjs())
    .pipe(rename(function (path) {
      path.basename += ".min"
    }))
    .pipe(gulp.dest('build/js'));
});

// Сжатие изображений
gulp.task('img', function() {
  return gulp.src('src/img/*.*')
    .pipe(plumber())
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('build/img'));
});

// Fonts
gulp.task('fonts', function() {
  return gulp.src('src/fonts/Roboto/*.*')
    .pipe(gulp.dest('build/fonts'));
});

// SCSS
gulp.task('sass', function() {
    gulp.src('src/scss/*.scss')
        .pipe(scss().on('error', function(error) {
            console.log(error);
        }))
        .pipe(gulp.dest('build/css'));
});

gulp.task('default', function() {
	gulp.run('clean');
    gulp.run('html');
    gulp.run('img');
    gulp.run('sass');
    gulp.run('fonts');
    gulp.run('js');
    gulp.run('browser-sync');

    gulp.watch('./src/scss/**/*.scss', ['sass']);
    gulp.watch('build/*.html').on('change', browserSync.reload);
    gulp.watch('build/img/*.*').on('change', browserSync.reload);
    gulp.watch('build/js/*.js').on('change', browserSync.reload);
    gulp.watch('build/css/*.css').on('change', browserSync.reload);
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/scss/**/*.scss', ['sass']);
});