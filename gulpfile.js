'use strict';

const gulp = require("gulp"),
	babel = require("gulp-babel"),
	concat = require('gulp-concat-util'),
	ngAnnotate = require("gulp-ng-annotate"),
	del = require("del"),
	angularTemplatecache = require("gulp-angular-templatecache"),
	uglify = require("gulp-uglify"),
	runSequence = require("run-sequence"),
	wrap = require('gulp-wrap'),
	googleWebFonts = require('gulp-google-webfonts'),
	iconfontCSS = require('gulp-iconfont-css'),
	iconfont = require('gulp-iconfont');

const folders = {
	middleFolder:"./middle",
	outFolder:"./dist",
	srcFolder:"./src"
};

const fontName = 'mr-icon-font';

const settings = {
	src: {
		templates:[`${folders.srcFolder}/**/*.htm`],
		scripts:[`${folders.srcFolder}/**/*.js`],
		fonts:{
			bin:[`${folders.srcFolder}/assets/fonts/*.*`],
			icon:[`${folders.srcFolder}/iconfont/*.svg`]
		},
	},
	dist: {
		fontsDirPath:'./fonts'
	}
}

gulp.task('default', (cb)=> {
	runSequence(['code:build',/*'fonts:load','iconfont'*/],/* 'fonts:copy',*/ 'clean', cb);
});

gulp.task('code:build', (cb)=> {
	runSequence(['templates:concat','scripts:concat'],'scripts:minify', cb);
});

gulp.task('iconfont', (cb) => {	
    return Promise.all([
		gulp.src(settings.src.fonts.icon)
		.pipe(iconfontCSS({
			fontName: fontName,
			targetPath: `${fontName}.css`,
			fontPath: `${settings.dist.fontsDirPath}/`,
			firstGlyph: '0xEA01'
		}))
		.pipe(gulp.dest(`${folders.outFolder}`)),

		gulp.src(settings.src.fonts.icon).pipe(iconfont({
			fontName: fontName,
			// Remove woff2 if you get an ext error on compile
			formats: ['svg', 'ttf', 'eot', 'woff', 'woff2'],
			normalize: true,			
			fontHeight: 1001
		}))
		.pipe(gulp.dest(`${folders.outFolder}/${settings.dist.fontsDirPath}/`))
	]);
});

gulp.task('fonts:load', (cb) => {	
	return Promise.all([gulp.src('./fonts.list')
		.pipe(googleWebFonts({
			fontsDir: settings.dist.fontsDirPath,
			cssDir: '',
			cssFilename: 'fonts.css'
		}))
		.pipe(gulp.dest(folders.outFolder))]);
});

gulp.task('fonts:copy', (cb) => {
	return gulp.src(settings.src.fonts.bin)
			.pipe(gulp.dest(`${folders.outFolder}/${settings.dist.fontsDirPath}/`,{
				overwrite:true
			}));
	
});

gulp.task('clean', (cb)=>{
	return del([folders.middleFolder,`${folders.outFolder}/*.svg`], {
		force: true
	});
});

gulp.task('scripts:minify',(cb)=>{
	return gulp.src([
				`${folders.middleFolder}/templates.js`,
				`${folders.middleFolder}/scripts.js`,
			])
			.pipe(concat('view-layer.js'))
			.pipe(babel())
			.pipe(uglify())
			.pipe(wrap('(function withAngular(angular) {<%= contents %>}(angular));', {}, { parse: false }))
			.pipe(gulp.dest(folders.outFolder));
});

gulp.task('scripts:concat', (cb)=>{
	return gulp.src(settings.src.scripts)
		.pipe(concat('scripts.js'))
		.pipe(ngAnnotate({
			remove: true,
			add: true,
			single_quotes: true
		}))		
    	.pipe(gulp.dest(folders.middleFolder));
});


gulp.task('templates:concat', (cb) => {
	return gulp
		.src(settings.src.templates)
		.pipe(angularTemplatecache({
			module:"DemoWeb.Components.Templates",
			transformUrl: (url) => {
				let indexOfLastSlash = url.lastIndexOf('\\');
				url = url.substring(indexOfLastSlash + 1);
				indexOfLastSlash = url.lastIndexOf('/');
				return url.substring(indexOfLastSlash+1);
			},
			standalone: true
			}))
		.pipe(gulp.dest(folders.middleFolder));
});