var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var less = require('gulp-less');
var path = require('path');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglifyjs');
var templateCache = require('gulp-angular-templatecache');
var concat = require('gulp-concat');
 
gulp.task('uglify', function() {
  return gulp.src('./build/*.js')
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('./dist'))
});

gulp.task('concatJs', function() {
  return gulp.src('./build/*.js')
    .pipe(concat('metaMediaViewer.js'))
    .pipe(gulp.dest('./dev/'));
});
 
gulp.task('less', function () {
  return gulp.src('./build/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('copy-js', function() {
  return gulp.src('./build/*.js')
    .pipe(gulp.dest('./dist'));
});

gulp.task('template', function () {
  return gulp.src('./build/*.html')
    .pipe(templateCache(
        {
            "module":"metaMediaViewerMdl"
        }
    ))
    .pipe(gulp.dest('./build'));
});

gulp.task('build', ['less','concatJs']);
gulp.task('dist', ['less','uglify']);