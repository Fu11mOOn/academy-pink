"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var cssmin = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var jsmin = require("gulp-jsmin");
var htmlmin = require("gulp-htmlmin");
var del = require("del");
var run = require("gulp-run-sequence");

gulp.task("style", function() {
  gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("source/css"))
    .pipe(cssmin())
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
  gulp.watch("source/*.html", ["html"]).on("change", server.reload);
  gulp.watch("source/js/*.js", ["jsmin"]).on("change", server.reload);
  gulp.watch("source/img/*.svg", ["images"]).on("change", server.reload);
  gulp.watch("source/img/*.{png,jpg}", ["images", "webp"]).on("change", server.reload);
});

gulp.task("images", function() {
  return gulp.src("source/img/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("webp", function() {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"));
});

gulp.task("svgstore", function() {
  return gulp.src("source/img/sprite/*.svg")
    .pipe(svgstore({inlineSvg: true}))
    .pipe(rename("sprite-lib.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("html", function() {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("build"));
});

gulp.task("jsmin", function() {
  return gulp.src("source/js/*.js")
    .pipe(jsmin())
    .pipe(gulp.dest("build/js"));
});

gulp.task("clean", function() {
  return del("build");
})

gulp.task("copy", function() {
  return gulp.src([
      "source/fonts/**/*.{woff,woff2}",
      "source/preview/*.{jpg,css,js}"
    ], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
});

gulp.task("build", function() {
  run (
    "clean",
    "copy",
    "svgstore",
    "images",
    "webp",
    "style",
    "html",
    "jsmin"
  );
});
