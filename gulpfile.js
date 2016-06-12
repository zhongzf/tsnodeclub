var gulp = require('gulp');
var typescript = require('gulp-tsc');

gulp.task('tsc', function () {
    gulp.src(['./**/*.ts'])
        .pipe(typescript(
            {
                "tscSearch": "shell",
                "target": "ES6"
            }
        ))
        .pipe(gulp.dest('./'))
});

gulp.task('default', ['tsc'], function () {
});