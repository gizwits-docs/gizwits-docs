var gulp = require('gulp')
var shell = require('shelljs')
var path = require('path')

gulp.task('cpAssets', function() {
  var resources = path.resolve(__dirname, 'assets')
  var dest = path.resolve(__dirname, 'public')
  shell.cp('-R', resources, dest)
})

gulp.task('default', ['cpAssets'])