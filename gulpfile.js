var gulp = require("gulp");
var rename = require("gulp-rename");
var sketch = require("gulp-sketch");
var iconfont = require('gulp-iconfont');
var consolidate = require('gulp-consolidate');
var del = require('del');

var fontName = 'cheminot';
var template = 'fontawesome-style';

gulp.task('fonts', ['clean'], function(){
  gulp.src('cheminot.sketch')
    .pipe(sketch({
      export: 'artboards',
      formats: 'svg',
      items: ['uF001-circle', 'uF002-cross', 'uF003-heart', 'uF004-down', 'uF005-up', 'uF006-left', 'uF007-right', 'uF008-menu', 'uF009-add']
    }))
    .pipe(iconfont({ fontName: fontName }))
    .on('codepoints', function(codepoints) {
      var options = {
        glyphs: codepoints,
        fontName: fontName,
        fontPath: '../fonts/',
        className: 'icon-cheminot'
      };
      gulp.src('templates/' + template + '.css')
        .pipe(consolidate('lodash', options))
        .pipe(rename({ basename:fontName }))
        .pipe(gulp.dest('dist/css/'));

      gulp.src('templates/' + template + '.html')
        .pipe(consolidate('lodash', options))
        .pipe(rename({ basename: 'fonts' }))
        .pipe(gulp.dest('dist/'));
    })
    .pipe(gulp.dest('dist/fonts/'));
});

gulp.task('clean', function(cb) {
  del(['dist'], cb);
});