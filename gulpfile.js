const gulp = require('gulp');
const shell = require('gulp-shell');
const SVN_PROJECT_PATH = '/Users/chenzaining/Desktop/workspace/20170927';
const DELETE_PATH = '/Users/chenzaining/Desktop/workspace/20170927/src/main/resources/static/promote/wheel';
const STATIC_PATH = '/Users/chenzaining/Desktop/workspace/20170927/src/main/resources/static/promote';
const TEMPLATE_PATH = '/Users/chenzaining/Desktop/workspace/20170927/src/main/resources/templates/promote/wheel';


gulp.task('build', shell.task([
  'npm run build',
  `svn delete ${DELETE_PATH}`,
  'echo delete old done',
  `cp -af dist/static/promote/* ${STATIC_PATH}`,
  `cp -af dist/*.* ${TEMPLATE_PATH}`,
  `cd ${SVN_PROJECT_PATH} && svn add . --force`,
  'echo done'
]))
