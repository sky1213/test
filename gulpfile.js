/**
 * Created by sky on 2017/3/7.
 */

var gulp = require("gulp");

// 引入less编译工具库
var less = require("gulp-less");

// 引入浏览器同步工具库
var boowserSyne = require("browser-sync");

// css文件变化后执行的任务
gulp.task("css", function () {
  gulp
    .src("src/css/*.less")
    .pipe(less())
    .pipe(gulp.dest("dist/style"))
    // 每次文件变化后，重新刷新下浏览器
    .pipe(
      boowserSyne.reload({
        stream: true,
      })
    );
});

// index文件变化时会执行的任务
gulp.task("copy", function () {
  gulp
    .src("src/index.html")
    .pipe(gulp.dest("dist"))
    // 每次文件变化后，重新刷新下浏览器
    .pipe(
      boowserSyne.reload({
        stream: true,
      })
    );
});

// 注册一个主任务
gulp.task("mainServe", function () {
  boowserSyne(
    {
      server: {
        baseDir: ["dist"],
      },
    },
    function (err, bs) {
      console.log(bs.options.getIn(["urls", "local"]));
    }
  );

  // 添加监视
  // 监视less文件
  gulp.watch("src/css/*.less", ["css"]);
  // 监视index。html文件
  gulp.watch("src/index.html", ["copy"]);
});
