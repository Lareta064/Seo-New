const gulp = require("gulp"); // Подключаем Gulp
const browserSync = require("browser-sync").create();
const watch = require("gulp-watch");
const sass = require("gulp-sass")(require('sass'));
const autoprefixer = require("gulp-autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const notify = require("gulp-notify");
const plumber = require("gulp-plumber");
const pug = require("gulp-pug");
const del = require("del");
const gcmq = require("gulp-group-css-media-queries");
const formatHtml = require('gulp-format-html');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const ttf2woff2 = require('gulp-ttf2woff2');
const cached = require("gulp-cached");

// Таск для компиляции PUG в HTML (Пересобираем только измененные файлы)
gulp.task("pug", function () {
    return gulp
        .src("./src/pug/pages/**/*.pug")
        .pipe(
            plumber({
                errorHandler: notify.onError(function (err) {
                    return {
                        title: "Pug",
                        sound: false,
                        message: err.message
                    };
                })
            })
        )
        .pipe(pug({ pretty: '\t' }))
        .pipe(gulp.dest("./build/"))
        .pipe(browserSync.stream());
});

gulp.task("pugUi", function () {
    return gulp
        .src("./src/pug/ui/**/*.pug")
        .pipe(cached('pugUi')) // Кешируем файлы
        .pipe(
            plumber({
                errorHandler: notify.onError(function (err) {
                    return {
                        title: "Pug UI",
                        sound: false,
                        message: err.message
                    };
                })
            })
        )
        .pipe(pug({ pretty: '\t' }))
        .pipe(gulp.dest("./build/ui/"))
        .pipe(browserSync.stream());
});

// Таск для компиляции SCSS в CSS
gulp.task("scss", function () {
    return gulp
        .src("./src/scss/main.scss")
        .pipe(
            plumber({
                errorHandler: notify.onError(function (err) {
                    return {
                        title: "Styles",
                        sound: false,
                        message: err.message
                    };
                })
            })
        )
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 4 versions"]
            })
        )
        .pipe(gcmq())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./build/css/"))
        .pipe(browserSync.stream());
});

// Конвертация шрифтов
gulp.task("ttf2woff2", function () {
    return gulp.src(['./src/fonts/*.ttf'])
        .pipe(ttf2woff2())
        .pipe(gulp.dest('build/fonts/'));
});

// Копирование изображений с конвертацией в webp
gulp.task("copy:img", function () {
    return gulp.src("./src/img/**/*.*")
        .pipe(webp())
        .pipe(gulp.dest("./build/img/"));
});

// Копирование библиотек, JS, видео и шрифтов
gulp.task("copy:libs", function () {
    return gulp.src("./src/libs/**/*.*").pipe(gulp.dest("./build/libs/"));
});
gulp.task("copy:js", function () {
    return gulp.src("./src/js/**/*.*").pipe(gulp.dest("./build/js/"));
});
gulp.task("copy:video", function () {
    return gulp.src("./src/video/**/*.*").pipe(gulp.dest("./build/video/"));
});
gulp.task("copy:fonts", function () {
    return gulp.src("./src/fonts/**/*.*").pipe(gulp.dest("./build/fonts/"));
});

// Очистка папки `build`
gulp.task("clean:build", function () {
    return del("./build");
});

// Приведение HTML в красивый формат
gulp.task("html:prettify", function () {
    return gulp
        .src('build/**/*.html')
        .pipe(formatHtml())
        .pipe(gulp.dest('./build/'));
});

// Запуск локального сервера
gulp.task("server", function () {
    browserSync.init({
        server: {
            baseDir: "./build/"
        }
    });
});

// Слежение за изменениями
gulp.task("watch", function () {
    // Следим за изменениями в SCSS
    watch("./src/scss/**/*.scss", gulp.series("scss"));

    // Следим за изменениями в PUG (оптимизировано)
    watch("./src/pug/pages/**/*.pug", gulp.series("pug"));
    watch("./src/pug/ui/**/*.pug", gulp.series("pugUi"));
    watch("./src/pug/{blocks,sections}/**/*.pug", gulp.series("pug"));
    // Следим за изменениями в картинках и копируем
    watch("./src/img/**/*.*", gulp.series("copy:img"));

    // Следим за изменениями в JS, видео, шрифтах, библиотеках
    watch("./src/js/**/*.*", gulp.series("copy:js"));
    watch("./src/video/**/*.*", gulp.series("copy:video"));
    watch("./src/fonts/**/*.*", gulp.series("copy:fonts"));
    watch("./src/libs/**/*.*", gulp.series("copy:libs"));

    // Следим за файлами в `build` и перезагружаем браузер
    watch(["./build/**/*.*"]).on("change", browserSync.reload);
});

// Запуск всей сборки
gulp.task(
    "default",
    gulp.series(
        "clean:build",
        gulp.parallel("scss", "ttf2woff2", "pug", "pugUi", "copy:img", "copy:js", "copy:libs", "copy:video", "copy:fonts"),
        "html:prettify",
        gulp.parallel("server", "watch")
    )
);
