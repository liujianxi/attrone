var gulp = require('gulp');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload'); //用于浏览器自动监听
var autoprefixer = require('gulp-autoprefixer'); //用于适配浏览器前缀
var imagemin = require('gulp-imagemin');  //图片压缩
var merge = require('merge-stream');  //工具插件,stream流合并
var spritesmith = require("gulp.spritesmith");  //sprite合并
var buffer = require('vinyl-buffer');  //stream转buffer

/*编译scss*/
gulp.task('sass',function(){
	gulp.src('scss/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('css'))
	.pipe(autoprefixer({
		browers:['last 2 versions', 'Android >= 4.0','safari >=5','ie 8','ie 9','opera >=12.1','ios >=6'],
		cascade: true, //是否美化属性值 默认：true 像这样：
        //-webkit-transform: rotate(45deg);
        //        transform: rotate(45deg);
        remove:false //是否去掉不必要的前缀 默认：true
	}))
	.pipe(livereload()); //LiveReload页面
})

/*监听scss*/
gulp.task('watch',function(){
	livereload.listen(); //LiveReload页面
	gulp.watch('scss/*.scss',['sass'])
})

/*图片合成雪碧图*/
gulp.task('sprite',function(){
	var imgData = gulp.src("images/*.png")
        .pipe(spritesmith({
            imgName:"sprite.png",
            cssName:"_sprite.scss",
            cssFormat:"scss",
            imgPath:"../images/sprite/sprite.png?t=" + Date.now() //添加时间戳防止缓存
        }));
    var imgStream = imgData.img
        .pipe(buffer())
        .pipe(imagemin())
        .pipe(gulp.dest('images/sprite'));
    var cssStream = imgData.css
        .pipe(gulp.dest('scss/'));
    return merge(imgStream, cssStream);	
})
