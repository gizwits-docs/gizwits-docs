var gulp = require('gulp')
var shell = require('shelljs')
var path = require('path')
var cssMinify = require('gulp-cssnano')
var jsMinify = require('gulp-uglify')
var md5 = require('md5')
var fs = require('fs')
var sass = require('node-sass')
var os = require('os')

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
  var indexFile = path.resolve(publicDir, 'index.html')
  var html = shell.cat(indexFile).stdout
  var header = html.match(/<!DOCTYPE\shtml>[\S\s]+<\/head>/)[0]
  var body = html.match(/<body>[\S\s]+class="body"/)[0]
  body = body.slice(0, body.length - 17)

  var scripts = html.match(/<script[\S\s]+<\/html>/)[0]
  var newHtml = header + body + scripts
  shell.rm(indexFile)
  shell.touch(indexFile)
  // shell.echo(newHtml).to(indexFile)
  fs.writeFileSync(indexFile, newHtml)
})

gulp.task('genHash', function() {
  sass.render({
    file: path.resolve(__dirname, 'themes/documentation/source/css/documentation.scss')
  }, function(err, result) {
    var cssHash = md5(result.css)
    var jsHash = md5(fs.readFileSync(path.resolve(__dirname, 'themes/documentation/source/js/documentation.js')))
    var content = `css: ${cssHash}${os.EOL}js: ${jsHash}`
    shell.echo(content).to(path.resolve(__dirname, 'source/_data/fileHash.yml'))
  })
})

gulp.task('resetHash', function() {
  shell.echo(`css: 0${os.EOL}js: 0`).to(path.resolve(__dirname, 'source/_data/fileHash.yml'))
})

gulp.task('rmPublic', function() {
  shell.rm('-rf', path.resolve(__dirname, 'public'))
})

gulp.task('default', ['cpAssets', 'cssMinify'])