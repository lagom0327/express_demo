const express = require("express");
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

function checkPermission(req, res, next) {
  if (req.query.admin === "1") {
    next();
  } else {
    res.end("Error");
  }
}
app.post("/todos", todoController.newTodo);
app.get("/", todoController.addTodo);
app.get("/todos", todoController.getAll);
app.get("/todos/:id", todoController.get);

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
