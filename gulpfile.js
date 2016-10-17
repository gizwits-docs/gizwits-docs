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
  var resources = path.resolve(__dirname, 'assets')
  shell.cp('-R', resources, publicDir)
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

gulp.task('default', ['cpAssets', 'cssMinify', 'jsMinify'])