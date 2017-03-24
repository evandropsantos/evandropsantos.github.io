var gulp = require('gulp'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),

    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    cleanCSS = require('gulp-clean-css'),
    
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish');
    stripDebug = require('gulp-strip-debug'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

gulp.task('clean:build', function() {

    return del('build/*');
});

gulp.task('minify-images', function() {

    gulp.src('sources/images/*.+(png|jpg|jpeg|gif|svg|ico)')
    .pipe(imagemin({
        progressive: true,
        optimizationLevel: 3,
        interlaced: true
    }))
    .pipe(gulp.dest('build/images'));
});

/* Styles */
gulp.task('generate-sass', function() {
    
    return gulp.src('sources/styles/**/*.scss')
        .pipe( sourcemaps.init() )
        .pipe( sass().on('error', sass.logError) )
        .pipe(sourcemaps.write('/maps'))
        .pipe(gulp.dest('build/styles'))
});

gulp.task('minify-styles', ['generate-sass'], function() {

    gulp.src('build/styles/*.css')
    .pipe(cleanCSS({ compatibility: 'ie8'}) )
    .pipe(gulp.dest('build/styles'));
});

/* Scripts */
gulp.task('minify-script', function() {

    gulp.src('sources/scripts/**/*.js')
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('build/scripts'))
});

gulp.task('concat-libs', function() {

    gulp.src('sources/libs/**/*.js')
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/libs'))
});

/*----------  Desenvolvimento  ----------*/
gulp.task('default', function() {
    
    gulp.watch('sources/images/*.+(png|jpg|jpeg|gif|svg|ico)', ['minify-images']);
    gulp.watch('sources/styles/**/*.scss', ['generate-sass']);

    gulp.watch('sources/scripts/**/*.js').on('change', function(event) {
        
        console.log("Linting " + event.path);

        gulp.src(event.path)
            .pipe(jshint())
            .pipe(jshint.reporter(stylish))
            .pipe(gulp.dest('build/scripts'));
    });
});

/*----------  Producao  ----------*/
gulp.task('build', ['clean:build'], function() {

    gulp.start('minify-styles', 'minify-script', 'concat-libs', 'minify-images');
});