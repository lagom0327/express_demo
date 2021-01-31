const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const db = require("./db");
const app = express();
const port = 5001;
const todoController = require("./controllers/todo");
const userController = require("./controllers/user");

const redirectBack = (req, res) => {
  res.redirect("back");
};
app.set("view engine", "ejs");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true },
  })
);

app.use(flash());
app.use((req, res, next) => {
  res.locals.username = req.session.username;
  res.locals.errorMessage = req.flash("errorMessage");
  next();
});

app.post("/todos", todoController.newTodo);
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/addTodo", todoController.addTodo);
app.get("/todos", todoController.getAll);
app.get("/todos/:id", todoController.get);
app.get("/login", userController.login);
app.post("/login", userController.handleLogin, redirectBack);
app.get("/logout", userController.handleLogout);
app.get("/register", userController.register);
app.post("/register", userController.handleRegister, redirectBack);

app.listen(port, () => {
  db.connect(function (err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + db.threadId);
  });
  console.log(`Example app listening from ${port}`);
});
