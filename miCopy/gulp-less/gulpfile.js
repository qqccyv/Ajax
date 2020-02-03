const gulp = require('gulp')
const htmlmin = require('gulp-htmlmin');
const fileinclude = require('gulp-file-include');
const less = require('gulp-less');
const csso = require('gulp-csso');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
gulp.task('first', () => {
        console.log('第一个任务');

    })
    // gulp.task('less', () => {
    //     // 选择css目录下的所有less文件以及css文件
    //     gulp.src('./index.less')
    //         // 将less语法转换为css语法
    //         .pipe(less())
    //         // 将css代码进行压缩
    //         // .pipe(csso())
    //         // 将处理的结果进行输出
    //         .pipe(gulp.dest('./'))
    // });

gulp.task('toCss', () => {
    gulp.src(['./*.less'])
        .pipe(less())
        .pipe(gulp.dest('./'))
});