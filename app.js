var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var questionRouter = require("./routes/question");
var quizTableRouter = require("./routes/quizTable");
var registerRouter = require("./routes/register");
var roleRouter = require("./routes/role");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use((req, res, next) => {
//   console.log('===============', req.headers.authorization);
//   const token = req.headers.authorization;
//   const user = jwt.verify(token.replace(/Bearer/i, '').trim(), "secret");
//   console.log(user);
//   req.user = user ? user : {};
//   next();
//   // req.user = .user;
// });

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/question", questionRouter);
app.use("/quiz-table", quizTableRouter);
app.use("/auth", registerRouter);
app.use("/role", roleRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
  // res.send("error");
});

module.exports = app;
