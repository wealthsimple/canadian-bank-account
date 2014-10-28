gulp = require('gulp')
gutil = require('gulp-util')
notify = require("gulp-notify")
browserify = require('browserify')
source = require('vinyl-source-stream')

handleErrors = (errors...) ->
  notify.onError({
    title: "Compile Error",
    message: "<%= error.message %>"
  }).apply(@, errors)
  @emit('end')

gulp.task 'browserify', ->
  bundler = browserify({
    entries: ['./src/index.coffee']
    extensions: ['.coffee']
    debug: false # Disable source maps
  })
  gutil.log('Running', gutil.colors.green("'bundle'") + '...')
  bundler
    .bundle()
    .on('error', handleErrors)
    .pipe(source('canadian-bank-account.js'))
    .pipe(gulp.dest('.'))
    .on 'end', ->
      gutil.log('Finished', gutil.colors.green("'bundle'"))

gulp.task 'watch', ->
  gulp.watch('src/**/*.coffee', ['browserify'])

gulp.task('default', ['browserify', 'watch'])
