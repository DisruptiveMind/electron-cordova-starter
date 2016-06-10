var     gulp = require('gulp')
    ,   sequence = require('run-sequence')
    ,   rename = require('gulp-rename')
    ,   del = require('del')
    ;

var config = {
    buildDir: './build',
    tmpDir: './tmp',
    electronDir: './electron',
    wwwDir: './www',
    appPackageFile: './app.package.json',
    assetsDir: './assets'
};

gulp.task('default', function(cb){
    sequence(
        'clean',
        'package',
        ['electron', 'www', 'assets'],
        cb
    )
});

gulp.task('assets', function(){
    return gulp.src(config.assetsDir + "/icons/**")
        .pipe(gulp.dest(config.buildDir))
        ;
});

gulp.task('package', function(){
    return gulp.src(config.appPackageFile)
        .pipe(rename("/package.json"))
        .pipe(gulp.dest(config.buildDir))
        ;
});

gulp.task('www', function(){
    return gulp.src(config.wwwDir + "/**")
        .pipe(gulp.dest(config.buildDir + "/www"))
        ;
});

gulp.task('electron', function(){
    return gulp.src(config.electronDir + "/**")
        .pipe(gulp.dest(config.buildDir + "/electron"))
        ;
});

gulp.task('clean', function(){
    return del(config.buildDir + "/**");
});