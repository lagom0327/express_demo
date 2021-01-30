const express = require("express");
const db = require("./db");
const app = express();
const port = 5001;
const todoController = require("./controllers/todo");
app.set("view engine", "ejs");
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
