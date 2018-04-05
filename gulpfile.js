const gulp = require("gulp");
const pug = require("gulp-pug");
const source = require("vinyl-source-stream");
const browserify = require("browserify");
const tsify = require("tsify");
const package = require("./package.json");

gulp.task("js", function () {
    return browserify({
        basedir: ".",
        debug: true,
        entries: ["src/main.ts"],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .bundle()
    .pipe(source("main.js"))
    .pipe(gulp.dest("dist/js"));
});

gulp.task("html", function () {
    return gulp.src("src/index.pug")
        .pipe(pug({
            data: {
                title: package.name,
                threepath: "js/three.js"
            }
        }))
        .pipe(gulp.dest("dist"));
});

gulp.task("static", function () {
    return gulp.src("node_modules/three/build/three.js")
        .pipe(gulp.dest("dist/js"));
});

gulp.task("default", ["static", "html", "js"]);