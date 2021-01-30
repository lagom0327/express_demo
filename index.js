const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const db = require("./db");
const app = express();
const port = 5001;
const todoController = require("./controllers/todo");
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

app.post("/todos", todoController.newTodo);
app.get("/", todoController.addTodo);
app.get("/todos", todoController.getAll);
app.get("/todos/:id", todoController.get);
app.get("/login", (req, res) => {
  res.render("login");
});
app.post("/login", (req, res) => {
  if (req.body.password === "abc") {
    req.session.isLogin = true;
    res.redirect("/");
  } else {
    res.redirect("/login");
  }
});
app.get("/logout", (req, res) => {
  req.session.isLogin = false;
  res.redirect("/");
});

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
