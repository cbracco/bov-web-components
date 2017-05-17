//
// DEPENDENCIES
//

import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import atImport from 'postcss-import'
import browserSync from 'browser-sync'
import cssnano from 'cssnano'
import cssnext from 'postcss-cssnext'
import del from 'del'
import removeRoot from 'postcss-remove-root'
import runSequence from 'run-sequence'

//
// CONFIGURATION
//

const plugins = gulpLoadPlugins()

const config = {
  source: 'source',
  sourceAssets: 'source/assets',
  sourceComponents: 'source/components',
  dest: 'dest'
}

//
// TASKS
//

// DEFAULT
gulp.task('default', ['serve'])

// SERVE
gulp.task('serve', ['build'], () => {
  // initialize browser-sync for .dev|docs/
  browserSync.init({
    server: {
      baseDir: config.dest,
      reloadOnRestart: true,
      open: false
    }
  })

  // watch for file changes and inject|reload
  gulp.watch(config.source + '/**/*.css', ['styles'])
  gulp.watch(['index.html', config.sourceComponents + '/**/*.{html,gif,png,jpg,jpeg,svg}'], ['copy:index', 'copy:components', browserSync.reload])
})

// BUILD
gulp.task('build', (callback) => {
  runSequence(
    'clean',
    [
      'copy:index',
      'copy:components',
      'copy:libs'
    ],
    'styles',
    callback
  )
})

// CLEAN
// Remove generated folders and files
gulp.task('clean', () => {
  return del.sync(config.dest)
})

// COPY:INDEX
gulp.task('copy:index', () => {
  return gulp.src([
    config.source + '/index.html'
  ])
    .pipe(gulp.dest(config.dest))
})

// COPY:COMPONENTS
gulp.task('copy:components', () => {
  return gulp.src([
    config.sourceComponents + '/**/*'
  ])
    .pipe(gulp.dest(config.dest + '/components'))
})

// COPY:LIBS
gulp.task('copy:libs', () => {
  return gulp.src([
    config.sourceAssets + '/scripts/libs/**/*'
  ])
    .pipe(gulp.dest(config.dest + '/assets/scripts/libs'))
})

// STYLES
gulp.task('styles', () => {
  // define postcss plugins
  const process = [
    atImport,
    cssnext({ browsers: ['last 2 versions'] }),
    removeRoot
  ]

  return gulp.src(config.sourceAssets + '/styles/main.css')
    .pipe(plugins.postcss(process))
    .pipe(gulp.dest(config.dest + '/assets/styles/'))
    .pipe(plugins.rename({ suffix: '.min' }))
    .pipe(plugins.postcss(cssnano))
    .pipe(gulp.dest(config.dest + '/assets/styles/'))
    .pipe(browserSync.reload({ stream: true }))
})

// DEPLOY
gulp.task('deploy', ['build'], () => {
  return gulp.src(config.dest + '/**/*')
    .pipe(plugins.ghPages())
})
