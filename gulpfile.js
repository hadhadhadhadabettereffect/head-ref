const path = require("path");
const gulp = require("gulp");
const pug = require("gulp-pug");
const flatten = require("gulp-flatten");
const source = require("vinyl-source-stream");
const browserify = require("browserify");
const tsify = require("tsify");
const package = require("./package.json");

const threeDir = "./node_modules/three/";
const threeFiles = [
    "node_modules/three/build/three.js",
    "node_modules/three/examples/js/controls/OrbitControls.js"
];
// relative paths to three.js files from dist/index.html
var jsImports = threeFiles.map((filePath) => {
    return "js/" + path.basename(filePath);
});

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
                mainjs: "js/main.js",
                jsImports: jsImports
            }
        }))
        .pipe(gulp.dest("dist"));
});

// copy three.js files to dist dir
gulp.task("static", function () {
    return gulp.src(threeFiles, { base: threeDir })
        .pipe(flatten())
        .pipe(gulp.dest("dist/js"));
});

gulp.task("default", ["static", "html", "js"]);