// 引用gulp模块
const gulp = require('gulp');
const less = require('gulp-less');
var browserSync = require('browser-sync').create(); 
// 使用gulp.task建立任务
browserSync.init({
	port:3000,
	server: {
		baseDir: ["./html/","./"],
		index: "./html/index.html"
	}
});

gulp.task('less', () => {
	// 选择css目录下的所有less文件以及css文件
	gulp.src(['./less/*.less'])
		// 将less语法转换为css语法
		.pipe(less())
		// 将处理的结果进行输出
		.pipe(gulp.dest('./css'))
});

gulp.task('reload', function(){
    browserSync.reload();
});

//定义看守任务
gulp.task('watch', function () {
	gulp.watch(['./html/*.html', './css/index.css'], ['reload']);
	gulp.watch('less/*.less', ['less']);
});
// 构建任务
gulp.task('default', ['less','watch']);