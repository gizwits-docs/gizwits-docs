var gulp = require('gulp')
var shell = require('shelljs')
var path = require('path')
var cssMinify = require('gulp-cssnano')
var jsMinify = require('gulp-uglify')

var publicDir = path.resolve(__dirname, 'public')

var cssDir = path.resolve(publicDir, 'css')
var cssFile = path.resolve(cssDir, 'documentation.css')
var jsDir = path.resolve(publicDir, 'js')
var jsFile = path.resolve(jsDir, 'documentation.js')


gulp.task('cpAssets', function() {
  shell.rm(path.resolve(publicDir, 'assets', '*'))
  shell.cp('-R', path.resolve(__dirname, 'assets'), publicDir)
})

gulp.task('cssMinify', function() {
  gulp.src(cssFile)
    .pipe(cssMinify())
    .pipe(gulp.dest(publicDir))
})

gulp.task('jsMinify', function() {
  gulp.src(jsFile)
    .pipe(jsMinify())
    .pipe(gulp.dest(publicDir))
})

gulp.task('moveFiles', function() {
  shell.mv(path.resolve(publicDir, 'documentation.css'), cssDir)
  shell.mv(path.resolve(publicDir, 'documentation.js'), jsDir)
})

gulp.task('modifyIndex', function() {
  var result = shell.cat(path.resolve(publicDir, 'index.html')).stdout
  var header = result.match(/<!DOCTYPE\shtml>[\S\s]+<\/head>/)
  console.log(header[0])
})

gulp.task('default', ['cpAssets', 'cssMinify', 'jsMinify'])