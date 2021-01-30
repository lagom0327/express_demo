const todoModal = require("../modules/todo");
const todoController = {
  getAll: (req, res) => {
    todoModal.getAll((err, results) => {
      if (err) console.log(err);
      // res.send(results);
      res.render("todos", {
        todos: results,
      });
    });
  },
  get: (req, res) => {
    const id = req.params.id;
    todoModal.get(id, (err, results) => {
      if (err) console.log(err);
      // res.send(results[0]);
      res.render("todo", {
        todo: results[0],
      });
    });
  },
};
module.exports = todoController;
