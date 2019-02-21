'use strict';

const       gulp          = require('gulp'),
            sass          = require('gulp-sass'),
            browserSync   = require('browser-sync').create(),
			concat        = require('gulp-concat'),
			terser        = require('gulp-terser'),
			cleancss      = require('gulp-clean-css'),
			rigger 		  = require('gulp-rigger'),
			rename        = require('gulp-rename'),
			autoprefixer  = require('gulp-autoprefixer'),
			notify        = require('gulp-notify'),
			sourcemaps    = require('gulp-sourcemaps'),
            imagemin      = require('gulp-imagemin'),
            watch         = require('gulp-watch'),
			rimraf 	      = require('rimraf');

const path = {

	build: {
		html: './',
		js: './js/',
		css: './css/',
		img: './img/',
	},

	src: {
		html: './src/index.html',
		js: './src/js/*.js',
		scss: './src/scss/style.scss',
		img: './src/img/**/*.*',
	},

	watch: {
		html: './src/*.html',
		js: './src/js/**/*.js',
		css: './src/scss/**/*.scss',
		img: './src/img/**/*.*',
	},

	clean: './'
};


/***********Gulp Tasks***********/


// browser-sync
gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: './'
		},
		notify: false,
	})
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

// sass
gulp.task('scss:build', function() {
	return gulp.src(path.src.scss)
	.pipe(sourcemaps.init())
	.pipe(sass({ outputStyle: 'expanded' }).on('error', notify.onError()))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(path.build.css))
	.pipe(browserSync.stream());
});

// html
gulp.task('html:build', function()  {
 return gulp.src(path.src.html)
 .pipe(gulp.dest(path.build.html))
 .pipe(browserSync.reload({stream: true}));
});

// js
gulp.task('js:build', function() {
	gulp.src(path.src.js)
		.pipe(sourcemaps.init())
		.pipe(rigger())
        .pipe(terser())
		.pipe(rename('scripts.min.js'))
		.pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
		.pipe(browserSync.reload({ stream: true }));
});

// img
gulp.task('img:build', function () {
    gulp.src(path.src.img)
        .pipe(imagemin({
            optimizationLevel: 3,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img));
});

// fonts
// gulp.task('fonts:build', function() {
// 	return gulp.src(path.src.fonts)
// 	.pipe(gulp.dest(path.build.fonts))
// 	.pipe(browserSync.stream());
//    });


gulp.task('build',
	[
		'html:build',
		'scss:build',
		'js:build',
		'img:build',
		// 'fonts:build',
		'browser-sync',
		'watch'
	]
);


gulp.task('watch', function() {
    gulp.watch(path.watch.html, ['html:build']);
    gulp.watch(path.watch.css, ['scss:build']);
    gulp.watch(path.watch.js, ['js:build']);
	gulp.watch(path.watch.img, ['img:build']);
	// gulp.watch(path.watch.fonts, ['fonts:build']);
});

gulp.task('default', function () {
    gulp.start('build');
});