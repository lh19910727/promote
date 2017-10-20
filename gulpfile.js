var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('build', shell.task([
  'npm run build',
  'cp -af dist/static/promote/* /Users/chenzaining/Desktop/wkspace/SVN/20170927/src/main/resources/static/promote',
  'cp -af dist/static/*.* /Users/chenzaining/Desktop/wkspace/SVN/20170927/src/main/resources/templates/promote',
  'echo done'
    ]))
