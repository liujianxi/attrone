var gulp = require('gulp');
var assetRev = require('gulp-asset-rev');
var clean = require('gulp-clean');
var src={
	html:["**/*.html"],
	img:["images/*.png','images/*.jpg','images/*.webp','images/*.bmp','images/*.svg','images/*.gif','images/*.jpeg"],
	js:["*.js"],
}
gulp.task("rev",["revCss","revJs"],function() {
    gulp.src(src.html)
        .pipe(assetRev())
        .pipe(gulp.dest(""));
});
 
gulp.task("revCss",function () {
    return gulp.src('*.css')
        .pipe(assetRev())
        .pipe(gulp.dest(""))
});
gulp.task("revJs",function () {
    return gulp.src(src.js)
        .pipe(assetRev())
        .pipe(gulp.dest(""))
});
//gulp.task("revImg",function () {
//  return gulp.src(src.img)
//      .pipe(gulp.dest("./images"))
//});
gulp.task("build",['rev']); 