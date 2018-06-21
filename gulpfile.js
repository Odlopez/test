"use strict";

var gulp = require("gulp"); //сам gulp
var less = require("gulp-less"); //конвертор из less в css
var plumber = require("gulp-plumber"); //выводит в консоль сообщения об ошибке и не дает npm-ке прекратить работу из-за ошибки
var postcss = require("gulp-postcss"); //нужен для автопрефиксера
var autoprefixer = require("autoprefixer"); //сам автопрефиксер
var server = require("browser-sync").create(); //создает виртуальный сервер, перегружает браузер
var run = require('run-sequence'); //нужен для запуска пачки тасков последовательно.
var rename = require("gulp-rename"); //переименовывает файлы
var del = require('del'); //удаляет файлы и папки
var csso = require('gulp-csso'); //минимизирует css
var htmlmin = require('gulp-htmlmin'); //минизирует html
var uglify = require('gulp-uglify'); //минизирует js
var pump = require('pump'); //нужен для работы gulp-uglify

gulp.task("style", function() {
  gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("serve", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", ["style"]);
  gulp.watch("source/js/**/*.js", ["copy"]).on("change", server.reload);
  gulp.watch("source/*.html", ["html"]).on("change", server.reload);
});

gulp.task("copy", function () {
  return gulp.src([
      "source/fonts/**/*.{woff,woff2,ttf}",
      "source/img/**",
      "source/js/**",
      "source/video/**",
      "source/*.html"
    ], {
      base: "source" //эта настройка говорит gulp'у от какой папки отталкиваться, то есть не только скопировать изображения в папке img, но и саму папку тоже.
    })
  .pipe(gulp.dest("build"));
})

gulp.task("html", function (done) {
  run(
    "html-del",
    "html-copy",
    done
  );
});

gulp.task("html-copy", function () {
  return gulp.src([
    "source/*.html"
  ], {
    base: "source"
  })
.pipe(gulp.dest("build"));
});

gulp.task("html-del", function () {
  return del("build/*.html");
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task('minify', function () {
  return gulp.src('build/css/style.css')
      .pipe(csso())
      .pipe(gulp.dest('build/css'));
});

gulp.task('htmlmin', function() {
  return gulp.src("build/*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("build"));
});

gulp.task("compress", function (cb) {
  pump([
      gulp.src("build/js/*.js"),
      uglify(),
      gulp.dest("build/js")
    ],
    cb
  );
});

gulp.task("build", function (done) {
  run(
    "clean",
    "copy",
    "style",
    "htmlmin",
    "compress",
    done
  );
});
