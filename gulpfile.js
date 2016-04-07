var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var less = require('gulp-less');
var path = require('path');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglifyjs');
var templateCache = require('gulp-angular-templatecache');
var concat = require('gulp-concat');
 
gulp.task('uglify', function() {
  return gulp.src('./src/*.js')
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('./dist'))
});

gulp.task('concatJs', function() {
  return gulp.src('./src/*.js')
    .pipe(concat('metaMediaViewer.js'))
    .pipe(gulp.dest('./dev/'));
});
 
gulp.task('less', function () {
  return gulp.src('./src/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('copy-js', function() {
  return gulp.src('./src/*.js')
    .pipe(gulp.dest('./dist'));
});

gulp.task('template', function () {
  return gulp.src('./src/*.html')
    .pipe(templateCache(
        {
            "module":"metaMediaViewerMdl"
        }
    ))
    .pipe(gulp.dest('./src'));
});

//se si sono fatte modifiche ai file di template html, prima di eseguire i task per creare file di sviluppo ('dev') o di produzione ('dist') lanciare il task 'gulp template'
gulp.task('dev', ['less','concatJs']);
gulp.task('dist', ['less','uglify']);