var gulp = require("gulp");
var rename = require("gulp-rename");
var sketch = require("gulp-sketch");
var iconfont = require('gulp-iconfont');
var consolidate = require('gulp-consolidate');
var exec = require('gulp-exec');
var del = require('del');

var fontName = 'cheminot';
var template = 'fontawesome-style';

gulp.task('fonts', ['clean:fonts'], function(){
  gulp.src('cheminot.sketch')
    .pipe(sketch({
      export: 'artboards',
      formats: 'svg',
      items: ['uF001-plus',
              'uF002-menu',
              'uF003-circle',
              'uF004-cross',
              'uF005-up',
              'uF006-down',
              'uF007-left',
              'uF008-right',
              'uF009-clock',
              'uF00A-split',
              'uF00B-time',
              'uF00C-duration',
              'uF00D-pin',
              'uF00E-back',
              'uF00F-android',
              'uF010-googleplus',
              'uF011-twitter',
              'uF012-github',
              'uF013-heart-empty',
              'uF014-heart',
              'uF015-search',
              'uF016-home']
    }))
    .pipe(iconfont({ fontName: fontName }))
    .on('codepoints', function(codepoints) {
      var options = {
        glyphs: codepoints,
        fontName: fontName,
        fontPath: '../target/',
        className: 'icon-cheminot'
      };
      gulp.src('templates/' + template + '.css')
        .pipe(consolidate('lodash', options))
        .pipe(rename({ basename:fontName }))
        .pipe(gulp.dest('dist/fonts/css/'));

      gulp.src('templates/' + template + '.html')
        .pipe(consolidate('lodash', options))
        .pipe(rename({ basename: 'fonts' }))
        .pipe(gulp.dest('dist/fonts/'));
    })
    .pipe(gulp.dest('dist/fonts/target'));
});

gulp.task('export:frames', function() {
  return gulp.src('cheminot.sketch')
    .pipe(sketch({
      export: 'artboards',
      formats: 'jpg',
      items: ['frame1', 'frame2','frame3']
    })).pipe(gulp.dest('dist/loader'));
});

gulp.task('splashscreens', ['clean:splashscreens'], function() {
  return gulp.src('cheminot.sketch')
    .pipe(sketch({
      export: 'artboards',
      formats: 'png',
      items: ['screen-1280x1880.9',
              'screen-1880x1280.9',
              'screen-960x1410.9',
              'screen-720x960.9',
              'screen-640x480.9',
              'screen-480x640.9',
              'screen-470x320.9',
              'screen-320x470.9',
              'screen-320x426.9',
              'screen-426x320.9',
              'screen-960x720.9',
              'screen-1410x960.9']
    })).pipe(gulp.dest('dist/splashscreens'));
});

gulp.task('icons', ['clean:icons'], function() {
  return gulp.src('cheminot.sketch')
    .pipe(sketch({
      export: 'artboards',
      formats: 'png',
      items: ['icon-36',
              'icon-48',
              'icon-72',
              'icon-96',
              'icon-144',
              'icon-192']
    })).pipe(gulp.dest('dist/icons'));
});

gulp.task('loader', ['clean:loader', 'export:frames'], function(cb) {
  return gulp.src('.')
    .pipe(exec('convert -dispose none -dispose previous -delay 25 dist/loader/frame1.jpg dist/loader/frame2.jpg dist/loader/frame3.jpg -loop 0  dist/loader/cheminot_f4f7f9.gif'))
    .pipe(exec.reporter());
});

gulp.task('clean:loader', function(cb) {
  del(['dist/loader'], cb);
});

gulp.task('clean:fonts', function(cb) {
  del(['dist/fonts'], cb);
});

gulp.task('clean:splashscreens', function(cb) {
  del(['dist/splashscreens'], cb);
});

gulp.task('clean:icons', function(cb) {
  del(['dist/icons'], cb);
});

gulp.task('clean', ['clean:loader', 'clean:fonts', 'clean:splashscreens'], function() {});
