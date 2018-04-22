const path = require("path");
const pump = require("pump");
// gulp modules
const gulp = require("gulp");
const pug = require("gulp-pug");
const flatten = require("gulp-flatten");
const connect = require("gulp-connect");
const concat = require("gulp-concat");
const postcss = require("gulp-postcss");
const ts = require("gulp-typescript");
const uglify = require("gulp-uglify");
// postcss plugins
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const precss = require("precss");
const atImport = require("postcss-import");
// local paths
const package = require("./package.json");
const threeDir = "./node_modules/three/";
const threeFiles = [
    "node_modules/three/build/three.min.js",
    "node_modules/three/examples/js/controls/OrbitControls.js",
    "node_modules/three/examples/js/loaders/OBJLoader.js",
    "node_modules/three/examples/js/Detector.js"
];
// relative paths to three.js files from dist/index.html
var jsImports = threeFiles.map((filePath) => {
    return "dist/js/" + path.basename(filePath);
});


gulp.task("connect", function () {
    connect.server({
        root: ".",
        livereload: true
    });
});

gulp.task("css", function () {
    var plugins = [
        atImport(),
        precss(),
        autoprefixer(),
        cssnano()
    ];
    return gulp.src("./src/styles/main.css")
        .pipe(postcss(plugins))
        .pipe(gulp.dest("./dist"))
        .pipe(connect.reload());
});

gulp.task("ts", function () {
    var tsResult = gulp.src([
            "src/js/globals.ts",
            "src/js/lights.ts",
            "src/js/presets.ts",
            "src/js/main.ts"])
        .pipe(concat("main.ts"))
        .pipe(ts({
            out: "main.js"
        }));
    return tsResult.js
        .pipe(gulp.dest("./dist/js"))
        .pipe(connect.reload());
});

gulp.task("uglify", ["static"], function (cb) {
    pump([
        gulp.src("dist/js/*.js"),
        uglify({ output: { comments: /@author/ }}),
        gulp.dest("dist/js")
    ], cb);
});

gulp.task("html", function () {
    return gulp.src("src/index.pug")
        .pipe(pug({
            data: {
                title: package.name,
                mainjs: "dist/js/main.js",
                jsImports: jsImports
            }
        }))
        .pipe(gulp.dest("."))
        .pipe(connect.reload());
});

// copy three.js files to dist dir
gulp.task("static", function () {
    return gulp.src(threeFiles, { base: threeDir })
        .pipe(flatten())
        .pipe(gulp.dest("dist/js"));
});

gulp.task("watch", function () {
    gulp.watch(["./src/js/*.ts"], ["ts"]);
    gulp.watch(["./src/styles/*.css"], ["css"]);
    gulp.watch(["./src/*.pug"], ["html"]);
});

gulp.task("build", ["html", "css", "ts", "uglify"]);

gulp.task("default", ["static", "html", "css", "ts", "connect", "watch"]);