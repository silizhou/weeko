// 引入
var gulp = require('gulp');
var sass = require('gulp-sass');
var server = require('gulp-webserver');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean-css');
var concat = require('gulp-concat');


// 引入插件
var fs = require('fs');
var url = require('url');
var path = require('path');

// 编译sass
gulp.task('sass', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(clean())
        .pipe(gulp.dest('./src/css'))
})

// 监听sass
gulp.task('watch', function() {
    return gulp.watch('./src/scss/*.scss', gulp.series('sass'))
})

// 起服务

gulp.task('server', function() {
    return gulp.src('./build')
        .pipe(server({
            port: 9090,
            host: 'localhost',
            livereload: true,
            // middleware: function(req, res, next) {
            //     var pathname = url.parse(req.url).pathname;
            //     if (pathname === '/favicon.ico') {
            //         res.end('')
            //         return
            //     };
            //     if (pathname === '/banner') {
            //         var data = fs.readFileSync('./mock/data.json')
            //         var bold = JSON.parse(data)
            //         res.end(JSON.stringify({ code: 1, data: bold }))
            //     } else {
            //         pathname = pathname === '/' ? 'index.html' : pathname;
            //         res.end(fs.readFileSync(path.join(__dirname, 'build', pathname));
            //         }
            //     }
        }))
})

// gulp.task('devserver', function() {

// })

gulp.task('default', gulp.series('sass', 'server', 'watch'));

//-----------------------------------------------------------------------

// 压缩js

gulp.task('buglify', function() {
    return gulp.src('./build/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
})

gulp.task('bcss', function() {
    return gulp.src('./build/css/*.css')
        .pipe(gulp.dest('./dist/css'))
})