const { src, dest, series, parallel, watch } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const cssnano = require('gulp-cssnano')
const autoprefixer = require('gulp-autoprefixer')
const rename = require('gulp-rename')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const imagemin = require('gulp-imagemin')
const sourcemaps = require('gulp-sourcemaps')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload
const clean = require('gulp-clean')
const kit = require('gulp-kit')

const paths = {
	html: './html/**/*.kit',
	sass: './src/sass/**/*.scss',
	distSass: './dist/css',
	dist: './dist',
	javaScript: './src/js/**/*.js',
	distJavaScript: './dist/js',
	convertImage: './src/img/*',
	distConvertImage: './dist/img',
}

const sassCompiler = cb => {
	src(paths.sass)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(cssnano())
		.pipe(
			rename({
				suffix: '.min',
			})
		)
		.pipe(sourcemaps.write())
		.pipe(dest(paths.distSass))
	cb()
}

const javaScript = cb => {
	src(paths.javaScript)
		.pipe(sourcemaps.init())
		.pipe(
			babel({
				presets: ['@babel/env'],
			})
		)
		.pipe(uglify())
		.pipe(
			rename({
				suffix: '.min',
			})
		)
		.pipe(sourcemaps.write())
		.pipe(dest(paths.distJavaScript))
	cb()
}

const convertImages = cb => {
	src(paths.convertImage).pipe(imagemin()).pipe(dest(paths.distConvertImage))
	cb()
}

const cleanStuff = cb => {
	src(paths.dist, { read: false }).pipe(clean())
	cb()
}

const handleKit = cb => {
	src(paths.html).pipe(kit()).pipe(dest('./'))
	cb()
}

const startBrowserSync = cb => {
	browserSync.init({
		server: {
			baseDir: './',
		},
	})
	cb()
}

const watchForChanges = cb => {
	watch('./*.html').on('change', reload)
	watch([paths.html, paths.sass, paths.javaScript], parallel(handleKit, sassCompiler, javaScript)).on('change', reload)
	watch(paths.convertImage, convertImages).on('change', reload)
	cb()
}

const mainFunctions = parallel(handleKit, sassCompiler, javaScript, convertImages)
exports.cleanStuff = cleanStuff
exports.default = series(mainFunctions, startBrowserSync, watchForChanges)
